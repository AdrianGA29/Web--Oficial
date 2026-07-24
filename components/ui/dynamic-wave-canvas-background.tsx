"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

const TAU = Math.PI * 2;
const TABLE_SIZE = 1024;
const PRIMARY = [8, 9, 20] as const;
const INDIGO = [67, 48, 156] as const;
const MIST = [126, 119, 160] as const;

export function DynamicWaveCanvasBackground({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d", { alpha: false });
    if (!context) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const sinTable = new Float32Array(TABLE_SIZE);
    const cosTable = new Float32Array(TABLE_SIZE);
    for (let index = 0; index < TABLE_SIZE; index += 1) {
      const angle = (index / TABLE_SIZE) * TAU;
      sinTable[index] = Math.sin(angle);
      cosTable[index] = Math.cos(angle);
    }

    const fastSin = (value: number) => sinTable[(Math.floor((value / TAU) * TABLE_SIZE) & (TABLE_SIZE - 1))] ?? 0;
    const fastCos = (value: number) => cosTable[(Math.floor((value / TAU) * TABLE_SIZE) & (TABLE_SIZE - 1))] ?? 0;
    const clamp = (value: number, minimum = 0, maximum = 1) => Math.max(minimum, Math.min(maximum, value));

    let width = 1;
    let height = 1;
    let imageData = context.createImageData(1, 1);
    let pixels = imageData.data;
    let frame = 0;
    let visible = true;
    let documentVisible = !document.hidden;
    let lastFrame = 0;
    const fragmentCanvas = document.createElement("canvas");
    const fragmentContext = fragmentCanvas.getContext("2d", { alpha: false });
    const startedAt = performance.now();

    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      const scale = bounds.width < 720 ? 4.5 : 3.25;
      width = Math.max(1, Math.ceil(bounds.width / scale));
      height = Math.max(1, Math.ceil(bounds.height / scale));
      canvas.width = width;
      canvas.height = height;
      fragmentCanvas.width = width;
      fragmentCanvas.height = height;
      imageData = context.createImageData(width, height);
      pixels = imageData.data;
      render(performance.now(), true);
    };

    const render = (now: number, force = false) => {
      if (!force && (!visible || !documentVisible)) {
        frame = window.requestAnimationFrame(render);
        return;
      }
      if (!force && now - lastFrame < 34) {
        frame = window.requestAnimationFrame(render);
        return;
      }
      lastFrame = now;
      const time = reducedMotion ? 0.8 : (now - startedAt) * 0.00042;
      const inverseHeight = 1 / height;

      for (let y = 0; y < height; y += 1) {
        const unitY = (2 * y - height) * inverseHeight;
        for (let x = 0; x < width; x += 1) {
          const unitX = (2 * x - width) * inverseHeight;
          let a = 0;
          let d = 0;

          for (let iteration = 0; iteration < 4; iteration += 1) {
            a += fastCos(iteration - d + time - a * unitX);
            d += fastSin(iteration * unitY + a);
          }

          const wave = (fastSin(a) + fastCos(d)) * 0.5;
          const indigoPulse = clamp(0.045 + (wave + 1) * 0.055 + Math.max(0, fastSin(a * 1.55 + time * 0.7)) * 0.075, 0, 0.24);
          const mistPulse = clamp(Math.max(0, fastCos(d * 1.8 - time * 0.45) - 0.76) * 0.18, 0, 0.075);
          const light = clamp(0.91 + fastCos(unitX * 1.15 + unitY * 0.8 + time * 0.35) * 0.11, 0.76, 1.05);
          const baseWeight = 1 - indigoPulse - mistPulse;
          const pixelIndex = (y * width + x) * 4;

          pixels[pixelIndex] = Math.round((PRIMARY[0] * baseWeight + INDIGO[0] * indigoPulse + MIST[0] * mistPulse) * light);
          pixels[pixelIndex + 1] = Math.round((PRIMARY[1] * baseWeight + INDIGO[1] * indigoPulse + MIST[1] * mistPulse) * light);
          pixels[pixelIndex + 2] = Math.round((PRIMARY[2] * baseWeight + INDIGO[2] * indigoPulse + MIST[2] * mistPulse) * light);
          pixels[pixelIndex + 3] = 255;
        }
      }

      context.putImageData(imageData, 0, 0);

      const hero = canvas.closest<HTMLElement>(".temis-hero");
      const glitchStartedAt = Number(hero?.dataset.glitchStartedAt ?? Number.NaN);
      const glitchElapsed = now - glitchStartedAt;
      if (
        fragmentContext
        && Number.isFinite(glitchElapsed)
        && glitchElapsed >= 0
        && glitchElapsed < 900
        && !reducedMotion
      ) {
        fragmentContext.drawImage(canvas, 0, 0);

        const progress = glitchElapsed / 900;
        const energy = Math.max(0, 1 - progress);
        const pulse = progress < 0.18 || (progress > 0.28 && progress < 0.48) || (progress > 0.62 && progress < 0.7);
        const bands = [
          [0.08, 0.12, -0.024],
          [0.24, 0.09, 0.032],
          [0.39, 0.14, -0.018],
          [0.58, 0.1, 0.027],
          [0.73, 0.13, -0.021],
          [0.9, 0.07, 0.016],
        ] as const;

        if (pulse) {
          for (let bandIndex = 0; bandIndex < bands.length; bandIndex += 1) {
            const [top, bandHeight, direction] = bands[bandIndex];
            const sourceY = Math.round(height * top);
            const sourceHeight = Math.max(1, Math.round(height * bandHeight));
            const phase = bandIndex % 2 === 0 ? 1 : -1;
            const offset = Math.round(width * direction * energy * phase);

            context.drawImage(
              fragmentCanvas,
              0,
              sourceY,
              width,
              sourceHeight,
              offset,
              sourceY,
              width,
              sourceHeight,
            );

            context.save();
            context.globalCompositeOperation = "screen";
            context.globalAlpha = energy * (bandIndex % 2 === 0 ? 0.075 : 0.045);
            context.fillStyle = bandIndex % 2 === 0 ? "#0D00FF" : "#FFF700";
            context.fillRect(offset, sourceY, width, sourceHeight);
            context.restore();
          }
        }
      }

      if (!reducedMotion) frame = window.requestAnimationFrame(render);
    };

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry?.isIntersecting ?? false;
    }, { rootMargin: "120px" });
    const handleVisibility = () => {
      documentVisible = !document.hidden;
    };

    observer.observe(canvas);
    window.addEventListener("resize", resize, { passive: true });
    document.addEventListener("visibilitychange", handleVisibility);
    resize();
    if (!reducedMotion) frame = window.requestAnimationFrame(render);

    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className={cn("absolute inset-0 size-full", className)} />;
}
