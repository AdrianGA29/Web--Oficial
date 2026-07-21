"use client";

import { useRef, type PointerEvent, type ReactNode } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

type GlassCardProps = {
  children: ReactNode;
  className?: string;
  variant?: "card" | "feature" | "portrait";
};

export function GlassCard({ children, className, variant = "card" }: GlassCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const tilt = variant === "feature" ? 1.2 : variant === "portrait" ? 2.2 : 4;

  const rotateX = useSpring(useTransform(mouseY, [0, 1], [tilt, -tilt]), { stiffness: 190, damping: 24, mass: 0.65 });
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-tilt, tilt]), { stiffness: 190, damping: 24, mass: 0.65 });

  const updatePointer = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "touch") return;
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    mouseX.set(x);
    mouseY.set(y);
    card.style.setProperty("--glass-x", `${x * 100}%`);
    card.style.setProperty("--glass-y", `${y * 100}%`);
  };

  const resetPointer = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
    cardRef.current?.style.setProperty("--glass-x", "50%");
    cardRef.current?.style.setProperty("--glass-y", "0%");
  };

  return (
    <motion.div
      ref={cardRef}
      data-variant={variant}
      onPointerMove={updatePointer}
      onPointerLeave={resetPointer}
      style={{ rotateX: reducedMotion ? 0 : rotateX, rotateY: reducedMotion ? 0 : rotateY, transformPerspective: variant === "feature" ? 1400 : variant === "portrait" ? 1100 : 900 }}
      className={cn(
        "aicanvas-glass-card backdrop-saturate-125",
        variant === "feature" || variant === "portrait" ? "backdrop-blur-md" : "backdrop-blur-sm",
        className,
      )}
    >
      <span className="aicanvas-glass-ambient" aria-hidden="true" />
      <span className="aicanvas-glass-edge" aria-hidden="true" />
      <div className="aicanvas-glass-content">{children}</div>
    </motion.div>
  );
}
