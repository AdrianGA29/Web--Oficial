import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

type GlassNavbarProps = ComponentPropsWithoutRef<"nav"> & {
  compact: boolean;
};

export function GlassNavbar({ compact, className, children, ...props }: GlassNavbarProps) {
  return (
    <nav
      data-compact={compact ? "true" : "false"}
      className={cn(
        "glass-navbar backdrop-blur-2xl backdrop-saturate-150",
        compact ? "is-compact" : "lg:backdrop-blur-none lg:backdrop-saturate-100",
        className,
      )}
      {...props}
    >
      <span className="glass-navbar-highlight" aria-hidden="true" />
      <div className="glass-navbar-content">{children}</div>
    </nav>
  );
}
