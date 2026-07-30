"use client";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  type MotionStyle,
} from "framer-motion";
import { createTimeline } from "animejs/timeline";
import { stagger } from "animejs/utils";
import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent, type ReactNode } from "react";

const principles = [
  {
    number: "01",
    label: "ENTENDER",
    title: "Diagnóstico antes que solución.",
    description:
      "No proponemos una herramienta sin comprender cómo entra la información, dónde se pierde tiempo y qué parte del proceso está generando fricción.",
    visual: "signals",
  },
  {
    number: "02",
    label: "ACOTAR",
    title: "Una primera fase útil.",
    description:
      "No intentamos transformar toda la empresa de golpe. Definimos una mejora concreta, viable y suficientemente clara para comprobar si realmente aporta valor.",
    visual: "scope",
  },
  {
    number: "03",
    label: "VALIDAR",
    title: "Validar antes de prometer.",
    description:
      "Antes de presentar una solución revisamos alcance, viabilidad, riesgos y condiciones necesarias para poder ejecutarla correctamente.",
    visual: "validation",
  },
] as const;

const comparison = [
  ["Elegir una herramienta", "Entender el proceso"],
  ["Automatizar cuanto antes", "Ordenar antes de automatizar"],
  ["Intentar cambiarlo todo", "Empezar por una fase útil"],
  ["Prometer antes de revisar", "Validar antes de proponer"],
] as const;

const visualMeta = {
  signals: {
    start: "INPUT MAP / 01",
    end: "SISTEMA DETECTADO",
    foot: "SEÑALES CONECTADAS",
  },
  scope: {
    start: "SCOPE / 02",
    end: "FASE 1",
    foot: "ALCANCE ÚTIL",
  },
  validation: {
    start: "CONTROL / 03",
    end: "REVISIÓN INTERNA",
    foot: "SISTEMA VALIDADO",
  },
} as const;

function VisualFrame({
  type,
  children,
}: {
  type: (typeof principles)[number]["visual"];
  children: ReactNode;
}) {
  const meta = visualMeta[type];
  return (
    <div className={`difference-visual difference-vector-visual is-${type}`} aria-hidden="true">
      <div className="difference-visual-head">
        <span>{meta.start}</span>
        <span>{meta.end}</span>
      </div>
      <div className="difference-vector-stage">
        {children}
        <span className="difference-vector-scan" />
      </div>
      <div className="difference-vector-footer">
        <span><i /> {meta.foot}</span>
        <span>READY / 03</span>
      </div>
    </div>
  );
}

function SignalsVisual() {
  return (
    <VisualFrame type="signals">
      <svg viewBox="0 0 360 230" role="presentation">
        <defs>
          <linearGradient id="difference-signal-gradient" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#f5f5f5" stopOpacity=".16" />
            <stop offset=".62" stopColor="#9b96ff" stopOpacity=".86" />
            <stop offset="1" stopColor="#5b52ff" />
          </linearGradient>
          <radialGradient id="difference-signal-core">
            <stop offset="0" stopColor="#f5f5f5" stopOpacity=".92" />
            <stop offset=".28" stopColor="#9b96ff" stopOpacity=".74" />
            <stop offset="1" stopColor="#5b52ff" stopOpacity="0" />
          </radialGradient>
        </defs>
        <g className="difference-vector-axis">
          <path d="M20 115H340M180 18V212" />
          <circle cx="180" cy="115" r="72" />
          <circle cx="180" cy="115" r="42" />
        </g>
        <g className="difference-signals-streams">
          <path d="M15 43C72 43 85 78 126 78S151 106 180 115" />
          <path d="M12 88C66 88 86 108 119 108S151 113 180 115" />
          <path d="M14 168C68 168 89 146 125 146S153 124 180 115" />
          <path d="M345 48C292 48 278 78 238 78S208 105 180 115" />
          <path d="M347 112C298 112 279 115 242 115H180" />
          <path d="M345 181C291 181 273 151 236 151S207 126 180 115" />
        </g>
        <g className="difference-signals-secondary">
          <path d="M24 58C77 58 91 92 128 92S155 110 180 115" />
          <path d="M336 164C287 164 270 139 234 139S207 122 180 115" />
        </g>
        <g className="difference-signals-nodes">
          {[[28,43],[54,88],[31,168],[331,48],[310,112],[330,181],[126,78],[125,146],[238,78],[236,151]].map(([cx, cy]) => (
            <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="4.5" />
          ))}
        </g>
        <g className="difference-signals-core">
          <circle className="is-glow" cx="180" cy="115" r="33" fill="url(#difference-signal-core)" />
          <circle cx="180" cy="115" r="22" />
          <circle cx="180" cy="115" r="10" />
          <path d="M180 87V143M152 115H208" />
        </g>
      </svg>
    </VisualFrame>
  );
}

function ScopeVisual() {
  return (
    <VisualFrame type="scope">
      <svg viewBox="0 0 360 230" role="presentation">
        <defs>
          <linearGradient id="difference-scope-plane" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#f5f5f5" stopOpacity=".2" />
            <stop offset="1" stopColor="#f5f5f5" stopOpacity=".02" />
          </linearGradient>
          <linearGradient id="difference-scope-focus" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#9b96ff" stopOpacity=".74" />
            <stop offset="1" stopColor="#5b52ff" stopOpacity=".16" />
          </linearGradient>
        </defs>
        <g className="difference-vector-axis">
          <path d="M22 188H338M180 20V210" />
          <path d="M45 57L180 18L315 57L180 96Z" />
        </g>
        <g className="difference-scope-cloud">
          <path d="M54 50L180 14L306 50L180 86Z" />
          <path d="M45 75L180 36L315 75L180 114Z" />
          <path d="M63 101L180 67L297 101L180 135Z" />
          <path d="M84 126L180 99L276 126L180 153Z" />
        </g>
        <g className="difference-scope-connectors">
          <path d="M84 126L84 157L180 185L276 157V126" />
          <path d="M180 153V185" />
          <path d="M45 75V101M315 75V101M180 114V153" />
        </g>
        <g className="difference-scope-selection">
          <path className="is-aura" d="M130 157L180 142L230 157L180 172Z" />
          <path d="M141 164L180 153L219 164L180 175Z" />
          <path d="M141 164V184L180 196L219 184V164L180 175Z" />
          <path d="M180 142V196" />
          <circle cx="180" cy="169" r="33" />
          <circle cx="180" cy="169" r="43" />
        </g>
        <g className="difference-scope-corners">
          <path d="M121 139H105V155M239 139H255V155M121 201H105V185M239 201H255V185" />
        </g>
      </svg>
    </VisualFrame>
  );
}

function ValidationVisual() {
  return (
    <VisualFrame type="validation">
      <svg viewBox="0 0 360 230" role="presentation">
        <defs>
          <linearGradient id="difference-validation-flow" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#f5f5f5" stopOpacity=".15" />
            <stop offset=".58" stopColor="#9b96ff" stopOpacity=".66" />
            <stop offset="1" stopColor="#f5f5f5" stopOpacity=".74" />
          </linearGradient>
        </defs>
        <g className="difference-vector-axis">
          <path d="M18 115H342M214 17V213" />
          <circle cx="214" cy="115" r="78" />
          <circle cx="214" cy="115" r="53" />
        </g>
        <g className="difference-validation-inputs">
          <path d="M13 61C70 61 87 76 132 76S171 99 214 115" />
          <path d="M13 115H214" />
          <path d="M13 174C72 174 92 153 135 153S175 130 214 115" />
        </g>
        <g className="difference-validation-tokens">
          <circle cx="35" cy="61" r="8" />
          <rect x="52" y="107" width="16" height="16" rx="2" />
          <path d="M36 163L46 174L36 185L26 174Z" />
          <circle cx="105" cy="76" r="5" />
          <rect x="108" y="146" width="10" height="10" rx="1" />
        </g>
        <g className="difference-validation-gate">
          <circle className="is-outer" cx="214" cy="115" r="65" />
          <circle className="is-mid" cx="214" cy="115" r="42" />
          <circle cx="214" cy="115" r="16" />
          <path d="M214 42V188M141 115H287" />
          <path className="is-arc" d="M176 62A65 65 0 0 1 270 91" />
          <path className="is-arc" d="M251 169A65 65 0 0 1 158 140" />
        </g>
        <g className="difference-validation-output">
          <path d="M230 100H345M230 115H345M230 130H345" />
          <circle cx="319" cy="100" r="3.5" />
          <circle cx="331" cy="115" r="3.5" />
          <circle cx="308" cy="130" r="3.5" />
        </g>
      </svg>
    </VisualFrame>
  );
}

function PrincipleVisual({ type }: { type: (typeof principles)[number]["visual"] }) {
  if (type === "signals") return <SignalsVisual />;
  if (type === "scope") return <ScopeVisual />;
  return <ValidationVisual />;
}

function DifferencePrincipleCard({
  principle,
  active,
  onActivate,
  onDeactivate,
}: {
  principle: (typeof principles)[number];
  active: boolean;
  onActivate: () => void;
  onDeactivate: () => void;
}) {
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const lift = useMotionValue(0);
  const smoothRotateX = useSpring(rotateX, { stiffness: 180, damping: 24, mass: 0.72 });
  const smoothRotateY = useSpring(rotateY, { stiffness: 180, damping: 24, mass: 0.72 });
  const smoothLift = useSpring(lift, { stiffness: 190, damping: 23, mass: 0.7 });
  const cardTransform = useMotionTemplate`perspective(1500px) translateY(${smoothLift}px) rotateX(${smoothRotateX}deg) rotateY(${smoothRotateY}deg)`;

  const resetCard = () => {
    rotateX.set(0);
    rotateY.set(0);
    lift.set(0);
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLElement>) => {
    if (
      event.pointerType !== "mouse"
      || window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    rotateY.set((x - 0.5) * 7);
    rotateX.set((0.5 - y) * 5.5);
    lift.set(-10);
  };

  return (
    <div
      className={`difference-principle-entry is-${principle.visual}`}
      data-difference-card
      onPointerEnter={(event) => {
        if (
          event.pointerType === "mouse"
          && !window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ) onActivate();
      }}
      onPointerMove={handlePointerMove}
      onPointerLeave={(event) => {
        resetCard();
        if (event.pointerType === "mouse") onDeactivate();
      }}
    >
      <motion.article
        className={`difference-principle-card is-${principle.visual}${active ? " is-active" : ""}`}
        style={{ transform: cardTransform } as MotionStyle}
      >
        <div className="difference-principle-surface">
          <div className="difference-principle-meta">
            <span>{principle.number}</span>
            <i />
            <span>{principle.label}</span>
          </div>
          <h3>{principle.title}</h3>
          <p>{principle.description}</p>
          <PrincipleVisual type={principle.visual} />
          <span className="difference-card-corner is-top" aria-hidden="true" />
          <span className="difference-card-corner is-bottom" aria-hidden="true" />
        </div>
      </motion.article>
    </div>
  );
}

export function DifferentiationShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeCard, setActiveCard] = useState<number | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      section.classList.add("is-revealed");
      return;
    }

    section.classList.add("is-motion-ready");
    let sequence: ReturnType<typeof createTimeline> | null = null;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        sequence = createTimeline({
          defaults: { ease: "out(5)" },
          onComplete: () => section.classList.add("is-revealed"),
        })
          .add(section.querySelectorAll("[data-difference-heading]"), {
            opacity: [0, 1],
            translateY: [34, 0],
            duration: 980,
            delay: stagger(95),
          })
          .add(
            section.querySelectorAll("[data-difference-rule]"),
            {
              scaleX: [0, 1],
              duration: 900,
              delay: stagger(90),
            },
            "-=760",
          )
          .add(
            section.querySelectorAll("[data-difference-card]"),
            {
              opacity: [0, 1],
              translateY: [58, 0],
              duration: 1150,
              delay: stagger(155),
            },
            "-=580",
          )
          .add(
            section.querySelectorAll("[data-difference-comparison]"),
            {
              opacity: [0, 1],
              translateY: [38, 0],
              duration: 980,
              delay: stagger(80),
            },
            "-=760",
          )
          .add(
            section.querySelectorAll("[data-difference-close]"),
            {
              opacity: [0, 1],
              translateY: [28, 0],
              duration: 920,
              delay: stagger(90),
            },
            "-=520",
          );

        observer.disconnect();
      },
      { threshold: 0.08 },
    );

    observer.observe(section);
    return () => {
      observer.disconnect();
      sequence?.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="diferenciacion"
      className="difference-showcase"
      aria-labelledby="difference-title"
    >
      <div className="difference-transition" aria-hidden="true"><i /></div>
      <div className="difference-grid" aria-hidden="true"><span /><span /><span /><span /></div>
      <div className="difference-ambient" aria-hidden="true"><span /><span /></div>
      <span className="difference-wordmark" aria-hidden="true">CRITERIO</span>

      <div className="container-shell difference-inner">
        <header className="difference-header">
          <div className="difference-meta" data-difference-heading>
            <span>04 / CRITERIO</span>
            <i data-difference-rule aria-hidden="true" />
            <span>DECIDIR ANTES DE CONSTRUIR</span>
          </div>
          <div className="difference-intro">
            <h2 id="difference-title" data-difference-heading>
              La diferencia no está en la herramienta.
              <strong>Está en el criterio.</strong>
            </h2>
            <div className="difference-intro-copy" data-difference-heading>
              <span>TECNOLOGÍA CON PROPÓSITO</span>
              <p>
                No empezamos vendiendo una aplicación, una automatización o inteligencia artificial.
                Primero entendemos qué está ocurriendo y cuál sería la primera mejora razonable.
              </p>
            </div>
          </div>
        </header>

        <div className={`difference-principles${activeCard === null ? "" : " has-active"}`}>
          <span className="difference-principles-line" data-difference-rule aria-hidden="true" />
          {principles.map((principle, index) => (
            <DifferencePrincipleCard
              key={principle.number}
              principle={principle}
              active={activeCard === index}
              onActivate={() => setActiveCard(index)}
              onDeactivate={() => setActiveCard((current) => current === index ? null : current)}
            />
          ))}
        </div>

        <div className="difference-comparison">
          <header data-difference-comparison>
            <span>04.1 / DECISIÓN</span>
            <h3>Dos formas de abordar el mismo problema.</h3>
            <p>La diferencia aparece antes de escribir una sola línea de código.</p>
          </header>

          <div className="difference-comparison-panel" data-difference-comparison>
            <div className="difference-comparison-column is-conventional">
              <div className="difference-comparison-label">
                <span>ENFOQUE CONVENCIONAL</span>
                <i />
                <span>TECNOLOGÍA PRIMERO</span>
              </div>
              <ol>
                {comparison.map(([conventional], index) => (
                  <li key={conventional} data-difference-comparison>
                    <span>0{index + 1}</span>
                    <p>{conventional}</p>
                  </li>
                ))}
              </ol>
            </div>

            <div className="difference-comparison-axis" aria-hidden="true">
              <span>VS</span>
              <i data-difference-rule />
            </div>

            <div className="difference-comparison-column is-temis">
              <div className="difference-comparison-label">
                <span>TEMIS ΛTRILE</span>
                <i />
                <span>SISTEMA PRIMERO</span>
              </div>
              <ol>
                {comparison.map(([, temis], index) => (
                  <li key={temis} data-difference-comparison>
                    <span>0{index + 1}</span>
                    <p>{temis}</p>
                    <i aria-hidden="true" />
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>

        <footer className="difference-close">
          <p data-difference-close>
            Si una solución tiene sentido, la construimos.
            <strong>Si no, te lo decimos.</strong>
          </p>
          <div data-difference-close>
            <span>ENTENDER</span><i /><span>ACOTAR</span><i /><span>VALIDAR</span><i /><span>CONSTRUIR</span>
          </div>
        </footer>
      </div>
    </section>
  );
}
