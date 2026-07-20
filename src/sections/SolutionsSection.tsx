import { motion, useReducedMotion } from "motion/react";
import { SectionHeading } from "../components/ui/SectionHeading";
import { AnimateOnScroll } from "../components/ui/AnimateOnScroll";
import { solutions } from "../data/site";
import { enterTransition, fadeUpVariants } from "../lib/motion";

export function SolutionsSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="diferenciacion"
      className="relative z-20 w-full overflow-hidden border-t border-white/10 bg-brand-ink py-[clamp(4.5rem,7vw,7.5rem)]"
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/10"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <SectionHeading
            eyebrow="Diferenciación"
            title="La tecnología debe ser un motor de eficiencia, no una fuente de complejidad."
            align="left"
            tone="inverse"
          />
          <AnimateOnScroll delay={0.1}>
            <p className="max-w-3xl text-pretty text-base leading-relaxed text-white/70 sm:text-lg lg:ml-auto">
              Optimizar procesos exige comprender la operativa antes de implementar
              soluciones. Analizamos, diseñamos y desplegamos infraestructuras digitales que
              integran tecnología, normativa legal y rigor financiero.
            </p>
          </AnimateOnScroll>
        </div>

        <motion.div
          variants={{ hidden: {}, visible: {} }}
          initial={shouldReduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.15, margin: "0px 0px -60px 0px" }}
          className="mt-[clamp(2.75rem,5vw,4.75rem)] grid grid-cols-1 gap-5 text-left md:grid-cols-3"
        >
          {solutions.map(({ title, description, icon: Icon }, index) => (
            <motion.article
              key={title}
              variants={fadeUpVariants}
              transition={enterTransition(index * 0.06)}
              className="group relative flex min-h-[24rem] flex-col overflow-hidden rounded-card border border-white/12 bg-white/[0.06] p-7 text-white shadow-xl transition-[transform,border-color,background-color] duration-200 hover:-translate-y-1 hover:border-brand-accent/45 hover:bg-white/[0.09] lg:p-8"
            >
              <div className="mb-10 flex items-start justify-between gap-5">
                <div className="flex size-14 items-center justify-center rounded-control border border-white/15 bg-white/10 text-brand-accent transition-transform duration-200 group-hover:scale-105">
                  <Icon size={28} strokeWidth={1.8} aria-hidden="true" />
                </div>
                <span className="text-5xl font-semibold leading-none text-white/10 tabular-nums">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              <h3 className="text-balance text-2xl font-semibold leading-tight text-white">
                {title}
              </h3>
              <p className="mt-4 text-pretty text-base leading-relaxed text-white/68 lg:text-lg">
                {description}
              </p>

              <div className="mt-auto pt-8" aria-hidden="true">
                <span className="block h-px w-full bg-white/12" />
                <span className="mt-3 block h-1 w-10 bg-brand-accent" />
              </div>
            </motion.article>
          ))}
        </motion.div>

        <AnimateOnScroll delay={0.18}>
          <div className="mx-auto mt-10 max-w-4xl border-t border-white/12 pt-8 text-center">
            <p className="text-pretty text-base font-medium leading-relaxed text-white/82 sm:text-lg">
              <span className="block">Primero, el desafío real.</span>
              <span className="block">Después, la escalabilidad tecnológica.</span>
              <span className="mt-2 block">
                Construimos sobre una base firme para garantizar resultados sostenibles.
              </span>
            </p>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
