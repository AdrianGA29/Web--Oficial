import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Reveal({
  children,
  className,
  delay = 0,
  y = 24,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  return <div className={cn("reveal-on-scroll", className)} style={{ "--reveal-y": `${y}px`, "--reveal-delay": `${delay}s` } as CSSProperties}>{children}</div>;
}
