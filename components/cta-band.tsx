import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { buttonClass } from "@/components/button";

export function CtaBand({
  eyebrow = "Primer paso",
  title = "No necesitas tener la solución. Solo un problema que merezca orden.",
  description = "En la primera sesión analizamos el proceso, su impacto y el punto más sensato por el que empezar.",
}: {
  eyebrow?: string;
  title?: string;
  description?: string;
}) {
  return (
    <section className="bg-cloud py-[clamp(4rem,7vw,6.5rem)]">
      <div className="container-shell overflow-hidden rounded-[1.5rem] bg-gradient-to-br from-primary to-ink p-[clamp(1.6rem,5vw,4.5rem)] text-white shadow-[0_30px_90px_rgba(6,15,31,0.2)]">
        <div className="grid items-end gap-8 lg:grid-cols-[1fr_auto]">
          <div>
            <p className="eyebrow text-sky">{eyebrow}</p>
            <h2 className="mt-5 max-w-3xl text-balance text-[clamp(2rem,4vw,3.75rem)] font-semibold leading-[1.03] tracking-[-0.045em]">{title}</h2>
            <p className="mt-5 max-w-2xl text-base leading-7 text-white/60">{description}</p>
          </div>
          <Link href="/#contacto" className={buttonClass("outline", "shrink-0 bg-white text-primary hover:bg-cloud hover:text-primary")}>
            Cuéntanos tu caso <ArrowUpRight size={17} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
