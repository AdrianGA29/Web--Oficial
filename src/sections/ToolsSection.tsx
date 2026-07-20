import {
  ArrowRight,
  Building2,
  ExternalLink,
  Hotel,
  MonitorSmartphone,
  Wrench,
} from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { AnimateOnScroll } from "../components/ui/AnimateOnScroll";
import { SectionHeading } from "../components/ui/SectionHeading";
import { buttonStyles } from "../components/ui/Button";
import { toolDemos } from "../data/site";
import { cn } from "../lib/utils";
import { enterTransition, fadeUpVariants } from "../lib/motion";

const demoIcons = [Building2, Hotel, Wrench, MonitorSmartphone];
const demoLabels = ["CRM inteligente", "Operativa hotelera", "Presupuesto técnico", "Experiencia web"];

export function ToolsSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="soluciones"
      className="relative z-20 w-full overflow-hidden border-t border-border-subtle bg-surface py-[clamp(4.5rem,7vw,7.5rem)]"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-8 text-center lg:grid-cols-[0.95fr_1.05fr] lg:items-end lg:text-left">
          <SectionHeading
            eyebrow="Soluciones de Transformación Operativa"
            title="Diseñamos sistemas que resuelven fricciones reales"
            align="left"
          />
          <AnimateOnScroll delay={0.1}>
            <p className="max-w-3xl text-pretty text-base leading-relaxed text-text-muted sm:text-lg lg:ml-auto">
              Diseñamos sistemas que integran legalidad, procesos técnicos y experiencia de
              usuario. Estos casos prácticos muestran cómo centralizamos datos, automatizamos
              trabajo manual y eliminamos fricciones para que las empresas tomen decisiones
              estratégicas con más seguridad.
            </p>
          </AnimateOnScroll>
        </div>

        <motion.div
          variants={{ hidden: {}, visible: {} }}
          initial={shouldReduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.12, margin: "0px 0px -60px 0px" }}
          className="mt-[clamp(2.75rem,5vw,4.75rem)] grid grid-cols-1 gap-6 text-left md:grid-cols-2 lg:gap-8"
        >
          {toolDemos.map((demo, index) => {
            const Icon = demoIcons[index] ?? Building2;

            return (
              <motion.article
                key={demo.name}
                variants={fadeUpVariants}
                transition={enterTransition(index * 0.06)}
                className="group relative flex min-h-[31rem] flex-col overflow-hidden rounded-card border border-brand-primary/10 bg-white shadow-card transition-[transform,box-shadow,border-color] duration-200 hover:-translate-y-1 hover:border-brand-secondary/35 hover:shadow-card-hover"
              >
                <div className="bg-brand-ink px-6 py-6 text-white lg:px-7">
                  <div className="flex items-start justify-between gap-5">
                    <div className="flex min-w-0 items-center gap-3">
                      <span className="flex size-12 shrink-0 items-center justify-center rounded-control border border-white/15 bg-white/10 text-brand-accent">
                        <Icon size={25} strokeWidth={1.8} aria-hidden="true" />
                      </span>
                      <div className="min-w-0">
                        <p className="text-xs font-semibold uppercase text-brand-accent">
                          {demoLabels[index]}
                        </p>
                        <h3 className="mt-1 truncate text-2xl font-semibold leading-tight text-white">
                          {demo.name}
                        </h3>
                      </div>
                    </div>
                    <span className="shrink-0 rounded-full border border-white/15 px-3 py-1 text-xs font-semibold uppercase text-white/75">
                      Demo
                    </span>
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-6 lg:p-7">
                  <p className="text-pretty text-base font-medium leading-relaxed text-brand-primary/85">
                    {demo.audience}
                  </p>

                  <div className="mt-6">
                    <p className="mb-3 text-xs font-semibold uppercase text-brand-primary/45">
                      Qué mejora
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {demo.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-brand-primary/10 bg-brand-light px-3 py-1 text-xs font-semibold text-brand-secondary"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <p className="mt-6 text-pretty text-base leading-relaxed text-text-muted">
                    {demo.description}
                  </p>

                  <div className="mt-auto pt-8">
                    {demo.href ? (
                      <a
                        href={demo.href}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`${demo.cta}, se abre en una pestaña nueva`}
                        className={buttonStyles({
                          variant: "primary",
                          size: "md",
                          className:
                            "w-full justify-between border-brand-secondary bg-brand-secondary text-white shadow-md shadow-brand-secondary/20 hover:border-brand-primary hover:bg-brand-primary focus-visible:ring-brand-accent sm:w-auto",
                        })}
                      >
                        {demo.cta}
                        <ExternalLink className="size-4" aria-hidden="true" />
                      </a>
                    ) : (
                      <span
                        aria-disabled="true"
                        className={cn(
                          buttonStyles({
                            variant: "secondary",
                            size: "md",
                            className: "w-full justify-between sm:w-auto",
                          }),
                          "cursor-default opacity-75",
                        )}
                      >
                        {demo.cta}
                        <ArrowRight className="size-4" aria-hidden="true" />
                      </span>
                    )}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
