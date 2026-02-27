"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

// Detect basePath for GitHub Pages deployment
function getBasePath(): string {
  if (typeof window === "undefined") return "";
  const path = window.location.pathname;
  // Check if we're under a subpath like /DealerLandingPage/
  const match = path.match(/^\/([^/]+)/);
  if (match && match[1] && !match[1].startsWith("_")) {
    return `/${match[1]}`;
  }
  return "";
}

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
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);

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
  const [isReady, setIsReady] = useState(false);

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = clamp(window.devicePixelRatio || 1, 1, 2);
    const width = Math.max(1, Math.round(window.innerWidth * dpr));
    const height = Math.max(1, Math.round(window.innerHeight * dpr));

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

      // Cover fit - like CSS object-fit: cover
      const canvasRatio = cw / ch;
      const imgRatio = iw / ih;
      let dw, dh;

      if (imgRatio > canvasRatio) {
        dh = ch;
        dw = iw * (ch / ih);
      } else {
        dw = cw;
        dh = ih * (cw / iw);
      }

      const dx = (cw - dw) / 2;
      const dy = (ch - dh) / 2;

      ctx.clearRect(0, 0, cw, ch);
      ctx.drawImage(img, dx, dy, dw, dh);

      // Add subtle dark overlay for readability
      ctx.fillStyle = "rgba(5, 5, 5, 0.15)";
      ctx.fillRect(0, 0, cw, ch);

      lastDrawnRef.current = safeIndex;

      // Keep neighboring frames warm
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
      const basePath = getBasePath();
      const response = await fetch(`${basePath}/frames/manifest.json`, { cache: "no-store" });
      if (!response.ok) throw new Error("manifest.json missing");

      const manifest = (await response.json()) as Manifest;
      const files = Array.isArray(manifest.files) ? manifest.files : [];
      if (!files.length) throw new Error("No frames in manifest");

      const urls = files.map((name) => `${basePath}/frames/${name}`);
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

      resizeCanvas();

      const immediate = Math.min(FIRST_BATCH, urls.length);
      await Promise.all(Array.from({ length: immediate }, (_, i) => loadFrame(i, true)));

      for (let i = immediate; i < urls.length; i += 1) {
        bgQueueRef.current.push(i);
      }
      pumpBackgroundQueue();

      drawFrame(0);
      setIsReady(true);
    }

    void boot().catch((error) => {
      console.error("Failed to initialize scroll animation", error);
    });

    return () => {
      mounted = false;
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [drawFrame, loadFrame, pumpBackgroundQueue, resizeCanvas]);

  useEffect(() => {
    const onScroll = () => {
      if (frameUrlsRef.current.length === 0) return;

      // Use full page scroll height for animation
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      const progress = clamp(currentScroll / totalScroll, 0, 1);

      targetRef.current = Math.round(progress * (frameUrlsRef.current.length - 1));
      requestRender();
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", resizeCanvas);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [requestRender, resizeCanvas]);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 -z-10"
        style={{
          width: '100vw',
          height: '100vh',
          objectFit: 'cover',
          background: '#000',
          display: 'block'
        }}
        aria-label="CortexAuto animated background"
      />

      {/* Loading indicator */}
      {!isReady && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-bg">
          <div className="text-center">
            <div className="text-sm text-muted">
              Loading {Math.round((loadedCount / frameCount) * 100)}%
            </div>
            <div className="text-xs text-muted mt-2">
              {loadedCount} / {frameCount} frames
            </div>
          </div>
        </div>
      )}
    </>
  );
}
