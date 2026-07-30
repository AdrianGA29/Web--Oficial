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
    href: "/servicios/automatizacion",
  },
  {
    number: "03",
    code: "SOFTWARE / OPERATIVA",
    title: "Aplicaciones a medida",
    description:
      "Herramientas internas, aplicaciones de escritorio y soluciones móviles construidas alrededor de la forma real de trabajar.",
    capabilities: ["Windows", "Android", "APIs", "Sistemas internos"],
    visual: "apps",
    href: "/servicios/aplicaciones-a-medida",
  },
  {
    number: "04",
    code: "CRITERIO / INTELIGENCIA",
    title: "Inteligencia artificial",
    description:
      "Análisis, pruebas de concepto e implantación responsable de IA alrededor de necesidades concretas del negocio.",
    capabilities: ["Estrategia", "Implantación", "Formación", "Pruebas de concepto"],
    visual: "ai",
    href: "/servicios/inteligencia-artificial",
  },
] as const;

type ServiceVisualType = (typeof services)[number]["visual"];

function ServiceVisual({ type }: { type: ServiceVisualType }) {
  if (type === "automation") {
    return (
      <svg viewBox="0 0 360 150" role="img" aria-label="Entradas que recorren un proceso automatizado y generan una acción trazable">
        <path className="services-visual-guide" d="M18 22H342M18 128H342" />
        <text className="services-visual-label" x="24" y="17">ENTRADAS</text>
        <text className="services-visual-label" x="336" y="17" textAnchor="end">RESULTADO</text>
        <g className="services-visual-inputs">
          <rect x="24" y="36" width="54" height="22" rx="5" />
          <rect x="24" y="65" width="54" height="22" rx="5" />
          <rect x="24" y="94" width="54" height="22" rx="5" />
          <path d="M34 47h30M34 76h24M34 105h34" />
        </g>
        <path className="services-visual-route services-automation-merge" d="M78 47h18v29h20M78 76h38M78 105h18V76" />
        <g className="services-automation-stages">
          <rect x="116" y="54" width="46" height="44" rx="7" />
          <rect x="176" y="54" width="46" height="44" rx="7" />
          <rect x="236" y="54" width="46" height="44" rx="7" />
          <path d="M128 67h22M128 78h16M188 67h22M188 78h18M248 67h22M248 78h14" />
          <circle className="services-visual-accent" cx="139" cy="90" r="3" />
          <circle className="services-visual-accent" cx="199" cy="90" r="3" />
          <circle className="services-visual-accent" cx="259" cy="90" r="3" />
        </g>
        <path className="services-visual-route" d="M162 76h14M222 76h14M282 76h12" />
        <rect className="services-visual-output" x="294" y="48" width="42" height="56" rx="8" />
        <circle className="services-visual-accent" cx="315" cy="67" r="8" />
        <path className="services-visual-check" d="M311 67l3 3 6-7" />
        <path d="M305 87h20M309 94h12" />
        <circle className="services-visual-traveller" cx="0" cy="0" r="3.5" />
      </svg>
    );
  }

  if (type === "ai") {
    return (
      <svg viewBox="0 0 360 150" role="img" aria-label="Fuentes autorizadas que se procesan y producen un borrador con revisión humana">
        <path className="services-visual-guide" d="M18 22H342M18 128H342" />
        <text className="services-visual-label" x="24" y="17">FUENTES</text>
        <text className="services-visual-label" x="336" y="17" textAnchor="end">REVISIÓN HUMANA</text>
        <g className="services-ai-documents">
          <path d="M26 37h48l14 14v62H26zM74 37v14h14" />
          <path d="M37 62h38M37 73h29M37 84h35" />
          <rect className="services-visual-citation" x="37" y="95" width="22" height="10" rx="3" />
          <rect className="services-visual-citation" x="64" y="95" width="14" height="10" rx="3" />
        </g>
        <path className="services-visual-route" d="M88 76h24" />
        <g className="services-ai-process">
          <rect x="112" y="35" width="92" height="82" rx="10" />
          <rect x="124" y="47" width="68" height="16" rx="4" />
          <rect className="services-visual-output" x="124" y="68" width="68" height="16" rx="4" />
          <rect x="124" y="89" width="68" height="16" rx="4" />
          <path d="M136 55h44M136 76h36M136 97h40" />
        </g>
        <path className="services-visual-route" d="M204 76h24" />
        <g className="services-ai-result">
          <rect x="228" y="36" width="106" height="80" rx="9" />
          <path d="M242 54h76M242 66h52M242 78h68" />
          <rect className="services-visual-citation" x="242" y="89" width="28" height="12" rx="3" />
          <rect className="services-visual-citation" x="275" y="89" width="28" height="12" rx="3" />
          <circle className="services-visual-accent services-ai-approval" cx="319" cy="95" r="9" />
          <path className="services-visual-check" d="M315 95l3 3 6-7" />
        </g>
      </svg>
    );
  }

  if (type === "apps") {
    return (
      <svg viewBox="0 0 360 150" role="img" aria-label="Aplicación operativa con navegación, indicadores, actividad y detalle">
        <path className="services-visual-guide" d="M18 22H342M18 128H342" />
        <text className="services-visual-label" x="24" y="17">SISTEMA INTERNO</text>
        <text className="services-visual-label" x="336" y="17" textAnchor="end">ESTADO VISIBLE</text>
        <rect className="services-app-shell" x="24" y="31" width="312" height="91" rx="10" />
        <path d="M24 49h312M86 49v73" />
        <circle cx="37" cy="40" r="2" /><circle cx="45" cy="40" r="2" /><circle cx="53" cy="40" r="2" />
        <g className="services-app-nav">
          <rect className="services-visual-output" x="34" y="60" width="42" height="14" rx="4" />
          <path d="M37 86h34M37 97h25M37 108h30" />
        </g>
        <g className="services-app-metrics">
          <rect x="98" y="61" width="54" height="25" rx="5" />
          <rect className="services-visual-output" x="160" y="61" width="54" height="25" rx="5" />
          <path d="M108 72h19M108 78h12M170 72h19M170 78h15" />
        </g>
        <g className="services-app-activity">
          <rect x="98" y="94" width="116" height="18" rx="5" />
          <circle className="services-visual-accent" cx="108" cy="103" r="3" />
          <path d="M118 101h54M118 106h35" />
        </g>
        <g className="services-app-detail">
          <rect x="224" y="61" width="98" height="51" rx="6" />
          <circle className="services-visual-accent" cx="238" cy="76" r="6" />
          <path className="services-visual-check" d="M235 76l2 2 4-5" />
          <path d="M250 73h55M250 80h37M236 95h69M236 102h48" />
        </g>
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 360 150" role="img" aria-label="Sistema web adaptado de una pantalla de escritorio a una pantalla móvil">
      <path className="services-visual-guide" d="M18 22H342M18 128H342" />
      <text className="services-visual-label" x="24" y="17">RESPONSIVE SYSTEM</text>
      <text className="services-visual-label" x="336" y="17" textAnchor="end">1440 → 390</text>
      <g className="services-web-desktop">
        <rect x="24" y="33" width="244" height="84" rx="8" />
        <path d="M24 51h244M167 51v66" />
        <circle cx="36" cy="42" r="2" /><circle cx="44" cy="42" r="2" /><circle cx="52" cy="42" r="2" />
        <path d="M38 66h87M38 77h69M38 88h79M38 103h42" />
        <rect className="services-visual-output" x="181" y="65" width="73" height="37" rx="6" />
        <path d="M191 77h53M191 87h38" />
        <rect className="services-visual-accent services-web-focus" x="38" y="98" width="42" height="10" rx="5" />
      </g>
      <path className="services-visual-route" d="M268 75h16" />
      <g className="services-web-mobile">
        <rect x="284" y="38" width="52" height="78" rx="9" />
        <path d="M284 53h52M295 66h30M295 76h23M295 88h30" />
        <rect className="services-visual-output" x="295" y="96" width="30" height="10" rx="4" />
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
