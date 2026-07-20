import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { Header } from "../components/Header";
import { buttonStyles } from "../components/ui/Button";
import { ScrollIndicator } from "../components/ui/ScrollIndicator";
import { enterTransition, fadeUpVariants } from "../lib/motion";

type HeroSectionProps = {
  backgroundDesktop: string;
  backgroundMobile: string;
  onLogoClick: () => void;
  onSectionClick: (href: string) => void;
};

export function HeroSection({
  backgroundDesktop,
  backgroundMobile,
  onLogoClick,
  onSectionClick,
}: HeroSectionProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="inicio"
      className="relative flex min-h-[max(46rem,100dvh)] w-full flex-col overflow-hidden bg-[#d9ecff]"
    >
      <picture className="absolute inset-0 z-0" aria-hidden="true">
        <source media="(max-width: 767px)" srcSet={backgroundMobile} />
        <img
          src={backgroundDesktop}
          alt=""
          className="size-full object-cover object-center"
          fetchPriority="high"
        />
      </picture>

      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-10 h-40 bg-gradient-to-b from-brand-dark/18 to-transparent"
        aria-hidden="true"
      />

      <Header onLogoClick={onLogoClick} onSectionClick={onSectionClick} />

      <main className="relative z-30 mx-auto flex w-full max-w-7xl flex-1 items-center px-6 pb-6 pt-28 sm:pb-16 md:px-8 md:pt-32 lg:pb-14">
        <motion.div
          variants={{ hidden: {}, visible: {} }}
          initial={shouldReduceMotion ? false : "hidden"}
          animate="visible"
          className="flex w-full max-w-2xl flex-col items-center text-center md:items-start md:text-left"
        >
          <motion.div
            variants={fadeUpVariants}
            transition={enterTransition(0.06)}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/60 px-3 py-1.5 text-xs font-semibold uppercase text-brand-primary shadow-sm backdrop-blur-sm"
          >
            <span className="size-1.5 rounded-full bg-brand-secondary" aria-hidden="true" />
            Descubre tu potencial operativo
          </motion.div>

          <h1
            aria-label="Transformamos tu caos operativo en procesos escalables."
            className="max-w-2xl text-balance text-[clamp(2.15rem,9.2vw,3.2rem)] font-semibold leading-[1.04] text-brand-ink drop-shadow-[0_2px_18px_rgba(255,255,255,0.78)] md:text-[clamp(2.75rem,5.2vw,5rem)] md:leading-[1.02]"
          >
            {[
              "Transformamos tu",
              "caos operativo",
              "en procesos",
              "escalables.",
            ].map((line, index) => (
              <span key={line} className="block pb-[0.06em]">
                <motion.span
                  className={`block ${index === 1 ? "text-[#2867d6]" : ""}`}
                  initial={shouldReduceMotion ? false : { y: "105%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={enterTransition(0.12 + index * 0.08, 0.58)}
                >
                  {line}{index < 2 ? " " : ""}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            variants={fadeUpVariants}
            transition={enterTransition(0.4)}
            className="mt-4 max-w-xl text-pretty text-base font-medium leading-relaxed text-brand-primary/90 drop-shadow-[0_1px_8px_rgba(255,255,255,0.92)] sm:text-lg"
          >
            Auditamos, integramos, optimizamos y realizamos seguimientos posteriores.
            Convertimos fricción diaria en sistemas claros, medibles y preparados para crecer.
          </motion.p>

          <motion.div
            variants={fadeUpVariants}
            transition={enterTransition(0.48)}
            className="mt-7 flex w-full max-w-md flex-col items-stretch gap-3 sm:w-auto sm:max-w-none sm:flex-row"
          >
            <a
              href="#contacto"
              onClick={(event) => {
                event.preventDefault();
                onSectionClick("#contacto");
              }}
              className={buttonStyles({
                variant: "primary",
                size: "lg",
                className:
                  "justify-between border-brand-secondary bg-brand-secondary text-sm text-white shadow-lg shadow-brand-secondary/20 hover:border-brand-primary hover:bg-brand-primary focus-visible:ring-brand-accent sm:min-w-64 sm:text-base",
              })}
            >
              Solicita tu diagnóstico de eficiencia
              <ArrowRight className="size-4" aria-hidden="true" />
            </a>
          </motion.div>

          <motion.p
            variants={fadeUpVariants}
            transition={enterTransition(0.56)}
            className="mt-5 max-w-lg text-pretty text-sm font-semibold leading-relaxed text-brand-primary/82 drop-shadow-[0_1px_8px_rgba(255,255,255,0.9)]"
          >
            <span className="block">Primero entendemos tu empresa.</span>
            <span className="block">Después te decimos por dónde tiene sentido empezar.</span>
          </motion.p>
        </motion.div>
      </main>

      <ScrollIndicator onClick={() => onSectionClick("#desafios")} />
    </section>
  );
}
