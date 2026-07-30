"use client";

import type { CSSProperties, PointerEvent as ReactPointerEvent } from "react";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";

const team = [
  {
    id: "strategy",
    number: "01",
    discipline: "ESTRATEGIA / DESARROLLO",
    name: "Alejandro López Mateos",
    role: "Dirección de Estrategia y Desarrollo Empresarial",
    description:
      "Analiza el negocio desde una visión global para convertir retos complejos en planes claros, viables y orientados a resultados.",
    capabilities: [
      "Análisis de negocio",
      "Planificación estratégica",
      "Crecimiento y viabilidad",
    ],
  },
  {
    id: "legal",
    number: "02",
    discipline: "CRITERIO / CONSULTORÍA",
    name: "Patricia Paniagua López",
    role: "Dirección Jurídica, Consultoría e Inteligencia Artificial",
    description:
      "Une derecho, estrategia e innovación para acompañar la transformación digital con criterio normativo y una adopción responsable de nuevas tecnologías.",
    capabilities: [
      "Análisis normativo",
      "Transformación digital",
      "IA responsable y subvenciones",
    ],
  },
  {
    id: "technology",
    number: "03",
    discipline: "TECNOLOGÍA / INNOVACIÓN",
    name: "Adrián García Almaida",
    role: "Dirección de Tecnología e Innovación",
    description:
      "Diseña y desarrolla plataformas, automatizaciones y aplicaciones capaces de convertir una estrategia en soluciones digitales eficientes y escalables.",
    capabilities: [
      "Plataformas digitales",
      "Automatización y aplicaciones",
      "Arquitectura escalable",
    ],
  },
] as const;

const principles = [
  {
    reject: "No vendemos páginas por vender.",
    defend: "Diseñamos soluciones ligadas a un objetivo.",
  },
  {
    reject: "No implantamos herramientas por tendencia.",
    defend: "Elegimos tecnología con criterio.",
  },
  {
    reject: "No acumulamos complejidad.",
    defend: "Construimos lo necesario para avanzar.",
  },
  {
    reject: "No actuamos sin comprender el contexto.",
    defend: "Medimos, acompañamos y asumimos responsabilidad.",
  },
] as const;

const charter = [
  {
    number: "01",
    title: "Misión",
    copy: "Ayudar a empresas y organizaciones a crecer mediante decisiones estratégicas, innovación y tecnología aplicada con propósito.",
  },
  {
    number: "02",
    title: "Visión",
    copy: "Construir una firma reconocida por transformar empresas desde el conocimiento, la confianza y la excelencia en la ejecución.",
  },
  {
    number: "03",
    title: "Compromiso",
    copy: "No medimos el éxito por el número de proyectos. Lo medimos por el cambio útil y sostenible que conseguimos generar junto a cada cliente.",
  },
] as const;

const premiumEase = [0.22, 1, 0.36, 1] as const;

function HeroSystem({ reduceMotion }: { reduceMotion: boolean }) {
  const pathAnimation = (delay: number) => ({
    initial: reduceMotion ? false : { pathLength: 0, opacity: 0 },
    animate: { pathLength: 1, opacity: 1 },
    transition: {
      pathLength: { duration: 1.45, delay, ease: premiumEase },
      opacity: { duration: 0.35, delay },
    },
  });

  return (
    <svg
      className="about-hero-system"
      viewBox="0 0 1200 720"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="about-hero-line-a" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f5f5f5" stopOpacity="0.08" />
          <stop offset="0.52" stopColor="#8f82ff" stopOpacity="0.72" />
          <stop offset="1" stopColor="#f5f5f5" stopOpacity="0.12" />
        </linearGradient>
        <linearGradient id="about-hero-line-b" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor="#f5f5f5" stopOpacity="0.06" />
          <stop offset="0.58" stopColor="#b8b2ff" stopOpacity="0.48" />
          <stop offset="1" stopColor="#f5f5f5" stopOpacity="0.08" />
        </linearGradient>
        <radialGradient id="about-hero-core">
          <stop offset="0" stopColor="#b8b2ff" stopOpacity="0.9" />
          <stop offset="0.32" stopColor="#7667ff" stopOpacity="0.34" />
          <stop offset="1" stopColor="#070b1a" stopOpacity="0" />
        </radialGradient>
        <filter id="about-hero-glow" x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="8" />
        </filter>
      </defs>

      <g className="about-hero-system__construction">
        <circle cx="865" cy="360" r="216" />
        <circle cx="865" cy="360" r="122" />
        <path d="M648 144V576M865 105V615M1082 144V576M614 360H1116" />
      </g>

      <motion.path
        d="M42 154 C236 154 250 238 414 238 C577 238 636 329 764 350 C802 356 831 359 865 360"
        fill="none"
        stroke="url(#about-hero-line-a)"
        strokeWidth="1.4"
        {...pathAnimation(0.12)}
      />
      <motion.path
        d="M42 358 C246 358 321 358 455 358 C612 358 652 358 865 360"
        fill="none"
        stroke="url(#about-hero-line-b)"
        strokeWidth="1.2"
        {...pathAnimation(0.28)}
      />
      <motion.path
        d="M42 566 C225 566 267 486 432 486 C592 486 638 401 764 374 C807 365 832 361 865 360"
        fill="none"
        stroke="url(#about-hero-line-a)"
        strokeWidth="1.4"
        {...pathAnimation(0.44)}
      />
      <motion.path
        d="M865 360 C958 360 1012 360 1170 360"
        fill="none"
        stroke="url(#about-hero-line-a)"
        strokeWidth="1.35"
        {...pathAnimation(0.82)}
      />

      <circle
        className="about-hero-system__glow"
        cx="865"
        cy="360"
        r="86"
        fill="url(#about-hero-core)"
        filter="url(#about-hero-glow)"
      />
      <motion.circle
        cx="865"
        cy="360"
        r="7"
        fill="#b8b2ff"
        initial={reduceMotion ? false : { scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.15 }}
      />
      {[
        [414, 238],
        [455, 358],
        [432, 486],
        [1048, 360],
      ].map(([cx, cy], index) => (
        <motion.circle
          key={`${cx}-${cy}`}
          cx={cx}
          cy={cy}
          r="3.5"
          fill="#f5f5f5"
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: [0, 0.76, 0.28] }}
          transition={{
            duration: reduceMotion ? 0 : 1.1,
            delay: 0.55 + index * 0.12,
            times: [0, 0.35, 1],
          }}
        />
      ))}
    </svg>
  );
}

function StrategyVisual({ reduceMotion }: { reduceMotion: boolean }) {
  return (
    <svg viewBox="0 0 520 260" aria-hidden="true">
      <defs>
        <linearGradient id="strategy-line" x1="0" y1="1" x2="1" y2="0">
          <stop stopColor="#f5f5f5" stopOpacity="0.18" />
          <stop offset="0.6" stopColor="#9b91ff" stopOpacity="0.9" />
          <stop offset="1" stopColor="#f5f5f5" stopOpacity="0.48" />
        </linearGradient>
      </defs>
      <g className="about-vector-grid">
        <path d="M32 48H488M32 104H488M32 160H488M32 216H488" />
        <path d="M88 26V234M200 26V234M312 26V234M424 26V234" />
      </g>
      <circle className="about-vector-ring" cx="312" cy="104" r="67" />
      <circle className="about-vector-ring about-vector-ring--inner" cx="312" cy="104" r="37" />
      <motion.path
        d="M48 204 L142 162 L219 177 L312 104 L391 124 L473 55"
        fill="none"
        stroke="url(#strategy-line)"
        strokeWidth="2"
        initial={false}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.45, ease: [0.22, 1, 0.36, 1] }}
      />
      {[
        [48, 204],
        [142, 162],
        [219, 177],
        [312, 104],
        [391, 124],
        [473, 55],
      ].map(([cx, cy], index) => (
        <circle
          key={`${cx}-${cy}`}
          className={`about-vector-node about-vector-node--${(index % 3) + 1}`}
          cx={cx}
          cy={cy}
          r={index === 3 ? 6 : 4}
        />
      ))}
      <path className="about-vector-axis" d="M312 37V171M245 104H379" />
    </svg>
  );
}

function LegalVisual({ reduceMotion }: { reduceMotion: boolean }) {
  return (
    <svg viewBox="0 0 520 260" aria-hidden="true">
      <defs>
        <linearGradient id="legal-line" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#f5f5f5" stopOpacity="0.22" />
          <stop offset="0.55" stopColor="#9b91ff" stopOpacity="0.92" />
          <stop offset="1" stopColor="#f5f5f5" stopOpacity="0.38" />
        </linearGradient>
      </defs>
      <g className="about-vector-grid">
        <path d="M32 48H488M32 104H488M32 160H488M32 216H488" />
        <path d="M88 26V234M200 26V234M312 26V234M424 26V234" />
      </g>
      <path className="about-legal-orbit" d="M102 133C102 64 172 24 259 24S416 64 416 133s-70 109-157 109S102 202 102 133Z" />
      <path className="about-legal-orbit about-legal-orbit--reverse" d="M259 33c67 0 121 44 121 99s-54 99-121 99-121-44-121-99 54-99 121-99Z" />
      <motion.path
        d="M259 50 338 81v56c0 47-31 82-79 104-48-22-79-57-79-104V81l79-31Z"
        fill="rgba(143,130,255,0.055)"
        stroke="url(#legal-line)"
        strokeWidth="1.8"
        initial={false}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.45, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.path
        d="m218 139 27 27 59-68"
        fill="none"
        stroke="#b8b2ff"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="4"
        initial={false}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.8, delay: 0.72, ease: [0.22, 1, 0.36, 1] }}
      />
      <circle className="about-vector-node about-vector-node--1" cx="102" cy="133" r="4" />
      <circle className="about-vector-node about-vector-node--2" cx="416" cy="133" r="4" />
    </svg>
  );
}

function TechnologyVisual({ reduceMotion }: { reduceMotion: boolean }) {
  const routes = [
    { d: "M72 66 H150 Q174 66 174 90 V106 H205", delay: "0s" },
    { d: "M448 66 H370 Q346 66 346 90 V106 H315", delay: "0.55s" },
    { d: "M72 194 H150 Q174 194 174 170 V154 H205", delay: "1.1s" },
    { d: "M448 194 H370 Q346 194 346 170 V154 H315", delay: "1.65s" },
  ] as const;

  return (
    <svg viewBox="0 0 520 260" aria-hidden="true">
      <defs>
        <linearGradient id="technology-line" x1="0" y1="0" x2="1" y2="0">
          <stop stopColor="#f5f5f5" stopOpacity="0.15" />
          <stop offset="0.48" stopColor="#9b91ff" stopOpacity="0.95" />
          <stop offset="1" stopColor="#f5f5f5" stopOpacity="0.2" />
        </linearGradient>
        <radialGradient id="technology-core-glow">
          <stop stopColor="#9b91ff" stopOpacity="0.32" />
          <stop offset="1" stopColor="#070b1a" stopOpacity="0" />
        </radialGradient>
      </defs>
      <g className="about-vector-grid">
        <path d="M32 48H488M32 104H488M32 160H488M32 216H488" />
        <path d="M88 26V234M200 26V234M312 26V234M424 26V234" />
      </g>
      <ellipse className="about-tech-orbit" cx="260" cy="130" rx="142" ry="91" />
      <ellipse className="about-tech-orbit about-tech-orbit--inner" cx="260" cy="130" rx="104" ry="67" />

      {routes.map((route) => (
        <g key={route.d}>
          <path
            className="about-tech-route"
            d={route.d}
            pathLength="1"
          />
          {!reduceMotion && (
            <circle className="about-tech-signal" r="2.8">
              <animateMotion
                path={route.d}
                dur="4.2s"
                begin={route.delay}
                repeatCount="indefinite"
              />
            </circle>
          )}
        </g>
      ))}

      <g className="about-tech-endpoint">
        <rect x="45" y="43" width="54" height="46" rx="5" />
        <path d="M57 57h30M57 66h19M57 75h25" />
        <circle cx="89" cy="52" r="2" />

        <rect x="421" y="43" width="54" height="46" rx="5" />
        <path d="M433 57h30M444 66h19M438 75h25" />
        <circle cx="431" cy="52" r="2" />

        <rect x="45" y="171" width="54" height="46" rx="5" />
        <path d="M57 185h18M57 194h30M57 203h24" />
        <circle cx="89" cy="180" r="2" />

        <rect x="421" y="171" width="54" height="46" rx="5" />
        <path d="M433 185h22M433 194h30M441 203h22" />
        <circle cx="431" cy="180" r="2" />
      </g>

      <circle cx="260" cy="130" r="82" fill="url(#technology-core-glow)" />
      <g className="about-tech-processor">
        <rect x="205" y="76" width="110" height="108" rx="10" />
        <rect className="about-tech-processor__inner" x="218" y="89" width="84" height="82" rx="6" />
        <path d="M236 116h48M236 130h48M236 144h30" />
        <path className="about-tech-processor__bracket" d="M232 104h-8v52h8M288 104h8v52h-8" />
        {Array.from({ length: 6 }).map((_, index) => (
          <g key={index}>
            <path d={`M${221 + index * 15.5} 68v8`} />
            <path d={`M${221 + index * 15.5} 184v8`} />
          </g>
        ))}
      </g>

      <circle className="about-vector-node about-vector-node--1" cx="174" cy="106" r="3.5" />
      <circle className="about-vector-node about-vector-node--2" cx="346" cy="106" r="3.5" />
      <circle className="about-vector-node about-vector-node--3" cx="174" cy="154" r="3.5" />
      <circle className="about-vector-node about-vector-node--1" cx="346" cy="154" r="3.5" />
      <circle className="about-tech-processor__status" cx="284" cy="153" r="3" />
    </svg>
  );
}

function TeamVisual({
  type,
  reduceMotion,
}: {
  type: (typeof team)[number]["id"];
  reduceMotion: boolean;
}) {
  if (type === "strategy") return <StrategyVisual reduceMotion={reduceMotion} />;
  if (type === "legal") return <LegalVisual reduceMotion={reduceMotion} />;
  return <TechnologyVisual reduceMotion={reduceMotion} />;
}

function TeamCard({
  member,
  active,
  onActivate,
  onDeactivate,
  reduceMotion,
}: {
  member: (typeof team)[number];
  active: boolean;
  onActivate: () => void;
  onDeactivate: () => void;
  reduceMotion: boolean;
}) {
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 190, damping: 24, mass: 0.65 });
  const springY = useSpring(rotateY, { stiffness: 190, damping: 24, mass: 0.65 });
  const transform = useMotionTemplate`perspective(1200px) rotateX(${springX}deg) rotateY(${springY}deg)`;

  const handleMove = (event: ReactPointerEvent<HTMLElement>) => {
    if (reduceMotion || event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    rotateY.set(x * 7);
    rotateX.set(y * -6);
  };

  const reset = () => {
    rotateX.set(0);
    rotateY.set(0);
    onDeactivate();
  };

  return (
    <motion.div
      className={`about-team-entry${active ? " is-active" : ""}`}
    >
      <div className="about-team-reveal-shell" data-about-reveal>
        <motion.article
          className="about-team-card"
          style={reduceMotion ? undefined : { transform }}
          onPointerEnter={onActivate}
          onPointerMove={handleMove}
          onPointerLeave={reset}
        >
          <div className="about-team-card__edge" aria-hidden="true" />
          <div className="about-team-card__meta">
            <span>{member.number}</span>
            <span>{member.discipline}</span>
          </div>
          <div className="about-team-card__visual">
            <TeamVisual type={member.id} reduceMotion={reduceMotion} />
          </div>
          <div className="about-team-card__copy">
            <h3>{member.name}</h3>
            <p className="about-team-card__role">{member.role}</p>
            <p className="about-team-card__description">{member.description}</p>
            <ul aria-label={`Áreas de ${member.name}`}>
              {member.capabilities.map((capability) => (
                <li key={capability}>{capability}</li>
              ))}
            </ul>
          </div>
        </motion.article>
      </div>
    </motion.div>
  );
}

function ConvergenceDiagram({ reduceMotion }: { reduceMotion: boolean }) {
  const inputPaths = [
    {
      id: "strategy",
      label: "ESTRATEGIA",
      y: 88,
      d: "M184 88 C324 88 372 210 536 210",
      delay: "0s",
    },
    {
      id: "criteria",
      label: "CRITERIO JURÍDICO",
      y: 210,
      d: "M184 210 H536",
      delay: "0.55s",
    },
    {
      id: "technology",
      label: "TECNOLOGÍA",
      y: 332,
      d: "M184 332 C324 332 372 210 536 210",
      delay: "1.1s",
    },
  ] as const;

  return (
    <svg
      className="about-convergence-svg"
      viewBox="0 0 1200 420"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="convergence-flow" x1="0" y1="0" x2="1" y2="0">
          <stop stopColor="#f5f5f5" stopOpacity="0.16" />
          <stop offset="0.56" stopColor="#9b91ff" stopOpacity="0.92" />
          <stop offset="1" stopColor="#c8c3ff" stopOpacity="0.58" />
        </linearGradient>
        <linearGradient id="convergence-flow-out" x1="0" y1="0" x2="1" y2="0">
          <stop stopColor="#c8c3ff" stopOpacity="0.68" />
          <stop offset="0.58" stopColor="#9b91ff" stopOpacity="0.52" />
          <stop offset="1" stopColor="#f5f5f5" stopOpacity="0.12" />
        </linearGradient>
        <radialGradient id="convergence-core">
          <stop stopColor="#a89fff" stopOpacity="0.42" />
          <stop offset="1" stopColor="#070b1a" stopOpacity="0" />
        </radialGradient>
        <filter id="convergence-glow" x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="7" />
        </filter>
      </defs>

      <g className="about-convergence-grid">
        <path d="M28 88H1172M28 332H1172" />
        <path d="M184 28V392M600 28V392M1068 28V392" />
        <path className="about-convergence-grid__axis" d="M28 210H1172" />
      </g>

      {inputPaths.map((path, index) => (
        <g key={path.id} className="about-convergence-input">
          <text x="38" y={path.y + 4}>{path.label}</text>
          <circle className="about-convergence-node" cx="184" cy={path.y} r="4.5" />
          <path
            className={`about-convergence-flow about-convergence-flow--${index + 1}`}
            d={path.d}
            pathLength="1"
          />
          <path
            className="about-convergence-energy"
            d={path.d}
            pathLength="1"
          />
          {!reduceMotion && (
            <circle className="about-convergence-signal" r="3.2">
              <animateMotion
                path={path.d}
                dur="4.6s"
                begin={path.delay}
                repeatCount="indefinite"
                keyPoints="0;1"
                keyTimes="0;1"
                calcMode="spline"
                keySplines="0.22 1 0.36 1"
              />
            </circle>
          )}
        </g>
      ))}

      <path
        className="about-convergence-flow about-convergence-flow--output"
        d="M664 210 H812"
        pathLength="1"
      />
      {!reduceMotion && (
        <circle className="about-convergence-signal about-convergence-signal--output" r="3.2">
          <animateMotion
            path="M664 210 H812"
            dur="4.2s"
            begin="1.7s"
            repeatCount="indefinite"
          />
        </circle>
      )}

      <g className="about-convergence-core">
        <circle
          className="about-convergence-core__glow"
          cx="600"
          cy="210"
          r="112"
          fill="url(#convergence-core)"
          filter="url(#convergence-glow)"
        />
        <circle className="about-convergence-core__orbit" cx="600" cy="210" r="78" />
        <path
          className="about-convergence-core__diamond about-convergence-core__diamond--outer"
          d="m600 142 68 68-68 68-68-68 68-68Z"
        />
        <path
          className="about-convergence-core__diamond about-convergence-core__diamond--inner"
          d="m600 162 48 48-48 48-48-48 48-48Z"
        />
        <circle className="about-convergence-core__point" cx="600" cy="142" r="3" />
        <circle className="about-convergence-core__point" cx="668" cy="210" r="3" />
        <circle className="about-convergence-core__point" cx="600" cy="278" r="3" />
        <circle className="about-convergence-core__point" cx="532" cy="210" r="3" />
        <text className="about-convergence-core__eyebrow" x="600" y="202" textAnchor="middle">
          DECISIÓN
        </text>
        <text className="about-convergence-core__title" x="600" y="230" textAnchor="middle">
          Viable
        </text>
      </g>

      <g className="about-convergence-result">
        <text className="about-convergence-result__eyebrow" x="850" y="190">
          RESULTADO
        </text>
        <text className="about-convergence-result__title" x="850" y="222">
          <tspan x="850">Una solución que</tspan>
          <tspan x="850" dy="25">puede sostenerse.</tspan>
        </text>
      </g>
      <circle className="about-convergence-node about-convergence-node--output" cx="812" cy="210" r="4.5" />
    </svg>
  );
}

export function AboutShowcase() {
  const reduceMotion = useReducedMotion() ?? false;
  const [activeMember, setActiveMember] = useState<string | null>(null);
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = pageRef.current;
    if (!root) return;

    const elements = Array.from(
      root.querySelectorAll<HTMLElement>("[data-about-reveal]"),
    );

    if (typeof IntersectionObserver === "undefined") {
      elements.forEach((element) => element.classList.add("is-revealed"));
      return;
    }

    root.classList.add("is-reveal-ready");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-revealed");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -6% 0px" },
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={pageRef} className="about-page">
      <section className="about-hero" aria-labelledby="about-title">
        <div className="about-hero__grid" aria-hidden="true" />
        <HeroSystem reduceMotion={reduceMotion} />
        <div className="container-shell about-hero__inner">
          <div className="about-hero__meta">
            <span>01 / SOBRE TEMIS ATRILE</span>
            <span>ESTRATEGIA · CRITERIO · TECNOLOGÍA</span>
          </div>

          <div className="about-hero__copy">
            <p className="about-kicker">UNA FIRMA PARA DECISIONES QUE IMPORTAN</p>
            <h1 id="about-title">
              No creemos en soluciones estándar.
              <strong>Creemos en empresas con ambición.</strong>
            </h1>
            <p>
              Combinamos conocimiento empresarial, jurídico y tecnológico para
              convertir la transformación en una dirección clara.
            </p>
          </div>

          <div className="about-hero__triad" aria-label="Tres perspectivas">
            <span><b>01</b>Estrategia</span>
            <span><b>02</b>Criterio</span>
            <span><b>03</b>Tecnología</span>
          </div>
        </div>
      </section>

      <section className="about-definition" aria-labelledby="about-definition-title">
        <div className="container-shell">
          <motion.div
            className="about-section-index"
            data-about-reveal
          >
            <span>02</span>
            <span>QUÉ ES TEMIS ATRILE</span>
          </motion.div>

          <div className="about-definition__layout">
            <motion.h2
              id="about-definition-title"
              data-about-reveal
            >
              La tecnología avanza rápido.
              <span>El criterio decide hacia dónde.</span>
            </motion.h2>
            <motion.div
              className="about-definition__copy"
              data-about-reveal
              data-reveal-delay="1"
            >
              <p>
                Cada empresa tiene una historia, unos retos y un potencial
                propios. Por eso no partimos de servicios aislados ni de
                soluciones prefabricadas: analizamos la organización y
                diseñamos una respuesta alineada con su realidad.
              </p>
              <p>
                Estrategia empresarial, consultoría, inteligencia artificial,
                transformación digital y conocimiento jurídico trabajan como
                un único sistema: entender primero y construir después.
              </p>
            </motion.div>
          </div>

          <div className="about-operating-line">
            {["Analizar", "Planificar", "Ejecutar", "Acompañar"].map((verb, index) => (
              <motion.div
                key={verb}
                className="about-operating-line__item"
                data-about-reveal
                style={{ "--about-delay": `${index * 90}ms` } as CSSProperties}
              >
                <span>0{index + 1}</span>
                <strong>{verb}</strong>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="about-team" aria-labelledby="about-team-title">
        <div className="about-team__ambient" aria-hidden="true" />
        <div className="container-shell">
          <div className="about-team__heading">
            <motion.div
              className="about-section-index about-section-index--light"
              data-about-reveal
            >
              <span>03</span>
              <span>TRES DISCIPLINAS · UNA DIRECCIÓN</span>
            </motion.div>
            <motion.h2
              id="about-team-title"
              data-about-reveal
            >
              El equipo detrás del criterio.
            </motion.h2>
            <motion.p
              data-about-reveal
              data-reveal-delay="1"
            >
              Perfiles distintos para estudiar una misma decisión desde todos
              sus ángulos antes de llevarla a producción.
            </motion.p>
          </div>

          <div className={`about-team-grid${activeMember ? " has-active" : ""}`}>
            {team.map((member) => (
              <TeamCard
                key={member.id}
                member={member}
                active={activeMember === member.id}
                onActivate={() => setActiveMember(member.id)}
                onDeactivate={() => setActiveMember(null)}
                reduceMotion={reduceMotion}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="about-convergence" aria-labelledby="about-convergence-title">
        <div className="container-shell">
          <div className="about-convergence__heading">
            <motion.div
              className="about-section-index about-section-index--light"
              data-about-reveal
            >
              <span>04</span>
              <span>EL PUNTO DE CONVERGENCIA</span>
            </motion.div>
            <motion.h2
              id="about-convergence-title"
              data-about-reveal
            >
              Una solución solo es buena cuando
              <span>tiene sentido desde todos los lados.</span>
            </motion.h2>
          </div>

          <motion.div
            className="about-convergence__diagram"
            data-about-reveal
          >
            <ConvergenceDiagram reduceMotion={reduceMotion} />
            <div className="about-convergence__mobile-flow">
              <div className="about-convergence__mobile-inputs">
                <span>Estrategia</span>
                <span>Criterio jurídico</span>
                <span>Tecnología</span>
              </div>
              <div className="about-convergence__mobile-merge" aria-hidden="true">
                <i />
                <i />
                <i />
              </div>
              <div className="about-convergence__mobile-core">
                <small>DECISIÓN</small>
                <strong>Viable</strong>
              </div>
              <div className="about-convergence__mobile-result">
                <small>RESULTADO</small>
                <strong>Una solución que puede sostenerse.</strong>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="about-philosophy" aria-labelledby="about-philosophy-title">
        <div className="container-shell">
          <div className="about-philosophy__heading">
            <motion.div
              className="about-section-index"
              data-about-reveal
            >
              <span>05</span>
              <span>NUESTRA FILOSOFÍA</span>
            </motion.div>
            <motion.h2
              id="about-philosophy-title"
              data-about-reveal
            >
              Lo que elegimos no hacer también define cómo trabajamos.
            </motion.h2>
          </div>

          <div className="about-principles">
            <div className="about-principles__legend" aria-hidden="true">
              <span>NO HACEMOS</span>
              <span>DEFENDEMOS</span>
            </div>
            {principles.map((principle, index) => (
              <motion.div
                key={principle.reject}
                className="about-principle"
                data-about-reveal
                style={{ "--about-delay": `${index * 60}ms` } as CSSProperties}
              >
                <span className="about-principle__number">0{index + 1}</span>
                <p className="about-principle__reject">{principle.reject}</p>
                <span className="about-principle__switch" aria-hidden="true">
                  <i />
                </span>
                <p className="about-principle__defend">{principle.defend}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="about-charter" aria-labelledby="about-charter-title">
        <div className="container-shell">
          <motion.div
            className="about-charter__panel"
            data-about-reveal
          >
            <div className="about-charter__topline">
              <span>06 / MANIFIESTO OPERATIVO</span>
              <span>TEMIS ATRILE</span>
            </div>
            <h2 id="about-charter-title">
              Una dirección compartida.
              <span>Tres compromisos concretos.</span>
            </h2>
            <div className="about-charter__grid">
              {charter.map((item) => (
                <article key={item.title}>
                  <span>{item.number}</span>
                  <h3>{item.title}</h3>
                  <p>{item.copy}</p>
                </article>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="about-closing" aria-labelledby="about-closing-title">
        <div className="about-closing__line" aria-hidden="true" />
        <div className="container-shell about-closing__inner">
          <motion.div
            data-about-reveal
          >
            <span>EL PRIMER PASO ES ENTENDER</span>
            <h2 id="about-closing-title">
              Una buena transformación empieza por saber qué merece la pena cambiar.
            </h2>
          </motion.div>
          <motion.div
            className="about-closing__action"
            data-about-reveal
            data-reveal-delay="1"
          >
            <div className="about-closing__session">
              <div className="about-closing__session-head">
                <span>PRIMERA SESIÓN</span>
                <span>SIN COSTE</span>
              </div>
              <div className="about-closing__session-main">
                <strong>01:00</strong>
                <p>
                  Una hora para entender el punto de partida y ordenar qué
                  merece atención primero.
                </p>
              </div>
              <div className="about-closing__session-steps">
                <span><b>01</b>Contexto</span>
                <span><b>02</b>Prioridad</span>
                <span><b>03</b>Siguiente paso</span>
              </div>
            </div>
            <p>Consultoría inicial gratuita y sin compromiso.</p>
            <Link href="/#contacto">
              Hablar con el equipo
              <ArrowUpRight size={18} aria-hidden="true" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
