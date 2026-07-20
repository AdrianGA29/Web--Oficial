import { Mail, Phone } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { contactItems } from "../data/site";
import type { AppView } from "../types";
import { enterTransition, fadeUpVariants } from "../lib/motion";
import { FooterBackgroundGradient, TextHoverEffect } from "./ui/hover-footer";

type FooterProps = {
  onNavigate: (view: AppView) => void;
  onSectionClick: (href: string) => void;
};

const footerLinkClass =
  "nav-link-underline rounded-control text-white/65 transition-colors duration-200 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent";

const serviceLinks = [
  { label: "Primera hora sin coste", href: "#contacto" },
  { label: "Soluciones de Transformación Operativa", href: "#soluciones" },
  { label: "Automatización e IA", href: "#diferenciacion" },
];

export function Footer({ onNavigate, onSectionClick }: FooterProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <footer className="relative z-20 w-full overflow-hidden border-t border-white/10 bg-brand-ink text-white">
      <FooterBackgroundGradient />
      <motion.div
        aria-hidden="true"
        className="absolute left-0 top-0 z-10 h-1 w-48 bg-brand-accent"
        initial={shouldReduceMotion ? false : { x: "-100%" }}
        whileInView={shouldReduceMotion ? undefined : { x: "0%" }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: shouldReduceMotion ? 0 : 0.6, ease: "easeOut" }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 pb-8 pt-[clamp(4rem,7vw,6rem)] lg:px-8">
        <motion.div
          variants={fadeUpVariants}
          initial={shouldReduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          transition={enterTransition()}
          className="grid gap-10 border-b border-white/15 pb-12 sm:grid-cols-2 lg:grid-cols-[1.35fr_0.85fr_0.85fr_1.25fr] lg:gap-10 lg:pb-14"
        >
          <div className="sm:col-span-2 lg:col-span-1 lg:pr-10">
            <button
              type="button"
              onClick={() => onNavigate("landing")}
              className="mb-6 rounded-control focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent"
              aria-label="Ir al inicio"
            >
              <span className="text-sm font-bold uppercase tracking-[0.18em] text-white">
                Nueva Empresa
              </span>
            </button>
            <p className="max-w-sm text-pretty text-base leading-relaxed text-white/60">
              Ayudamos a pymes y negocios locales a detectar dónde pierden tiempo,
              mejorar procesos y aplicar automatización e IA con criterio.
            </p>
          </div>

          <div>
            <h2 className="mb-6 text-base font-semibold leading-6 text-white">Servicios</h2>
            <ul className="grid gap-3 text-sm leading-6 sm:text-base">
              {serviceLinks.map((item) => (
                <li key={item.href} className="flex min-h-6 items-center">
                  <a
                    href={item.href}
                    onClick={(event) => {
                      event.preventDefault();
                      onSectionClick(item.href);
                    }}
                    className={footerLinkClass}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="mb-6 text-base font-semibold leading-6 text-white">Compañía</h2>
            <ul className="grid gap-3 text-sm leading-6 sm:text-base">
              <li className="flex min-h-6 items-center">
                <a
                  href="#equipo"
                  onClick={(event) => {
                    event.preventDefault();
                    onSectionClick("#equipo");
                  }}
                  className={footerLinkClass}
                >
                  Equipo
                </a>
              </li>
              <li className="flex min-h-6 items-center">
                <a
                  href="mailto:produccion@example.com?subject=Trabajar con nosotros"
                  className={footerLinkClass}
                >
                  Carreras
                </a>
              </li>
              <li className="flex min-h-6 items-center">
                <button
                  type="button"
                  onClick={() => onNavigate("privacy")}
                  className={`${footerLinkClass} cursor-pointer`}
                >
                  Privacidad
                </button>
              </li>
            </ul>
          </div>

          <div className="sm:col-span-2 lg:col-span-1">
            <h2 className="mb-6 text-base font-semibold leading-6 text-white">Contacto</h2>
            <ul className="grid gap-x-6 gap-y-3 text-sm leading-6 sm:grid-cols-2 sm:text-base lg:grid-cols-1">
              {contactItems.map((item) => {
                const Icon = item.type === "email" ? Mail : Phone;

                return (
                  <li key={`${item.label}-${item.value}`} className="flex min-h-6 min-w-0 items-center gap-3">
                    <Icon size={17} className="shrink-0 text-brand-accent" aria-hidden="true" />
                    <a href={item.href} className={`${footerLinkClass} min-w-0 break-all`}>
                      {item.value}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </motion.div>

        <motion.div
          variants={fadeUpVariants}
          initial={shouldReduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          transition={enterTransition(0.08)}
          className="flex flex-col gap-5 pt-7 text-sm text-white/50 sm:flex-row sm:items-center sm:justify-between"
        >
          <p className="text-pretty">
            © {new Date().getFullYear()} Nueva Empresa. Todos los derechos reservados.
          </p>
          <div className="flex gap-6">
            <button type="button" onClick={() => onNavigate("terms")} className={footerLinkClass}>
              Términos
            </button>
            <button type="button" onClick={() => onNavigate("privacy")} className={footerLinkClass}>
              Cookies
            </button>
          </div>
        </motion.div>
      </div>

      <div className="relative z-10 mx-auto -mb-4 hidden h-[clamp(12rem,18vw,16rem)] max-w-7xl px-6 lg:block lg:px-8">
        <TextHoverEffect text="NUEVA EMPRESA" />
      </div>
    </footer>
  );
}
