import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { enterTransition, fadeUpVariants } from "../../lib/motion";

type Props = {
  children: ReactNode;
  delay?: number;
  className?: string;
  duration?: number;
};

export function AnimateOnScroll({
  children,
  delay = 0,
  className,
  duration = 0.45,
}: Props) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      variants={fadeUpVariants}
      initial={shouldReduceMotion ? false : "hidden"}
      whileInView="visible"
      viewport={{ once: true, amount: 0.15, margin: "0px 0px -60px 0px" }}
      transition={enterTransition(delay, duration)}
      className={className}
    >
      {children}
    </motion.div>
  );
}
