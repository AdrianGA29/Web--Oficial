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
        "glass-navbar",
        compact && "is-compact",
        className,
      )}
      {...props}
    >
      <span className="glass-navbar-highlight" aria-hidden="true" />
      <div className="glass-navbar-content">{children}</div>
    </nav>
  );
}
