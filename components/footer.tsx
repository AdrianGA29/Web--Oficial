import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Brand } from "@/components/brand";
import { services } from "@/lib/services";

const linkClass = "link-underline focus-ring rounded-md text-sm text-white/58 hover:text-white";

export function Footer() {
  return (
    <footer className="dark-grid noise relative overflow-hidden border-t border-white/10 text-white">
      <div className="container-shell relative z-10 pt-20">
        <div className="grid gap-12 border-b border-white/12 pb-14 md:grid-cols-2 lg:grid-cols-[1.35fr_1fr_0.8fr]">
          <div>
            <Brand className="text-white" />
            <p className="mt-6 max-w-md text-base leading-7 text-white/58">
              Diagnóstico, sistemas y automatización para convertir fricción operativa en una base clara para crecer.
            </p>
            <Link
              href="/diagnostico"
              className="focus-ring mt-7 inline-flex items-center gap-2 rounded-lg font-semibold text-sky transition-colors hover:text-white"
            >
              <span className="link-underline">Empezar por el diagnóstico</span> <ArrowUpRight size={17} aria-hidden="true" />
            </Link>
          </div>
          <div>
            <p className="font-mono text-[0.7rem] font-bold uppercase tracking-[0.15em] text-sky">Servicios</p>
            <ul className="mt-6 grid gap-3.5">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link href={`/servicios/${service.slug}`} className={linkClass}>
                    {service.shortTitle}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-mono text-[0.7rem] font-bold uppercase tracking-[0.15em] text-sky">Compañía</p>
            <ul className="mt-6 grid gap-3.5">
              <li><Link href="/#metodo" className={linkClass}>Método</Link></li>
              <li><Link href="/nosotros" className={linkClass}>Nosotros</Link></li>
              <li><Link href="/contacto" className={linkClass}>Contacto</Link></li>
              <li><Link href="/privacidad" className={linkClass}>Privacidad</Link></li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col gap-4 py-7 text-xs text-white/60 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Nueva Empresa. Identidad provisional.</p>
          <div className="flex gap-5">
            <Link href="/terminos" className={linkClass}>Términos</Link>
            <Link href="/cookies" className={linkClass}>Cookies</Link>
          </div>
        </div>
        <p aria-hidden="true" className="select-none overflow-hidden pb-2 text-center text-[clamp(4rem,13vw,10.5rem)] font-semibold leading-[0.78] tracking-[-0.07em] text-white/[0.035]">
          SISTEMA
        </p>
      </div>
    </footer>
  );
}
