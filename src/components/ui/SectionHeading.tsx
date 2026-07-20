import { motion, useReducedMotion } from "motion/react";
import { cn } from "../../lib/utils";
import { enterTransition, fadeUpVariants } from "../../lib/motion";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  align?: "left" | "center";
  tone?: "default" | "inverse";
  titleClassName?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  align = "center",
  tone = "default",
  titleClassName,
}: SectionHeadingProps) {
  const isCentered = align === "center";
  const isInverse = tone === "inverse";
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className={isCentered ? "text-center" : "text-left"}>
      {eyebrow && (
        <motion.span
          variants={fadeUpVariants}
          initial={shouldReduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          transition={enterTransition()}
          className={cn(
            "block text-sm font-semibold uppercase",
            isInverse ? "text-brand-accent" : "text-brand-secondary",
          )}
        >
          {eyebrow}
        </motion.span>
      )}
      <motion.h2
        variants={fadeUpVariants}
        initial={shouldReduceMotion ? false : "hidden"}
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        transition={enterTransition(0.06)}
        className={cn(
          "mt-2 text-balance text-[clamp(1.75rem,3.2vw,3rem)] font-semibold leading-tight",
          isInverse ? "text-white" : "text-brand-primary",
          titleClassName,
        )}
      >
        {title}
      </motion.h2>
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, scaleX: 0 }}
        whileInView={{ opacity: 1, scaleX: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={enterTransition(0.12, 0.35)}
        style={{ originX: isCentered ? 0.5 : 0 }}
        className={cn(
          "mt-5 h-0.5 w-10",
          isInverse ? "bg-brand-accent" : "bg-brand-secondary",
          isCentered && "mx-auto",
        )}
      />
    </div>
  );
}

