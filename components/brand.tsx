import Link from "next/link";
import { cn } from "@/lib/utils";
import { BrandMark } from "@/components/brand-mark";

export function Brand({ className, animated = false }: { className?: string; animated?: boolean }) {
  return (
    <Link
      href="/"
      aria-label="Temis Atrile, ir al inicio"
      className={cn("brand-link group focus-ring inline-flex items-center justify-center rounded-lg", className)}
    >
      <BrandMark animated={animated} />
      <span className="brand-wordmark" aria-hidden="true">
        <span className="brand-wordmark-slot"><span className="brand-wordmark-word">Temis</span></span>
        {" "}
        <span className="brand-wordmark-slot"><span className="brand-wordmark-word">Atrile</span></span>
      </span>
      {animated && <noscript><style>{`
        .brand-mark[data-state="pending"] .brand-mark-ring { opacity: 1 !important; }
        .brand-mark[data-state="pending"] [data-logo-line] { stroke-dasharray: none !important; }
        .brand-mark[data-state="pending"] .brand-mark-arcs { display: none !important; }
        .brand-mark[data-state="pending"] ~ .brand-wordmark .brand-wordmark-word { opacity: 1 !important; transform: none !important; }
      `}</style></noscript>}
    </Link>
  );
}
