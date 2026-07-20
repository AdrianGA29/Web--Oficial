import type { Transition, Variants } from "motion/react";

export const motionDuration = {
  feedback: 0.18,
  enter: 0.45,
} as const;

export const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0 },
};

export const fadeInVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export const scaleInVariants: Variants = {
  hidden: { opacity: 0, scale: 0.97 },
  visible: { opacity: 1, scale: 1 },
};

export function enterTransition(delay = 0, duration: number = motionDuration.enter): Transition {
  return { duration, delay, ease: "easeOut" };
}
