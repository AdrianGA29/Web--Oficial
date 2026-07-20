import { CheckCircle2, ListChecks, Search, Target, Wrench } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { AnimateOnScroll } from "../components/ui/AnimateOnScroll";
import { SectionHeading } from "../components/ui/SectionHeading";
import { enterTransition, fadeUpVariants } from "../lib/motion";

const steps = [
  {
    title: "Entendemos cómo trabajas",
    description:
      "Vemos cómo llegan los clientes, dónde se apuntan las consultas, cómo se siguen presupuestos, dónde se guarda la información y qué tareas se repiten cada semana.",
    icon: Search,
  },
  {
    title: "Detectamos el cuello de botella",
    description:
      "Buscamos dónde se pierde tiempo, información, seguimiento, productividad o dinero. No se trata de cambiarlo todo, sino de encontrar qué está frenando más.",
    icon: Target,
  },
  {
    title: "Proponemos una primera solución útil",
    description:
      "Empezamos por algo concreto y ejecutable: una entrada digital, un panel, un sistema de seguimiento, una automatización o una herramienta interna.",
    icon: Wrench,
  },
  {
    title: "La construimos con alcance claro",
    description:
      "Definimos qué entra, qué no entra todavía y qué podría venir después. Así evitamos proyectos enormes, promesas vagas y herramientas que nadie termina usando.",
    icon: ListChecks,
  },
  {
    title: "Dejamos una base preparada para avanzar",
    description:
      "Te explicamos cómo usar la solución, qué queda resuelto y qué podría mejorarse más adelante si tiene sentido para tu empresa.",
    icon: CheckCircle2,
  },
];

const methodPillars = ["Diagnóstico", "Prioridad", "Alcance", "Evolución"];

export function MethodSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="metodo"
      className="relative z-20 w-full overflow-hidden border-t border-border-subtle bg-brand-light py-[clamp(4.25rem,6vw,7rem)]"
    >
      <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[0.86fr_1.14fr] lg:gap-14 lg:px-8">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading
            eyebrow="Nuestro método"
            title="Diseñamos la estructura digital que tu negocio necesita para crecer."
            align="left"
          />

          <AnimateOnScroll delay={0.1}>
            <p className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-text-muted sm:text-lg">
              Una herramienta o una IA solo funcionan si el proceso correcto está bien
              definido. Unimos estrategia legal, viabilidad financiera y la ingeniería
              técnica necesaria para transformar tu operativa diaria en un sistema rentable
              y escalable.
            </p>
          </AnimateOnScroll>

          <AnimateOnScroll delay={0.16}>
            <div className="mt-8 rounded-card border border-brand-primary/10 bg-white p-6 shadow-card">
              <p className="text-sm font-semibold uppercase text-brand-secondary">
                Primera sesión de diagnóstico sin coste
              </p>
              <p className="mt-3 text-pretty text-base leading-relaxed text-brand-primary">
                Revisamos necesidades, riesgos y prioridades para salir con una primera
                orientación clara: qué conviene resolver antes y qué impacto tendría.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {methodPillars.map((pillar) => (
                  <span
                    key={pillar}
                    className="rounded-full border border-brand-primary/10 bg-brand-light px-3 py-1 text-xs font-semibold text-brand-primary/70"
                  >
                    {pillar}
                  </span>
                ))}
              </div>
            </div>
          </AnimateOnScroll>
        </div>

        <motion.ol
          variants={{ hidden: {}, visible: {} }}
          initial={shouldReduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.12, margin: "0px 0px -60px 0px" }}
          className="relative grid gap-4"
        >
          <span
            className="pointer-events-none absolute bottom-8 left-6 top-8 hidden w-px bg-border-subtle md:block"
            aria-hidden="true"
          />

          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <motion.li
                key={step.title}
                variants={fadeUpVariants}
                transition={enterTransition(index * 0.06)}
                className="relative md:pl-16"
              >
                <span
                  className="absolute left-0 top-8 hidden size-12 items-center justify-center rounded-control border border-brand-primary/10 bg-white text-sm font-semibold text-brand-secondary shadow-sm tabular-nums md:flex"
                  aria-hidden="true"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>

                <article className="group rounded-card border border-brand-primary/10 bg-white p-6 text-left shadow-card transition-[transform,box-shadow,border-color] duration-200 hover:-translate-y-1 hover:border-brand-secondary/35 hover:shadow-card-hover sm:p-7">
                  <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
                    <div className="flex items-center gap-4 sm:w-40 sm:shrink-0">
                      <div className="flex size-12 shrink-0 items-center justify-center rounded-control bg-brand-primary text-white shadow-sm transition-colors duration-200 group-hover:bg-brand-secondary">
                        <Icon size={24} strokeWidth={1.8} aria-hidden="true" />
                      </div>
                      <span className="text-sm font-semibold uppercase text-brand-secondary sm:hidden">
                        Paso {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>

                    <div className="min-w-0 flex-1">
                      <h3 className="text-balance text-[clamp(1.4rem,2vw,2rem)] font-semibold leading-tight text-brand-primary">
                        {step.title}
                      </h3>
                      <p className="mt-3 max-w-2xl text-pretty text-base leading-relaxed text-text-muted sm:text-lg">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </article>
              </motion.li>
            );
          })}
        </motion.ol>

        <AnimateOnScroll delay={0.18}>
          <div className="lg:col-start-2">
            <div className="border-t border-brand-primary/12 pt-8">
              <p className="max-w-3xl text-pretty text-base font-medium leading-relaxed text-brand-primary sm:text-lg">
                Primero resolvemos bien un problema concreto. Si funciona, el sistema puede
                crecer por fases sobre una base clara, viable y preparada para mantenerse.
              </p>
            </div>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
