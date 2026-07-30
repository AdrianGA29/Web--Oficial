import { ArrowUpRight } from "lucide-react";
import { FaqList } from "@/components/faq";
import { Reveal } from "@/components/reveal";
import { TrackedLink } from "@/components/tracked-link";

export function FaqShowcase() {
  return (
    <section id="preguntas" className="faq-showcase">
      <div className="faq-showcase-grid" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>

      <div className="container-shell faq-showcase-inner">
        <Reveal className="faq-showcase-rail" y={14}>
          <p><span>07</span> Preguntas frecuentes</p>
          <i aria-hidden="true" />
          <span>ANTES DE EMPEZAR</span>
        </Reveal>

        <div className="faq-showcase-layout">
          <Reveal className="faq-showcase-intro" y={28}>
            <p className="faq-showcase-kicker">
              <span aria-hidden="true" />
              Decidir con contexto
            </p>
            <h2>
              Lo importante,
              <strong> antes de empezar.</strong>
            </h2>
            <p>
              Respuestas directas sobre cómo planteamos un proyecto, qué puedes
              esperar del proceso y qué dejamos definido antes de construir.
            </p>

            <div className="faq-showcase-contact">
              <span>¿No encuentras tu pregunta?</span>
              <p>La primera hora de consultoría es gratuita y sin compromiso.</p>
              <TrackedLink
                href="#contacto"
                eventName="CTA contact"
                eventLocation="faq"
              >
                Cuéntanos tu caso
                <ArrowUpRight size={17} aria-hidden="true" />
              </TrackedLink>
            </div>
          </Reveal>

          <Reveal delay={0.08} className="faq-showcase-list" y={30}>
            <FaqList />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
