"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { createTimeline } from "animejs/timeline";
import { stagger } from "animejs/utils";
import { useEffect, useRef, useState } from "react";

const services = [
  {
    number: "01",
    code: "INTERFACES / PRODUCTO",
    title: "Desarrollo web",
    description:
      "Webs corporativas, ecommerce y productos digitales que explican bien, funcionan rápido y acompañan el proceso comercial.",
    capabilities: ["Landing pages", "Web corporativa", "Ecommerce", "Rediseño"],
    visual: "web",
    href: "/servicios/desarrollo-web",
  },
  {
    number: "02",
    code: "FLUJOS / INTEGRACIÓN",
    title: "Automatización",
    description:
      "Procesos conectados y menos trabajo repetitivo, con supervisión, trazabilidad y una lógica adaptada a tu operativa.",
    capabilities: ["Flujos", "Integraciones", "Paneles", "Documentos"],
    visual: "automation",
    href: "/servicios#servicio-automation",
  },
  {
    number: "03",
    code: "SOFTWARE / OPERATIVA",
    title: "Aplicaciones a medida",
    description:
      "Herramientas internas, aplicaciones de escritorio y soluciones móviles construidas alrededor de la forma real de trabajar.",
    capabilities: ["Windows", "Android", "APIs", "Sistemas internos"],
    visual: "apps",
    href: "/servicios#servicio-apps",
  },
  {
    number: "04",
    code: "CRITERIO / INTELIGENCIA",
    title: "Inteligencia artificial",
    description:
      "Análisis, pruebas de concepto e implantación responsable de IA alrededor de necesidades concretas del negocio.",
    capabilities: ["Estrategia", "Implantación", "Formación", "Pruebas de concepto"],
    visual: "ai",
    href: "/servicios#servicio-ai",
  },
] as const;

type ServiceVisualType = (typeof services)[number]["visual"];

function ServiceVisual({ type }: { type: ServiceVisualType }) {
  if (type === "automation") {
    return (
      <svg viewBox="0 0 360 150" role="img" aria-label="Flujo automatizado que conecta varios procesos">
        <path className="services-visual-guide" d="M24 75H336" />
        <path className="services-visual-line" d="M42 75H112C132 75 132 38 154 38H205C226 38 226 75 248 75H318" />
        <path className="services-visual-line services-visual-line-secondary" d="M112 75C132 75 132 114 154 114H205C226 114 226 75 248 75" />
        <g className="services-visual-nodes">
          <circle cx="42" cy="75" r="8" />
          <rect x="104" y="67" width="16" height="16" rx="3" />
          <circle cx="180" cy="38" r="8" />
          <circle cx="180" cy="114" r="8" />
          <rect x="240" y="67" width="16" height="16" rx="3" />
          <circle cx="318" cy="75" r="8" />
        </g>
        <circle className="services-visual-pulse" cx="318" cy="75" r="19" />
      </svg>
    );
  }

  if (type === "ai") {
    return (
      <svg viewBox="0 0 360 150" role="img" aria-label="Capas de información que convergen en un núcleo">
        <path className="services-visual-guide" d="M30 24H330M30 126H330" />
        <g className="services-visual-layers">
          <path d="M42 34L126 75L42 116" />
          <path d="M82 34L148 75L82 116" />
          <path d="M122 34L171 75L122 116" />
          <path d="M318 34L234 75L318 116" />
          <path d="M278 34L212 75L278 116" />
          <path d="M238 34L189 75L238 116" />
        </g>
        <circle className="services-visual-core" cx="180" cy="75" r="12" />
        <circle className="services-visual-pulse" cx="180" cy="75" r="28" />
      </svg>
    );
  }

  if (type === "apps") {
    return (
      <svg viewBox="0 0 360 150" role="img" aria-label="Módulos de software que forman un sistema conectado">
        <path className="services-visual-guide" d="M24 75H336M180 18V132" />
        <g className="services-visual-modules">
          <rect x="40" y="31" width="93" height="59" rx="4" />
          <path d="M40 48H133" />
          <rect x="151" y="49" width="91" height="70" rx="4" />
          <path d="M151 67H242" />
          <rect x="260" y="25" width="58" height="100" rx="8" />
          <path d="M274 109H304" />
        </g>
        <path className="services-visual-line" d="M133 61H151M242 84H260" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 360 150" role="img" aria-label="Interfaz web compuesta por módulos">
      <path className="services-visual-guide" d="M24 22H336M24 128H336" />
      <g className="services-visual-browser">
        <rect x="43" y="27" width="274" height="96" rx="5" />
        <path d="M43 48H317" />
        <circle cx="58" cy="38" r="2.5" />
        <circle cx="68" cy="38" r="2.5" />
        <circle cx="78" cy="38" r="2.5" />
        <rect x="58" y="62" width="101" height="44" rx="2" />
        <rect x="172" y="62" width="130" height="9" rx="2" />
        <rect x="172" y="80" width="98" height="7" rx="2" />
        <rect x="172" y="96" width="62" height="10" rx="5" />
      </g>
    </svg>
  );
}

export function ServicesIndex() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeService, setActiveService] = useState<number | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      section.classList.add("is-revealed");
      return;
    }

    section.classList.add("is-motion-ready");
    let sequence: ReturnType<typeof createTimeline> | null = null;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        sequence = createTimeline({
          defaults: { ease: "out(4)" },
          onComplete: () => section.classList.add("is-revealed"),
        })
          .add(section.querySelectorAll("[data-services-heading]"), {
            opacity: [0, 1],
            translateY: [28, 0],
            duration: 900,
            delay: stagger(90),
          })
          .add(
            section.querySelectorAll("[data-service-row]"),
            {
              opacity: [0, 1],
              translateY: [46, 0],
              duration: 1050,
              delay: stagger(110),
            },
            "-=560",
          );

        observer.disconnect();
      },
      { threshold: 0.14 },
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
      id="capacidades"
      className="services-index"
      aria-labelledby="services-index-title"
      onPointerLeave={() => setActiveService(null)}
    >
      <div className="services-index-grid" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>

      <div className="container-shell services-index-inner">
        <header className="services-index-header">
          <div className="services-index-meta" data-services-heading>
            <span>02 / CAPACIDADES</span>
            <i aria-hidden="true" />
            <span>SOLUCIONES A MEDIDA</span>
          </div>

          <div className="services-index-intro">
            <h2 id="services-index-title" data-services-heading>
              Construimos la pieza
              <strong>que falta.</strong>
            </h2>
            <p data-services-heading>
              Tecnología aplicada donde realmente mejora el funcionamiento del negocio.
            </p>
          </div>
        </header>

        <div
          className={`services-index-list${activeService !== null ? " has-active" : ""}`}
        >
          {services.map((service, index) => (
            <Link
              key={service.number}
              href={service.href}
              className={`services-index-row${activeService === index ? " is-active" : ""}`}
              data-service-row
              onPointerEnter={() => setActiveService(index)}
              onFocus={() => setActiveService(index)}
              onBlur={() => setActiveService(null)}
            >
              <div className="services-index-row-backdrop" aria-hidden="true" />
              <span className="services-index-number">{service.number}</span>

              <div className="services-index-copy">
                <p>{service.code}</p>
                <h3>{service.title}</h3>
                <p className="services-index-description">{service.description}</p>
                <ul aria-label={`Capacidades de ${service.title}`}>
                  {service.capabilities.map((capability) => (
                    <li key={capability}>{capability}</li>
                  ))}
                </ul>
              </div>

              <div className="services-index-visual">
                <ServiceVisual type={service.visual} />
              </div>

              <span className="services-index-cue" aria-hidden="true">↗</span>
            </Link>
          ))}
        </div>

        <footer className="services-index-footer" data-services-heading>
          <p>De una necesidad concreta a una solución que encaja con tu operativa.</p>
          <Link href="/servicios">
            Explorar todos los servicios
            <ArrowUpRight size={17} aria-hidden="true" />
          </Link>
        </footer>
      </div>
    </section>
  );
}
