"use client";

import { useEffect, useRef } from "react";

interface LightRaysProps {
  raysOrigin?: "top-center" | "center";
  raysColor?: string;
  raysSpeed?: number;
  lightSpread?: number;
  rayLength?: number;
  pulsating?: boolean;
  fadeDistance?: number;
  saturation?: number;
  followMouse?: boolean;
  mouseInfluence?: number;
  noiseAmount?: number;
  distortion?: number;
}

export default function LightRays({
  raysOrigin = "top-center",
  raysColor = "#ffffff",
  raysSpeed = 1.7,
  lightSpread = 1,
  rayLength = 5,
  pulsating = false,
  fadeDistance = 3,
  saturation = 2,
  followMouse = true,
  mouseInfluence = 0.55,
  noiseAmount = 0,
  distortion = 0,
}: LightRaysProps) {
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
      if (followMouse) {
        mouseRef.current = {
          x: e.clientX / window.innerWidth,
          y: e.clientY / window.innerHeight,
        };
      }
    };

    const drawRays = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      // Clear with dark background
      ctx.fillStyle = "#050505";
      ctx.fillRect(0, 0, width, height);

      // Parse color
      const hexToRgb = (hex: string) => {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16)
        } : { r: 255, g: 255, b: 255 };
      };

      const color = hexToRgb(raysColor);

      // Ray settings based on props
      const rayCount = Math.floor(20 * lightSpread);
      const originX = raysOrigin === "top-center" ? width / 2 : width / 2;
      const originY = raysOrigin === "top-center" ? 0 : height / 2;
      const maxRayWidth = 150 * lightSpread;
      const maxRayLen = height * (rayLength / 3);

      // Animate time with speed
      timeRef.current += 0.008 * raysSpeed;

      // Mouse influence
      const mouseOffsetX = (mouseRef.current.x - 0.5) * mouseInfluence * 200;
      const mouseOffsetY = mouseRef.current.y * mouseInfluence * 100;

      // Draw rays
      for (let i = 0; i < rayCount; i++) {
        const angle = (i / rayCount) * Math.PI * 2;
        const pulseFactor = pulsating ? 1 + 0.3 * Math.sin(timeRef.current * 2 + i * 0.5) : 1;
        const rayWidth = maxRayWidth * pulseFactor * (0.3 + 0.7 * Math.sin(timeRef.current + i * 0.4));

        // Opacity based on fadeDistance
        const opacityBase = 0.08 * saturation;
        const opacity = pulsating
          ? opacityBase * (0.7 + 0.3 * Math.sin(timeRef.current * 1.5 + i))
          : opacityBase;

        ctx.save();
        ctx.translate(originX + mouseOffsetX * 0.3, originY + mouseOffsetY * 0.2);

        // Add subtle distortion
        const distortionAngle = distortion * Math.sin(timeRef.current * 0.5 + i * 0.3) * 0.1;
        ctx.rotate(angle * 0.25 + distortionAngle);

        // Create ray gradient
        const gradient = ctx.createLinearGradient(0, 0, 0, maxRayLen);
        gradient.addColorStop(0, `rgba(${color.r}, ${color.g}, ${color.b}, ${opacity})`);
        gradient.addColorStop(1 / fadeDistance, `rgba(${color.r}, ${color.g}, ${color.b}, ${opacity * 0.4})`);
        gradient.addColorStop(2 / fadeDistance, `rgba(${color.r}, ${color.g}, ${color.b}, ${opacity * 0.1})`);
        gradient.addColorStop(1, "rgba(255, 255, 255, 0)");

        // Draw ray shape
        ctx.beginPath();
        ctx.moveTo(-rayWidth / 2, 0);
        ctx.lineTo(rayWidth / 2, 0);
        ctx.lineTo(rayWidth * 0.15, maxRayLen);
        ctx.lineTo(-rayWidth * 0.15, maxRayLen);
        ctx.closePath();

        // Add noise if specified
        if (noiseAmount > 0) {
          const imageData = ctx.getImageData(-rayWidth, 0, rayWidth * 2, maxRayLen);
          const data = imageData.data;
          for (let j = 0; j < data.length; j += 4) {
            const noise = (Math.random() - 0.5) * noiseAmount * 50;
            data[j] = Math.min(255, Math.max(0, data[j] + noise));
            data[j + 1] = Math.min(255, Math.max(0, data[j + 1] + noise));
            data[j + 2] = Math.min(255, Math.max(0, data[j + 2] + noise));
          }
          ctx.putImageData(imageData, -rayWidth, 0);
        }

        ctx.fillStyle = gradient;
        ctx.fill();

        ctx.restore();
      }

      // Add center glow
      const glowGradient = ctx.createRadialGradient(
        originX + mouseOffsetX * 0.5,
        originY,
        0,
        originX + mouseOffsetX * 0.5,
        originY,
        height * 1.2
      );
      glowGradient.addColorStop(0, `rgba(${color.r}, ${color.g}, ${color.b}, ${0.05 * saturation})`);
      glowGradient.addColorStop(0.5, `rgba(${color.r}, ${color.g}, ${color.b}, ${0.02 * saturation})`);
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
  }, [raysOrigin, raysColor, raysSpeed, lightSpread, rayLength, pulsating, fadeDistance, saturation, followMouse, mouseInfluence, noiseAmount, distortion]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10"
      style={{ width: "100vw", height: "100vh", background: "#050505" }}
      aria-label="Light rays animated background"
    />
  );
}
