import Link from "next/link";
import { cn } from "@/lib/utils";

export function Brand({ className, compact = false }: { className?: string; compact?: boolean }) {
  return (
    <Link
      href="/"
      aria-label="Temis Λtrile, ir al inicio"
      className={cn("group focus-ring inline-flex items-center rounded-lg", className)}
    >
      {!compact && (
        <span className="text-[0.82rem] font-semibold leading-none tracking-[0.105em] text-current sm:text-[0.9rem]">
          Temis <span className="relative inline-block text-[1.08em] font-medium text-blue">Λ<span className="absolute inset-x-[0.08em] -bottom-[0.16em] h-px origin-left scale-x-0 bg-current transition-transform duration-500 group-hover:scale-x-100" /></span>trile
        </span>
      )}
    </Link>
  );
}
