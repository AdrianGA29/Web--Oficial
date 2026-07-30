import { ContactForm } from "@/components/contact-form";
import { Reveal } from "@/components/reveal";

const nextSteps = [
  {
    number: "01",
    title: "Leemos el contexto",
    description: "Revisamos el punto de partida antes de plantear ninguna solución.",
  },
  {
    number: "02",
    title: "Ordenamos la prioridad",
    description: "Identificamos qué merece una primera conversación y qué puede esperar.",
  },
  {
    number: "03",
    title: "Definimos el siguiente paso",
    description: "Si podemos aportar valor, te proponemos una forma clara de avanzar.",
  },
] as const;

export function ContactShowcase() {
  return (
    <section id="contacto" className="contact-showcase">
      <div className="contact-showcase-backdrop" aria-hidden="true">
        <span className="contact-showcase-orbit is-one" />
        <span className="contact-showcase-orbit is-two" />
        <span className="contact-showcase-scan" />
      </div>

      <div className="container-shell contact-showcase-inner">
        <Reveal className="contact-showcase-rail" y={14}>
          <p>
            <span>06</span>
            Iniciar conversación
          </p>
          <div aria-hidden="true">
            <i />
            <span>CANAL / ABIERTO</span>
          </div>
        </Reveal>

        <div className="contact-showcase-layout">
          <Reveal className="contact-showcase-copy" y={28}>
            <p className="contact-showcase-kicker">
              <span aria-hidden="true" />
              Un primer paso con criterio
            </p>
            <h2>
              Antes de construir,
              <strong> entendamos qué merece la pena cambiar.</strong>
            </h2>
            <p className="contact-showcase-intro">
              La primera hora de consultoría corre de nuestra cuenta. La dedicamos
              a conocer la empresa, ordenar el contexto y valorar contigo si existe
              una oportunidad real de mejora.
            </p>

            <ol className="contact-showcase-steps">
              {nextSteps.map((step) => (
                <li key={step.number}>
                  <span>{step.number}</span>
                  <div>
                    <h3>{step.title}</h3>
                    <p>{step.description}</p>
                  </div>
                </li>
              ))}
            </ol>

            <div className="contact-showcase-note">
              <span aria-hidden="true">
                <i />
              </span>
              <p>
                Primera hora de consultoría gratuita.
                <small>Analizamos la empresa contigo, sin coste ni compromiso.</small>
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.08} className="contact-terminal-wrap" y={34}>
            <div className="contact-terminal">
              <header className="contact-terminal-head">
                <div>
                  <span className="contact-terminal-status" aria-hidden="true">
                    <i />
                  </span>
                  <p>
                    Primera conversación
                    <small>Consultoría inicial</small>
                  </p>
                </div>
                <span>60 min · sin coste</span>
              </header>

              <div className="contact-terminal-copy">
                <p>El punto de partida</p>
                <h3>Cuéntanos lo esencial.</h3>
                <span>No necesitas tener definida la solución. Los campos con * son necesarios.</span>
              </div>

              <ContactForm />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
