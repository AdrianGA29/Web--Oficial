import Link from "next/link";
import { cn } from "@/lib/utils";

export function Brand({ className, compact = false }: { className?: string; compact?: boolean }) {
  return (
    <Link
      href="/"
      aria-label="Nueva Empresa, ir al inicio"
      className={cn("focus-ring inline-flex items-center gap-3 rounded-lg", className)}
    >
      <span
        aria-hidden="true"
        className="relative grid size-9 shrink-0 place-items-center overflow-hidden rounded-[0.7rem] border border-sky/35 bg-ink text-sky shadow-[0_8px_22px_rgba(6,15,31,0.2)]"
      >
        <span className="absolute left-[9px] top-[9px] h-[14px] w-px rotate-45 bg-sky/80" />
        <span className="absolute right-[9px] top-[9px] h-[14px] w-px -rotate-45 bg-gold/80" />
        <span className="size-1.5 rounded-full bg-white shadow-[0_0_12px_rgba(255,255,255,0.8)]" />
      </span>
      {!compact && (
        <span className="text-[0.77rem] font-bold uppercase leading-none tracking-[0.17em] text-current sm:text-[0.82rem]">
          Nueva Empresa
        </span>
      )}
    </Link>
  );
}
