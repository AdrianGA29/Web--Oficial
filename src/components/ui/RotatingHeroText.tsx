import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";

type RotatingHeroTextProps = {
  prefix: string;
  words?: string[];
};

export function RotatingHeroText({ prefix, words }: RotatingHeroTextProps) {
  const rotatingWords = useMemo(
    () =>
      words ?? [
        "ganar control",
        "digitalizar procesos",
        "automatizar tareas",
        "seguir oportunidades",
        "aplicar IA con criterio",
      ],
    [words],
  );
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { amount: 0.1 });
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion || !isInView) return;

    const timeoutId = window.setTimeout(() => {
      setActiveIndex((current) => (current + 1) % rotatingWords.length);
    }, 2200);

    return () => window.clearTimeout(timeoutId);
  }, [activeIndex, isInView, rotatingWords.length, shouldReduceMotion]);

  return (
    <div ref={containerRef} className="flex min-h-9 w-full items-center justify-center gap-2.5 text-center md:justify-start md:text-left">
      <span className="shrink-0 text-base font-medium text-brand-primary/75 sm:text-lg">
        {prefix}
      </span>
      <span className="relative inline-grid min-h-9 min-w-0 place-items-center overflow-hidden md:place-items-start">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={rotatingWords[activeIndex]}
            initial={shouldReduceMotion ? false : { y: 16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={shouldReduceMotion ? { opacity: 1 } : { y: -16, opacity: 0 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.2, ease: "easeOut" }}
            className="inline-block whitespace-nowrap border-b-2 border-[#67b9e4] pb-0.5 text-[clamp(1.2rem,1.8vw,1.65rem)] font-semibold leading-tight text-[#2867d6] drop-shadow-[0_1px_8px_rgba(255,255,255,0.9)]"
          >
            {rotatingWords[activeIndex]}
          </motion.span>
        </AnimatePresence>
      </span>
    </div>
  );
}
