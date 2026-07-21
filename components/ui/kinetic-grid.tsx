"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type Point = { x: number; y: number };
type Ripple = Point & { bornAt: number };
type Color = { r: number; g: number; b: number; a: number };

const CELL_SIZE = 55;
const DOT_SPACING = 28;
const INFLUENCE_RADIUS = 260;
const MAX_WARP = 24;
const RIPPLE_DURATION = 900;
const LINE_BASE: Color = { r: 255, g: 255, b: 255, a: 0.13 };
const LINE_ACTIVE: Color = { r: 74, g: 158, b: 255, a: 0.92 };
const NODE_BASE: Color = { r: 255, g: 255, b: 255, a: 0.24 };
const NODE_ACTIVE: Color = { r: 103, g: 185, b: 228, a: 1 };

function lerp(from: number, to: number, amount: number) {
  return from + (to - from) * amount;
}

function lerpColor(from: Color, to: Color, amount: number) {
  return `rgba(${Math.round(lerp(from.r, to.r, amount))},${Math.round(lerp(from.g, to.g, amount))},${Math.round(lerp(from.b, to.b, amount))},${lerp(from.a, to.a, amount).toFixed(3)})`;
}

function smoothstep(value: number) {
  return value * value * (3 - 2 * value);
}

export function KineticGrid({ children, className }: { children?: ReactNode; className?: string }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!root || !canvas || !context) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    let width = 1;
    let height = 1;
    let visible = false;
    let frame: number | null = null;
    let targetPointer: Point | null = null;
    let pointer: Point | null = null;
    let ripples: Ripple[] = [];

    const getGridPoint = (x: number, y: number, col: number, row: number, cols: number, rows: number, now: number) => {
      const edgeMargin = 1.5;
      const colPin = Math.min(col / edgeMargin, (cols - 1 - col) / edgeMargin, 1);
      const rowPin = Math.min(row / edgeMargin, (rows - 1 - row) / edgeMargin, 1);
      const pin = Math.max(0, colPin * colPin * rowPin * rowPin);
      let offsetX = 0;
      let offsetY = 0;
      let proximity = 0;

      if (pointer) {
        const dx = x - pointer.x;
        const dy = y - pointer.y;
        const distance = Math.hypot(dx, dy);
        proximity = Math.max(0, 1 - distance / INFLUENCE_RADIUS) * pin;
        if (distance > 0 && distance < INFLUENCE_RADIUS) {
          const normalized = distance / INFLUENCE_RADIUS;
          const centerSoftener = Math.min(1, distance / 60);
          const force = (1 - normalized) ** 2 * centerSoftener * MAX_WARP * pin;
          offsetX -= (dx / distance) * force;
          offsetY -= (dy / distance) * force;
        }
      }

      for (const ripple of ripples) {
        const progress = (now - ripple.bornAt) / RIPPLE_DURATION;
        if (progress >= 1) continue;
        const dx = x - ripple.x;
        const dy = y - ripple.y;
        const distance = Math.hypot(dx, dy);
        const radius = progress * 400;
        const difference = distance - radius;
        const wave = Math.max(0, 1 - Math.abs(difference) / 55) * (1 - progress) * pin;
        proximity = Math.max(proximity, wave * 0.9);
        if (distance > 0 && wave > 0) {
          const direction = difference < 0 ? -1 : 1;
          offsetX += (dx / distance) * wave * 18 * direction;
          offsetY += (dy / distance) * wave * 18 * direction;
        }
      }

      return { point: { x: x + offsetX, y: y + offsetY }, proximity };
    };

    const draw = (now = performance.now()) => {
      frame = null;
      context.clearRect(0, 0, width, height);

      if (targetPointer) {
        if (!pointer) pointer = { ...targetPointer };
        pointer.x = lerp(pointer.x, targetPointer.x, 0.08);
        pointer.y = lerp(pointer.y, targetPointer.y, 0.08);
      } else if (pointer) {
        pointer = null;
      }
      ripples = ripples.filter((ripple) => now - ripple.bornAt < RIPPLE_DURATION);

      context.fillStyle = "rgba(255,255,255,0.055)";
      for (let x = DOT_SPACING / 2; x < width; x += DOT_SPACING) {
        for (let y = DOT_SPACING / 2; y < height; y += DOT_SPACING) {
          context.beginPath();
          context.arc(x, y, 0.7, 0, Math.PI * 2);
          context.fill();
        }
      }

      const cols = Math.max(2, Math.ceil(width / CELL_SIZE)) + 1;
      const rows = Math.max(2, Math.ceil(height / CELL_SIZE)) + 1;
      const cellWidth = width / (cols - 1);
      const cellHeight = height / (rows - 1);
      const points: Point[][] = [];
      const proximities: number[][] = [];

      for (let row = 0; row < rows; row++) {
        points[row] = [];
        proximities[row] = [];
        for (let col = 0; col < cols; col++) {
          const result = getGridPoint(col * cellWidth, row * cellHeight, col, row, cols, rows, now);
          points[row][col] = result.point;
          proximities[row][col] = result.proximity;
        }
      }

      const drawSegment = (from: Point, to: Point, fromProximity: number, toProximity: number) => {
        const intensity = smoothstep((fromProximity + toProximity) / 2);
        context.beginPath();
        context.moveTo(from.x, from.y);
        context.lineTo(to.x, to.y);
        context.strokeStyle = lerpColor(LINE_BASE, LINE_ACTIVE, intensity);
        context.lineWidth = lerp(0.8, 1.6, intensity);
        context.stroke();
      };

      context.lineCap = "butt";
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols - 1; col++) {
          drawSegment(points[row][col], points[row][col + 1], proximities[row][col], proximities[row][col + 1]);
        }
      }
      for (let col = 0; col < cols; col++) {
        for (let row = 0; row < rows - 1; row++) {
          drawSegment(points[row][col], points[row + 1][col], proximities[row][col], proximities[row + 1][col]);
        }
      }

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const point = points[row][col];
          const intensity = smoothstep(proximities[row][col]);
          const radius = lerp(1.7, 3.4, intensity);
          if (intensity > 0.22) {
            const glowRadius = radius + lerp(2, 9, intensity);
            const glow = context.createRadialGradient(point.x, point.y, radius * 0.35, point.x, point.y, glowRadius);
            glow.addColorStop(0, `rgba(103,185,228,${(intensity * 0.48).toFixed(3)})`);
            glow.addColorStop(1, "rgba(103,185,228,0)");
            context.beginPath();
            context.arc(point.x, point.y, glowRadius, 0, Math.PI * 2);
            context.fillStyle = glow;
            context.fill();
          }
          context.beginPath();
          context.arc(point.x, point.y, radius, 0, Math.PI * 2);
          context.fillStyle = lerpColor(NODE_BASE, NODE_ACTIVE, intensity);
          context.fill();
        }
      }

      for (const ripple of ripples) {
        const progress = (now - ripple.bornAt) / RIPPLE_DURATION;
        const radius = Math.max(0.1, progress * 400);
        const opacity = Math.max(0, 1 - progress);
        context.beginPath();
        context.arc(ripple.x, ripple.y, radius, 0, Math.PI * 2);
        context.strokeStyle = `rgba(103,185,228,${(opacity * 0.42).toFixed(3)})`;
        context.lineWidth = 1.5;
        context.stroke();
      }

      const interacting = targetPointer !== null || pointer !== null || ripples.length > 0;
      if (visible && interacting && !document.hidden && !reducedMotion.matches) frame = requestAnimationFrame(draw);
    };

    const start = () => {
      if (frame === null && visible && !document.hidden && !reducedMotion.matches) frame = requestAnimationFrame(draw);
    };
    const resize = () => {
      const rect = root.getBoundingClientRect();
      width = Math.max(1, Math.round(rect.width));
      height = Math.max(1, Math.round(rect.height));
      if (!visible) return;
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      draw();
    };
    const localPoint = (event: PointerEvent): Point => {
      const rect = root.getBoundingClientRect();
      return { x: event.clientX - rect.left, y: event.clientY - rect.top };
    };
    const handlePointerMove = (event: PointerEvent) => {
      if (!finePointer.matches || reducedMotion.matches) return;
      targetPointer = localPoint(event);
      start();
    };
    const handlePointerLeave = () => { targetPointer = null; };
    const handlePointerDown = (event: PointerEvent) => {
      if (!finePointer.matches || reducedMotion.matches) return;
      ripples.push({ ...localPoint(event), bornAt: performance.now() });
      start();
    };
    const handleVisibility = () => {
      if (document.hidden && frame !== null) {
        cancelAnimationFrame(frame);
        frame = null;
      } else start();
    };
    const handleMotionPreference = () => {
      if (frame !== null) cancelAnimationFrame(frame);
      frame = null;
      targetPointer = null;
      pointer = null;
      ripples = [];
      root.dataset.kineticActive = String(visible && !reducedMotion.matches);
      draw();
    };

    const resizeObserver = new ResizeObserver(resize);
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      root.dataset.kineticActive = String(visible && !reducedMotion.matches);
      if (visible) {
        resize();
        start();
      } else {
        if (frame !== null) cancelAnimationFrame(frame);
        frame = null;
        canvas.width = 1;
        canvas.height = 1;
      }
    }, { rootMargin: "400px 0px" });

    resizeObserver.observe(root);
    intersectionObserver.observe(root);
    root.addEventListener("pointermove", handlePointerMove, { passive: true });
    root.addEventListener("pointerleave", handlePointerLeave);
    root.addEventListener("pointerdown", handlePointerDown, { passive: true });
    document.addEventListener("visibilitychange", handleVisibility);
    reducedMotion.addEventListener("change", handleMotionPreference);

    return () => {
      if (frame !== null) cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      root.removeEventListener("pointermove", handlePointerMove);
      root.removeEventListener("pointerleave", handlePointerLeave);
      root.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("visibilitychange", handleVisibility);
      reducedMotion.removeEventListener("change", handleMotionPreference);
    };
  }, []);

  return (
    <div ref={rootRef} className={cn("kinetic-grid relative overflow-hidden", className)} data-kinetic-active="false">
      <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 z-[1]" aria-hidden="true" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
