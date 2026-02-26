"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

type Manifest = {
  files: string[];
};

type FrameEntry = {
  status: "idle" | "loading" | "loaded" | "error";
  image: HTMLImageElement | null;
  promise: Promise<HTMLImageElement | null> | null;
  lastUsedAt: number;
};

const LERP = 0.15;
const FIRST_BATCH = 10;
const MAX_CACHE = 80;
const LOAD_CONCURRENCY = 3;

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export default function ScrollAnimation() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const inViewRef = useRef(false);

  const frameUrlsRef = useRef<string[]>([]);
  const frameStoreRef = useRef<FrameEntry[]>([]);
  const bgQueueRef = useRef<number[]>([]);
  const bgWorkersRef = useRef(0);

  const targetRef = useRef(0);
  const currentRef = useRef(0);
  const lastDrawnRef = useRef(-1);
  const loadedRef = useRef(0);

  const [frameCount, setFrameCount] = useState(0);
  const [loadedCount, setLoadedCount] = useState(0);
  const [displayedFrame, setDisplayedFrame] = useState(0);
  const [errorText, setErrorText] = useState<string | null>(null);

  const loadingText = useMemo(() => {
    if (!frameCount) return "Loading 0%";
    return `Loading ${Math.round((loadedCount / frameCount) * 100)}%`;
  }, [loadedCount, frameCount]);

  const frameText = useMemo(() => {
    if (!frameCount) return "Frame 0 / 0";
    return `Frame ${displayedFrame + 1} / ${frameCount}`;
  }, [displayedFrame, frameCount]);

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = clamp(window.devicePixelRatio || 1, 1, 2);
    const rect = canvas.getBoundingClientRect();
    const width = Math.max(1, Math.round(rect.width * dpr));
    const height = Math.max(1, Math.round(rect.height * dpr));

    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
      lastDrawnRef.current = -1;
    }
  }, []);

  const evictCache = useCallback(() => {
    const store = frameStoreRef.current;
    const loaded = store
      .map((entry, index) => ({ ...entry, index }))
      .filter((entry) => entry.status === "loaded" && entry.image);

    if (loaded.length <= MAX_CACHE) return;

    loaded.sort((a, b) => a.lastUsedAt - b.lastUsedAt);
    const dropCount = loaded.length - MAX_CACHE;

    for (let i = 0; i < dropCount; i += 1) {
      const victim = loaded[i];
      if (victim.index === Math.round(currentRef.current)) continue;
      store[victim.index] = {
        status: "idle",
        image: null,
        promise: null,
        lastUsedAt: 0
      };
    }
  }, []);

  const loadFrame = useCallback(
    (index: number, eager = false): Promise<HTMLImageElement | null> => {
      const urls = frameUrlsRef.current;
      const store = frameStoreRef.current;
      const entry = store[index];
      if (!entry || !urls[index]) return Promise.resolve(null);

      if (entry.status === "loaded" && entry.image) {
        entry.lastUsedAt = performance.now();
        return Promise.resolve(entry.image);
      }

      if (entry.promise) return entry.promise;

      entry.status = "loading";
      entry.promise = new Promise((resolve) => {
        const img = new Image();
        img.decoding = "async";
        img.loading = eager ? "eager" : "lazy";

        img.onload = () => {
          entry.status = "loaded";
          entry.image = img;
          entry.promise = null;
          entry.lastUsedAt = performance.now();
          loadedRef.current += 1;
          setLoadedCount(loadedRef.current);
          evictCache();
          resolve(img);
        };

        img.onerror = () => {
          entry.status = "error";
          entry.promise = null;
          resolve(null);
        };

        img.src = urls[index];
      });

      return entry.promise;
    },
    [evictCache]
  );

  const pumpBackgroundQueue = useCallback(() => {
    while (bgWorkersRef.current < LOAD_CONCURRENCY && bgQueueRef.current.length) {
      const next = bgQueueRef.current.shift();
      if (next === undefined) return;

      bgWorkersRef.current += 1;
      void loadFrame(next, false).finally(() => {
        bgWorkersRef.current -= 1;
        pumpBackgroundQueue();
      });
    }
  }, [loadFrame]);

  const drawFrame = useCallback(
    (index: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext("2d", { alpha: false });
      if (!ctx) return;

      const urls = frameUrlsRef.current;
      const safeIndex = clamp(index, 0, Math.max(urls.length - 1, 0));
      const entry = frameStoreRef.current[safeIndex];

      if (!entry) return;
      entry.lastUsedAt = performance.now();

      if (entry.status !== "loaded" || !entry.image) {
        void loadFrame(safeIndex, true);
        return;
      }

      const img = entry.image;
      const cw = canvas.width;
      const ch = canvas.height;
      const iw = img.naturalWidth || img.width;
      const ih = img.naturalHeight || img.height;

      const scale = Math.max(cw / iw, ch / ih);
      const dw = iw * scale;
      const dh = ih * scale;
      const dx = (cw - dw) / 2;
      const dy = (ch - dh) / 2;

      ctx.clearRect(0, 0, cw, ch);
      ctx.drawImage(img, dx, dy, dw, dh);

      lastDrawnRef.current = safeIndex;
      setDisplayedFrame(safeIndex);

      // Keep neighboring frames warm near the current cursor.
      [safeIndex - 1, safeIndex + 1, safeIndex + 2, safeIndex - 2].forEach((neighbor) => {
        if (neighbor < 0 || neighbor >= urls.length) return;
        const candidate = frameStoreRef.current[neighbor];
        if (candidate && candidate.status === "idle") bgQueueRef.current.push(neighbor);
      });
      pumpBackgroundQueue();
    },
    [loadFrame, pumpBackgroundQueue]
  );

  const requestRender = useCallback(() => {
    if (rafRef.current !== null) return;

    const tick = () => {
      currentRef.current += (targetRef.current - currentRef.current) * LERP;
      const rounded = Math.round(currentRef.current);

      if (rounded !== lastDrawnRef.current) {
        drawFrame(rounded);
      }

      if (Math.abs(targetRef.current - currentRef.current) > 0.01) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        rafRef.current = null;
      }
    };

    rafRef.current = requestAnimationFrame(tick);
  }, [drawFrame]);

  useEffect(() => {
    let mounted = true;

    async function boot() {
      const response = await fetch("/frames/manifest.json", { cache: "no-store" });
      if (!response.ok) throw new Error("manifest.json missing");

      const manifest = (await response.json()) as Manifest;
      const files = Array.isArray(manifest.files) ? manifest.files : [];
      if (!files.length) throw new Error("No frames in manifest");

      const urls = files.map((name) => `/frames/${name}`);
      frameUrlsRef.current = urls;
      frameStoreRef.current = urls.map(() => ({
        status: "idle",
        image: null,
        promise: null,
        lastUsedAt: 0
      }));

      if (!mounted) return;

      loadedRef.current = 0;
      setLoadedCount(0);
      setFrameCount(urls.length);
      setErrorText(null);

      resizeCanvas();

      const immediate = Math.min(FIRST_BATCH, urls.length);
      await Promise.all(Array.from({ length: immediate }, (_, i) => loadFrame(i, true)));

      for (let i = immediate; i < urls.length; i += 1) {
        bgQueueRef.current.push(i);
      }
      pumpBackgroundQueue();

      drawFrame(0);
    }

    void boot().catch((error) => {
      console.error("Failed to initialize scroll animation", error);
      setErrorText("Frame sequence failed to load. Check /public/frames and manifest.json.");
    });

    return () => {
      mounted = false;
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [drawFrame, loadFrame, pumpBackgroundQueue, resizeCanvas]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const onScroll = () => {
      if (!inViewRef.current || frameUrlsRef.current.length === 0) return;

      const rect = section.getBoundingClientRect();
      const total = Math.max(section.offsetHeight - window.innerHeight, 1);
      const distance = clamp(-rect.top, 0, total);

      // Scroll mapping: progress [0..1] -> frame index [0..N-1].
      // Lerp in requestAnimationFrame smooths abrupt wheel/touch jumps.
      const progress = distance / total;
      targetRef.current = Math.round(progress * (frameUrlsRef.current.length - 1));
      requestRender();
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const active = Boolean(entries[0] && entries[0].isIntersecting);
        inViewRef.current = active;
        if (active) onScroll();
      },
      { threshold: 0 }
    );

    observer.observe(section);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", resizeCanvas);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [requestRender, resizeCanvas]);

  return (
    <section ref={sectionRef} className="relative h-[500vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center px-4">
        <canvas
          ref={canvasRef}
          className="block h-[80vh] w-[min(1240px,96vw)] rounded-xl border border-white/15 bg-black"
          aria-label="CortexAuto frame animation"
        />
        </div>

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#050505]/70 via-transparent to-[#050505]" />
        <div className="pointer-events-none absolute inset-x-0 top-12 mx-auto w-[min(900px,92vw)] text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-accent/90">Platform In Motion</p>
          <h2 className="mt-3 text-2xl font-semibold md:text-4xl">See CortexAuto react to every customer signal in real time.</h2>
        </div>

        {errorText ? (
          <div className="pointer-events-none absolute left-1/2 top-1/2 w-[min(680px,92vw)] -translate-x-1/2 -translate-y-1/2 rounded-xl border border-red-400/40 bg-black/80 p-5 text-center text-sm text-red-200">
            {errorText}
          </div>
        ) : null}

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full border border-white/20 bg-black/70 px-4 py-2 text-xs text-slate-200 backdrop-blur">
          <span>{loadingText}</span>
          <span className="mx-3 text-slate-500">|</span>
          <span>{frameText}</span>
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-0 left-0 h-48 w-full bg-gradient-to-b from-transparent to-[#050505]" />
    </section>
  );
}
