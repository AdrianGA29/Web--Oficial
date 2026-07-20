import { useRef, type ComponentProps, type ReactNode } from "react";
import { useInView, useReducedMotion } from "motion/react";
import { cn } from "../../lib/utils";

export type MarqueeProps = Omit<ComponentProps<"div">, "children"> & {
  children: ReactNode;
  pauseOnHover?: boolean;
};

export function Marquee({
  children,
  className = "",
  pauseOnHover = false,
  ...props
}: MarqueeProps) {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(marqueeRef, { amount: 0.05 });
  const shouldReduceMotion = useReducedMotion();
  const animationPlayState = isInView && !shouldReduceMotion ? "running" : "paused";
  const trackClassName = cn(
    "marquee-track flex w-max shrink-0 items-stretch gap-[var(--gap)]",
    pauseOnHover && "marquee-track-pausable",
  );

  return (
    <div
      ref={marqueeRef}
      tabIndex={0}
      className={cn(
        "marquee flex w-full gap-[var(--gap)] overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-inset",
        className,
      )}
      {...props}
    >
      <div className={trackClassName} style={{ animationPlayState }}>{children}</div>
      <div className={trackClassName} style={{ animationPlayState }} aria-hidden="true">
        {children}
      </div>
    </div>
  );
}
