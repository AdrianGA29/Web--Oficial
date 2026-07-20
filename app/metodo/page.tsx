import type { Metadata } from "next";
import { ArrowDown, Check, X } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { CtaBand } from "@/components/cta-band";
import { methodSteps } from "@/lib/site";

export const metadata: Metadata = {
  title: "Método",
  description: "Un método en cinco pasos para diagnosticar, priorizar, construir y medir mejoras operativas.",
};

const deliverables = [
  ["Conversaciones con las personas implicadas", "Mapa del flujo y sus excepciones", "Inventario de herramientas y decisiones"],
  ["Fricciones ordenadas por impacto", "Hipótesis sobre la causa raíz", "Riesgos y dependencias visibles"],
  ["Alcance cerrado y comprensible", "Criterios de éxito", "Plan de implantación por etapas"],
  ["Solución probada con usuarios", "Documentación útil", "Puntos de supervisión definidos"],
  ["Resultado comparado con el punto de partida", "Ajustes priorizados", "Próximo paso recomendado"],
];

export default function MethodPage() {
  return (
    <>
      <PageHero eyebrow="Nuestro método" title="Avanzar con orden también es una decisión de diseño." description="No empezamos por una demo ni por una lista de tecnologías. Empezamos por el trabajo real, cerramos un primer alcance útil y medimos antes de escalar." cta={{ href: "/diagnostico", label: "Empezar por el diagnóstico" }} />
      <section className="section-space bg-white">
        <div className="container-shell">
          <Reveal><SectionHeading eyebrow="Cinco decisiones" title="Cada paso reduce incertidumbre antes de añadir complejidad" description="El método está pensado para que sepas qué se está decidiendo, qué recibes y por qué tiene sentido seguir avanzando." /></Reveal>
          <div className="mt-16 grid gap-5">
            {methodSteps.map((step, index) => (
              <Reveal key={step.number} delay={index * 0.04}>
                <article className="grid overflow-hidden rounded-[1.35rem] border border-line bg-cloud/65 lg:grid-cols-[0.72fr_1.28fr]">
                  <div className="border-b border-line p-7 sm:p-9 lg:border-b-0 lg:border-r">
                    <div className="flex items-center justify-between gap-4"><span className="font-mono text-xs font-bold tracking-[0.15em] text-blue">PASO {step.number}</span><ArrowDown size={18} className="text-primary/20" aria-hidden="true" /></div>
                    <h2 className="mt-8 text-balance text-[clamp(1.8rem,3vw,2.65rem)] font-semibold leading-[1.05] tracking-[-0.04em] text-primary">{step.title}</h2>
                    <p className="mt-5 leading-7 text-muted">{step.description}</p>
                    <p className="mt-7 inline-flex rounded-full border border-blue/14 bg-white px-3 py-1.5 font-mono text-[0.62rem] font-bold uppercase tracking-[0.12em] text-blue">Resultado · {step.output}</p>
                  </div>
                  <div className="p-7 sm:p-9">
                    <p className="font-mono text-[0.66rem] font-bold uppercase tracking-[0.15em] text-muted">Qué ocurre en esta etapa</p>
                    <ul className="mt-7 grid gap-4">
                      {deliverables[index].map((item) => <li key={item} className="flex items-start gap-3 text-base text-primary/78"><span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-blue/8 text-blue"><Check size={14} aria-hidden="true" /></span>{item}</li>)}
                    </ul>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="dark-grid noise section-space relative text-white">
        <div className="container-shell relative z-10 grid gap-14 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal><SectionHeading dark eyebrow="Alcance honesto" title="También dejamos claro lo que no hacemos" description="La confianza no se construye prometiendo más. Se construye delimitando bien el problema y responsabilizándonos de lo acordado." /></Reveal>
          <div className="grid gap-4 sm:grid-cols-2">
            {["No automatizamos un proceso que nadie entiende", "No presentamos una demo como resultado real", "No recomendamos IA si una solución sencilla resuelve mejor", "No escondemos dependencias, límites ni trabajo futuro"].map((item, index) => (
              <Reveal key={item} delay={index * 0.05}>
                <div className="h-full rounded-card border border-white/10 bg-white/[0.045] p-6"><span className="grid size-9 place-items-center rounded-full border border-red-300/15 bg-red-300/5 text-red-200"><X size={16} aria-hidden="true" /></span><p className="mt-5 font-semibold leading-7 text-white/78">{item}</p></div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <CtaBand eyebrow="Sesión inicial" title="Una hora para convertir un problema difuso en una conversación útil." />
    </>
  );
}
