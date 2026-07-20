import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { ChevronDown, Mouse } from "lucide-react";

type Props = {
  onClick: () => void;
};

export function ScrollIndicator({ onClick }: Props) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const isInView = useInView(buttonRef, { amount: 0.5 });
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.button
      ref={buttonRef}
      type="button"
      onClick={onClick}
      initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: shouldReduceMotion ? 0 : 0.5,
        duration: shouldReduceMotion ? 0 : 0.45,
        ease: "easeOut",
      }}
      className="absolute bottom-5 left-1/2 z-30 hidden -translate-x-1/2 flex-col items-center gap-1 p-2 text-brand-ink drop-shadow-[0_2px_5px_rgba(255,255,255,0.9)] transition-[color,transform] duration-200 hover:-translate-y-0.5 hover:text-brand-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent md:flex"
      aria-label="Desplazarse hacia abajo"
    >
      <span className="text-[0.65rem] font-semibold uppercase text-brand-primary/80">
        Explorar
      </span>
      <motion.div
        animate={!shouldReduceMotion && isInView ? { y: [0, 3, 0] } : { y: 0 }}
        transition={{
          duration: 1.6,
          repeat: !shouldReduceMotion && isInView ? Infinity : 0,
          ease: "easeInOut",
        }}
        className="flex flex-col items-center"
      >
        <Mouse size={21} strokeWidth={1.8} aria-hidden="true" />
        <ChevronDown className="-mt-0.5" size={15} strokeWidth={2.2} aria-hidden="true" />
      </motion.div>
    </motion.button>
  );
}
