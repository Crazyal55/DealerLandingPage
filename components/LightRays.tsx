"use client";

import { useEffect, useRef } from "react";

export default function LightRays() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0.5, y: 0 });
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      };
    };

    const drawRays = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      // Clear with dark background
      ctx.fillStyle = "#050505";
      ctx.fillRect(0, 0, width, height);

      // Ray settings
      const rayCount = 12;
      const originX = width / 2;
      const originY = 0;
      const maxRayWidth = 120;
      const rayLength = height * 1.5;

      // Animate time
      timeRef.current += 0.005;

      // Draw rays
      for (let i = 0; i < rayCount; i++) {
        const angle = (i / rayCount) * Math.PI * 2;
        const rayWidth = maxRayWidth * (0.5 + 0.5 * Math.sin(timeRef.current + i * 0.5));
        const opacity = 0.03 + 0.02 * Math.sin(timeRef.current * 0.7 + i);

        // Mouse influence on ray direction
        const mouseInfluenceX = (mouseRef.current.x - 0.5) * 100;
        const mouseInfluenceY = mouseRef.current.y * 50;

        ctx.save();
        ctx.translate(originX, originY);
        ctx.rotate(angle * 0.3 + mouseInfluenceX * 0.001);

        // Create ray gradient
        const gradient = ctx.createLinearGradient(0, 0, 0, rayLength);
        gradient.addColorStop(0, `rgba(255, 255, 255, ${opacity})`);
        gradient.addColorStop(0.3, `rgba(255, 255, 255, ${opacity * 0.5})`);
        gradient.addColorStop(1, "rgba(255, 255, 255, 0)");

        // Draw ray
        ctx.beginPath();
        ctx.moveTo(-rayWidth / 2, 0);
        ctx.lineTo(rayWidth / 2, 0);
        ctx.lineTo(rayWidth * 0.1, rayLength);
        ctx.lineTo(-rayWidth * 0.1, rayLength);
        ctx.closePath();

        ctx.fillStyle = gradient;
        ctx.fill();

        ctx.restore();
      }

      // Add subtle center glow
      const glowGradient = ctx.createRadialGradient(
        width / 2 + mouseInfluenceX,
        0,
        0,
        width / 2 + mouseInfluenceX,
        0,
        height * 0.8
      );
      glowGradient.addColorStop(0, "rgba(255, 255, 255, 0.02)");
      glowGradient.addColorStop(1, "rgba(255, 255, 255, 0)");

      ctx.fillStyle = glowGradient;
      ctx.fillRect(0, 0, width, height);

      animationId = requestAnimationFrame(drawRays);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouseMove);

    drawRays();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10"
      style={{ width: "100vw", height: "100vh", background: "#050505" }}
      aria-label="Light rays animated background"
    />
  );
}
