import { motion, useReducedMotion } from "motion/react";
import { challenges } from "../data/site";
import { SectionHeading } from "../components/ui/SectionHeading";
import { enterTransition, fadeUpVariants } from "../lib/motion";

export function ChallengesSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="desafios"
      className="relative z-20 w-full overflow-hidden border-t border-border-subtle bg-surface-muted py-[clamp(4.5rem,7vw,7.5rem)]"
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-brand-primary/10"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div className="text-left">
            <SectionHeading
              eyebrow="Desafíos Operativos"
              title="¿Esto también pasa en tu empresa?"
              align="left"
              titleClassName="lg:whitespace-nowrap"
            />
          </div>
          <motion.p
            variants={fadeUpVariants}
            initial={shouldReduceMotion ? false : "hidden"}
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            transition={enterTransition(0.1)}
            className="max-w-3xl text-pretty text-base leading-relaxed text-text-muted sm:text-lg lg:ml-auto"
          >
            Muchas empresas no funcionan mal por falta de esfuerzo. Funcionan con demasiado
            trabajo manual, demasiada información repartida y poco seguimiento claro.
          </motion.p>
        </div>

        <motion.div
          variants={{ hidden: {}, visible: {} }}
          initial={shouldReduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.15, margin: "0px 0px -60px 0px" }}
          className="mt-[clamp(2.75rem,5vw,4.75rem)] grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-5"
        >
          {challenges.map(({ title, description, question, icon: Icon }, index) => (
            <motion.article
              key={title}
              variants={fadeUpVariants}
              transition={enterTransition(index * 0.06)}
              className="group relative flex min-h-[22rem] flex-col overflow-hidden rounded-card border border-brand-primary/10 bg-white p-6 text-left shadow-card transition-[transform,box-shadow,border-color] duration-200 hover:-translate-y-1 hover:border-brand-secondary/35 hover:shadow-card-hover lg:p-7"
            >
              <div
                className="absolute inset-x-0 top-0 h-1 bg-brand-secondary"
                aria-hidden="true"
              />
              <div className="mb-7 flex items-start justify-between gap-5">
                <div className="flex min-w-0 items-center gap-3" aria-hidden="true">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-control bg-brand-light text-brand-secondary ring-1 ring-brand-primary/10 transition-colors duration-200 group-hover:text-brand-primary">
                    <Icon size={22} strokeWidth={1.8} aria-hidden="true" />
                  </span>
                </div>
                <span className="text-sm font-semibold text-brand-primary/35 tabular-nums">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              <h3 className="text-balance text-[clamp(1.3rem,1.7vw,1.65rem)] font-semibold leading-tight text-brand-primary">
                {title}
              </h3>
              <p className="mt-4 text-pretty text-base leading-relaxed text-text-muted">
                {description}
              </p>

              {question && (
                <p className="mt-5 border-l-2 border-brand-secondary pl-4 text-pretty text-base font-semibold leading-relaxed text-brand-primary">
                  {question}
                </p>
              )}

              <div className="mt-auto pt-7" aria-hidden="true">
                <div className="flex items-center gap-2">
                  <span className="h-px flex-1 bg-border-subtle" />
                  <span className="size-1.5 rounded-full bg-brand-accent" />
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>

        <motion.div
          variants={fadeUpVariants}
          initial={shouldReduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          transition={enterTransition(0.18)}
          className="mx-auto mt-10 max-w-4xl border-t border-brand-primary/12 pt-8 text-center"
        >
          <p className="text-pretty text-base font-medium leading-relaxed text-brand-primary sm:text-lg">
            <span className="block">
              Si algo de esto te suena, probablemente no necesitáis otra herramienta más.
            </span>
            <span className="mt-2 block">
              Necesitáis entender el proceso y resolver primero el cuello de botella correcto.
            </span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
