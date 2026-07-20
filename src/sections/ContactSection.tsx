import { Mail, Phone } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { ContactForm } from "../components/ContactForm";
import { contactItems } from "../data/site";
import { enterTransition, fadeUpVariants } from "../lib/motion";
import type { AppView } from "../types";

type ContactSectionProps = {
  onNavigate: (view: AppView) => void;
};

export function ContactSection({ onNavigate }: ContactSectionProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="contacto"
      className="relative z-20 w-full border-y border-white/10 bg-brand-dark py-[clamp(4.5rem,7vw,7rem)] text-white"
    >
      <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16 lg:px-8">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={enterTransition()}
        >
          <p className="mb-10 text-sm font-bold uppercase tracking-[0.18em] text-white">
            Nueva Empresa
          </p>

          <h2 className="max-w-xl text-balance text-[clamp(2rem,3.5vw,3.5rem)] font-semibold leading-tight text-white">
            Demos el primer paso hacia una operativa eficiente
          </h2>
          <p className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-white/75 sm:text-lg">
            Sesión de Diagnóstico Operativo. Primera hora sin coste.
          </p>
          <p className="mt-4 max-w-xl text-pretty text-sm font-medium leading-relaxed text-white/65 sm:text-base">
            En esta sesión estratégica analizamos el ADN de tu empresa: cuellos de
            botella, riesgos legales y áreas de mejora financiera. No vendemos
            herramientas cerradas; diseñamos arquitectura a medida para tu negocio.
          </p>

          <div className="mt-10 border-t border-white/15 pt-8">
            <h3 className="mb-6 text-base font-semibold text-white">
              Información de contacto
            </h3>
            <motion.div
              variants={{ hidden: {}, visible: {} }}
              initial={shouldReduceMotion ? false : "hidden"}
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              className="grid gap-x-6 gap-y-5 sm:grid-cols-2 lg:grid-cols-1"
            >
              {contactItems.map((item, index) => {
                const Icon = item.type === "email" ? Mail : Phone;

                return (
                  <motion.div
                    key={`${item.label}-${item.value}`}
                    variants={fadeUpVariants}
                    transition={enterTransition(0.08 + index * 0.06)}
                    className="flex min-w-0 items-start gap-3"
                  >
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-control border border-white/15 text-brand-accent">
                      <Icon size={17} aria-hidden="true" />
                    </div>
                    <div className="min-w-0 pt-0.5">
                      <p className="text-sm text-white/55">{item.label}</p>
                      <a
                        href={item.href}
                        className="break-all rounded-control text-sm font-semibold text-white transition-colors duration-200 hover:text-brand-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent sm:text-base"
                      >
                        {item.value}
                      </a>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={enterTransition(0.08)}
          className="border-t border-white/15 pt-10 lg:border-l lg:border-t-0 lg:pl-16 lg:pt-0"
        >
          <h3 className="text-balance text-2xl font-semibold text-white sm:text-3xl">
            Solicita tu diagnóstico de eficiencia.
          </h3>
          <p className="mb-8 mt-3 text-pretty text-base leading-relaxed text-white/65">
            Nuestro equipo multidisciplinar revisará tu caso para proponerte una hoja
            de ruta clara, realista y orientada a optimizar procesos de forma segura y rentable.
          </p>
          <ContactForm onPrivacyClick={() => onNavigate("privacy")} />
        </motion.div>
      </div>
    </section>
  );
}
