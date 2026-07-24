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
import {
  useEffect,
  useRef,
  useState,
  type PointerEvent,
} from "react";

const signals = [
  {
    number: "01",
    code: "OPERATIVA / REPETICIÓN",
    title: "Demasiado trabajo manual",
    description:
      "Tareas repetidas, documentos duplicados y tiempo perdido en procesos que podrían simplificarse.",
    footnote: "HORAS INVISIBLES",
    visual: "stack",
  },
  {
    number: "02",
    code: "INFORMACIÓN / FRAGMENTACIÓN",
    title: "Información desconectada",
    description:
      "Correos, hojas de cálculo y herramientas que contienen partes distintas de la misma realidad.",
    footnote: "CONTEXTO DISPERSO",
    visual: "network",
  },
  {
    number: "03",
    code: "ESCALA / DEPENDENCIA",
    title: "Crecer aumenta el desorden",
    description:
      "Más trabajo, más errores y más dependencia de procesos que solo algunas personas conocen.",
    footnote: "FRICCIÓN ACUMULADA",
    visual: "scale",
  },
] as const;

function SignalVisual({
  type,
}: {
  type: (typeof signals)[number]["visual"];
}) {
  if (type === "network") {
    return (
      <svg viewBox="0 0 320 210" aria-hidden="true">
        <path className="friction-visual-axis" d="M22 105H298M160 18V192" />
        <g className="friction-network">
          <path d="M70 145L132 78L202 117L258 53" />
          <path className="is-broken" d="M70 145L202 117" />
          <circle cx="70" cy="145" r="8" />
          <circle cx="132" cy="78" r="8" />
          <circle cx="202" cy="117" r="8" />
          <circle cx="258" cy="53" r="8" />
          <circle className="is-pulse" cx="202" cy="117" r="22" />
        </g>
      </svg>
    );
  }

  if (type === "scale") {
    return (
      <svg viewBox="0 0 320 210" aria-hidden="true">
        <path className="friction-visual-axis" d="M24 174H296M42 26V188" />
        <g className="friction-scale">
          <path d="M62 174V139H106V174" />
          <path d="M119 174V104H163V174" />
          <path d="M176 174V69H220V174" />
          <path d="M233 174V34H277V174" />
          <path className="is-growth" d="M64 125L139 87L198 53L274 17" />
          <circle cx="274" cy="17" r="5" />
        </g>
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 320 210" aria-hidden="true">
      <path className="friction-visual-axis" d="M22 105H298M160 18V192" />
      <g className="friction-stack">
        <path d="M69 73L183 37L252 72L138 108Z" />
        <path d="M69 99L183 63L252 98L138 134Z" />
        <path d="M69 125L183 89L252 124L138 160Z" />
        <path className="is-offset" d="M69 151L183 115L252 150L138 186Z" />
      </g>
    </svg>
  );
}

function FrictionCard({
  signal,
  index,
  active,
  onActivate,
  onDeactivate,
}: {
  signal: (typeof signals)[number];
  index: number;
  active: boolean;
  onActivate: () => void;
  onDeactivate: () => void;
}) {
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const lift = useMotionValue(0);
  const smoothRotateX = useSpring(rotateX, {
    stiffness: 180,
    damping: 24,
    mass: 0.72,
  });
  const smoothRotateY = useSpring(rotateY, {
    stiffness: 180,
    damping: 24,
    mass: 0.72,
  });
  const smoothLift = useSpring(lift, {
    stiffness: 190,
    damping: 23,
    mass: 0.7,
  });
  const cardTransform = useMotionTemplate`perspective(1500px) translateY(${smoothLift}px) rotateX(${smoothRotateX}deg) rotateY(${smoothRotateY}deg)`;

  function resetCard() {
    rotateX.set(0);
    rotateY.set(0);
    lift.set(0);
  }

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "mouse") return;

    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width;
    const y = (event.clientY - bounds.top) / bounds.height;

    rotateY.set((x - 0.5) * 7);
    rotateX.set((0.5 - y) * 5.5);
    lift.set(-10);
    event.currentTarget.style.setProperty("--card-x", `${x * 100}%`);
    event.currentTarget.style.setProperty("--card-y", `${y * 100}%`);
  }

  function handlePointerLeave(event: PointerEvent<HTMLDivElement>) {
    resetCard();
    if (event.pointerType === "mouse") onDeactivate();
  }

  return (
    <div
      className="friction-card-hitbox"
      onPointerEnter={(event) => {
        if (event.pointerType === "mouse") onActivate();
      }}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <motion.button
        type="button"
        className={`friction-card${active ? " is-active" : ""}`}
        data-visual={signal.visual}
        aria-expanded={active}
        aria-controls={`friction-description-${index}`}
        onFocus={onActivate}
        onBlur={() => {
          resetCard();
          onDeactivate();
        }}
        onClick={onActivate}
        style={
          {
            transform: cardTransform,
            "--card-index": index,
          } as MotionStyle & Record<"--card-index", number>
        }
      >
        <span className="friction-card-shadow" aria-hidden="true" />
        <span className="friction-card-shell">
          <span className="friction-card-glare" aria-hidden="true" />
          <span className="friction-card-grid" aria-hidden="true" />

          <span className="friction-card-topline">
            <span>{signal.code}</span>
            <i aria-hidden="true">
              <b />
              <b />
              <b />
            </i>
          </span>

          <span className="friction-card-number" aria-hidden="true">
            {signal.number}
          </span>

          <span className="friction-card-visual">
            <SignalVisual type={signal.visual} />
          </span>

          <span className="friction-card-copy">
            <span className="friction-card-title">{signal.title}</span>
            <span
              id={`friction-description-${index}`}
              className="friction-card-description"
              aria-hidden={!active}
            >
              {signal.description}
            </span>
          </span>

          <span className="friction-card-footer">
            <span>{signal.footnote}</span>
            <i aria-hidden="true" />
            <span>0{index + 1} / 03</span>
          </span>
        </span>
      </motion.button>
    </div>
  );
}

export function FrictionEditorial() {
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

        const headingTargets = section.querySelectorAll("[data-friction-heading]");
        const cardTargets = section.querySelectorAll("[data-friction-card]");

        sequence = createTimeline({
          defaults: {
            ease: "out(4)",
          },
          onComplete: () => section.classList.add("is-revealed"),
        })
          .add(headingTargets, {
            opacity: [0, 1],
            translateY: [34, 0],
            duration: 950,
            delay: stagger(95),
          })
          .add(
            cardTargets,
            {
              opacity: [0, 1],
              translateY: [72, 0],
              scale: [0.94, 1],
              rotateX: [8, 0],
              duration: 1200,
              delay: stagger(135),
            },
            "-=620",
          );

        observer.disconnect();
      },
      { threshold: 0.16 },
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
      id="desafios"
      className="friction-stage"
      aria-labelledby="friction-stage-title"
    >
      <div className="friction-stage-blueprint" aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
      </div>
      <div className="friction-stage-noise" aria-hidden="true" />

      <div className="container-shell friction-stage-inner">
        <header className="friction-stage-header">
          <div className="friction-stage-meta" data-friction-heading>
            <span>01 / PUNTO DE PARTIDA</span>
            <i aria-hidden="true" />
            <span>DIAGNÓSTICO OPERATIVO</span>
          </div>

          <div className="friction-stage-heading">
            <h2 id="friction-stage-title" data-friction-heading>
              <span>No necesitas trabajar</span>
              <strong>más.</strong>
            </h2>
            <p data-friction-heading>
              necesitas <span>menos fricción.</span>
            </p>
          </div>

          <p className="friction-stage-instruction" data-friction-heading>
            <span aria-hidden="true">↘</span>
            Explora los puntos de fricción
          </p>
        </header>

        <div className="friction-card-grid-layout">
          {signals.map((signal, index) => (
            <div
              key={signal.number}
              className="friction-card-entry"
              data-friction-card
            >
              <FrictionCard
                signal={signal}
                index={index}
                active={activeCard === index}
                onActivate={() => setActiveCard(index)}
                onDeactivate={() =>
                  setActiveCard((current) => (current === index ? null : current))
                }
              />
            </div>
          ))}
        </div>

        <div className="friction-stage-closure" data-friction-heading>
          <span>DEL ESFUERZO AISLADO</span>
          <i aria-hidden="true" />
          <strong>A UN SISTEMA CONECTADO</strong>
        </div>
      </div>
    </section>
  );
}
