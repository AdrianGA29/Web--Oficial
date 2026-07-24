import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

export function GradientText({ className, children, ...props }: ComponentPropsWithoutRef<"span">) {
  return (
    <span className={cn("temis-gradient-text", className)} {...props}>
      {children}
    </span>
  );
}
