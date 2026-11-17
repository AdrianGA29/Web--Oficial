"use client";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  type MotionStyle,
} from "framer-motion";
import {
  useEffect,
  useRef,
  useState,
  type PointerEvent,
} from "react";
import { loadEditorialMotion, shouldReduceInterfaceMotion, type MotionTimeline } from "@/lib/motion";

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
        <path className="friction-visual-axis" d="M32 105h256M160 24v162M49 30v10m-5-5h10m212 133v10m-5-5h10" />
        <g className="friction-network">
          <path className="friction-network-route" d="M104 69h23q12 0 12 12v16m20 12h24q12 0 12-12V79q0-10 10-10h12m-63 54v15q0 12 12 12h20" />
          <path className="friction-network-route is-broken" d="M80 86v50q0 14 14 14h80" />
          <path className="friction-plane" d="M56 53h42l6 6v27H56zM217 51h44l6 6v30h-50zM186 133h56l6 6v29h-62z" />
          <path className="friction-detail" d="M64 61l16 11 16-11M228 61h28m-28 8h28m-28 8h28m-19-17v19m10-19v19M196 143h35m-35 8h25m-25 8h32" />
          <circle className="is-pulse" cx="149" cy="109" r="18" />
          <path className="friction-accent" d="m144 104 10 10m0-10-10 10" />
        </g>
      </svg>
    );
  }

  if (type === "scale") {
    return (
      <svg viewBox="0 0 320 210" aria-hidden="true">
        <path className="friction-visual-axis" d="M42 158h238M50 44v124m0-50h221M50 79h221m-205 81v7m54-7v7m54-7v7m54-7v7" />
        <g className="friction-scale">
          <g className="friction-column"><path d="M66 158v-28l11-7h25v35z" /><path d="M66 130h25l11-7m-11 7v28" /></g>
          <g className="friction-column"><path d="M120 158v-47l11-7h25v54z" /><path d="M120 111h25l11-7m-11 7v47" /></g>
          <g className="friction-column"><path d="M174 158V88l11-7h25v77z" /><path d="M174 88h25l11-7m-11 7v70" /></g>
          <g className="friction-column is-limit"><path d="M228 158V61l11-7h25v104z" /><path d="M228 61h25l11-7m-11 7v97" /></g>
          <path className="is-growth" d="M72 113 123 95 177 71 249 35m-11 1 11-1-6 10" />
        </g>
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 320 210" aria-hidden="true">
      <path className="friction-visual-axis" d="M37 153h246M51 62h218M160 24v161M61 173v7h12m174-7v7h-12" />
      <g className="friction-stack">
        <g><path d="m61 119 111-35 83 28v8l-111 35-83-28z" /><path d="m61 119 83 28 111-35m-111 35v8" /></g>
        <g><path d="m66 103 111-35 83 28v8l-111 35-83-28z" /><path d="m66 103 83 28 111-35m-111 35v8" /></g>
        <g><path d="m58 84 111-35 83 28v8l-111 35-83-28z" /><path d="m58 84 83 28 111-35m-111 35v8" /></g>
        <g><path d="m63 66 111-35 83 28v8l-111 35-83-28z" /><path d="m63 66 83 28 111-35m-111 35v8M88 68l65-21m-48 26 80-26m-65 32 49-16m12 7 25-8 14 5-25 8z" /></g>
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

        const headingTargets = section.querySelectorAll("[data-friction-heading]");
        const cardTargets = section.querySelectorAll("[data-friction-card]");

        const { createTimeline, stagger } = await loadEditorialMotion();
        if (disposed) return;

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
      disposed = true;
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
