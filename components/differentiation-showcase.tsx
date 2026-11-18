"use client";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  type MotionStyle,
} from "framer-motion";
import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent, type ReactNode } from "react";
import { loadEditorialMotion, shouldReduceInterfaceMotion, type MotionTimeline } from "@/lib/motion";

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
    start: "MAPA DE SEÑALES",
    end: "PUNTO DE FRICCIÓN",
  },
  scope: {
    start: "MAPA DEL SISTEMA",
    end: "FASE INICIAL",
  },
  validation: {
    start: "COMPROBACIONES",
    end: "REVISIÓN DE VIABILIDAD",
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
          <path d="M20 115h320M180 18v194M52 27h-19v19m275-19h19v19M52 203H33v-19m275 19h19v-19" />
          <circle cx="180" cy="115" r="72" strokeDasharray="2 5" />
          <circle cx="180" cy="115" r="55" />
          <path d="M180 54v8m0 106v8m-61-61h8m106 0h8m-101-40 6 6m68 68 6 6m0-80-6 6m-68 68-6 6" />
        </g>
        <g className="difference-signals-streams">
          <path d="M40 52h42q15 0 25 10l60 53" />
          <path d="M40 101h29l9-14 10 27 10-13h25l44 14" />
          <path d="M40 164h51q16 0 27-10l49-39" />
          <path d="M193 115l61-46q10-8 22-8h44" />
          <path d="M193 115h127" />
          <path d="M193 115l53 43q10 9 27 9h47" />
        </g>
        <g className="difference-signals-secondary">
          <path d="M49 60h33q11 0 19 8l57 47m43 3 50 33q12 8 23 8h37" />
        </g>
        <g className="difference-signals-nodes">
          <circle cx="40" cy="52" r="4" /><circle cx="40" cy="101" r="4" /><circle cx="40" cy="164" r="4" />
          <circle cx="320" cy="61" r="4" /><circle cx="320" cy="115" r="4" /><circle cx="320" cy="167" r="4" />
        </g>
        <g className="difference-signals-core">
          <circle className="is-glow" cx="180" cy="115" r="33" fill="url(#difference-signal-core)" />
          <circle cx="180" cy="115" r="28" />
          <path d="M180 81v12m0 44v12m-34-34h12m44 0h12m-34-13 13 13-13 13-13-13z" />
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
          <path d="m57 54 123-44 123 44-123 44zM98 39l123 44m-82-59 123 45M98 69l123-44m-82 58 123-44" />
          <path d="m53 79 127-45 127 45-127 45zM95 64l127 45m-84-60 127 45M95 94l127-45m-84 60 127-45" />
          <path d="m67 103 113-40 113 40-113 40zM105 90l113 40m-76 0 113-40" />
          <path d="m88 125 92-33 92 33-92 33zM134 109l92 33m-92 0 92-33" />
        </g>
        <g className="difference-scope-connectors">
          <path d="M88 125v30l92 35 92-35v-30m-92 33v32M53 79v23m254-23v23" />
        </g>
        <g className="difference-scope-selection">
          <path className="is-aura" d="M130 157L180 142L230 157L180 172Z" />
          <path d="m141 161 39-15 39 15-39 15zM141 161v24l39 15 39-15v-24m-39 15v24" />
          <path d="m158 161 22-8 22 8-22 8zM151 175l19 7m19 0 20-7" />
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
          <path d="M18 115h324M214 17v196M195 33h38m-38 164h38" />
          <circle cx="214" cy="115" r="76" strokeDasharray="2 6" />
          <path d="M214 33v12m0 140v12m-82-82h12m140 0h12" />
        </g>
        <g className="difference-validation-inputs">
          <path d="M62 59h36q14 0 24 10l43 36" />
          <path d="M62 115h100" />
          <path d="M62 171h36q14 0 24-10l43-36" />
        </g>
        <g className="difference-validation-tokens">
          <path d="M20 46h42v26H20zm0 56h42v26H20zm0 56h42v26H20z" />
          <path d="M29 55h21m-21 8h15m-15 48h21m-21 8h12m-12 48h21m-21 8h16" />
        </g>
        <g className="difference-validation-gate">
          <circle className="is-outer" cx="214" cy="115" r="65" />
          <circle className="is-mid" cx="214" cy="115" r="42" />
          <path className="is-arc" d="M176 62A65 65 0 0 1 270 91" />
          <path className="is-arc" d="M251 169A65 65 0 0 1 158 140" />
        </g>
        <path className="difference-validation-seal" d="m214 90 22 9v17q0 13-22 25-22-12-22-25V99zm-11 25 7 7 15-16" />
        <g className="difference-validation-output">
          <path d="M258 101h32l9 7h43m-83 7h83m-84 14h32l9-7h43" />
          <circle cx="342" cy="115" r="4" />
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

    if (shouldReduceInterfaceMotion()) {
      section.classList.add("is-revealed");
      return;
    }

    section.classList.add("is-motion-ready");
    let sequence: MotionTimeline | null = null;
    let disposed = false;

    const observer = new IntersectionObserver(
      async ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();

        const { createTimeline, stagger } = await loadEditorialMotion();
        if (disposed) return;

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
      disposed = true;
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
