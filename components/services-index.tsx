"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { loadEditorialMotion, shouldReduceInterfaceMotion, type MotionTimeline } from "@/lib/motion";

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
      <svg viewBox="0 0 360 150" role="img" aria-label="Tres entradas se consolidan en un flujo que valida y registra el resultado">
        <path className="services-index-visual-guide" d="M16 25h328M16 125h328M25 29v-8m310 108v-8M139 104v10m60-10v10m60-10v10" />
        <path className="services-visual-route" d="M78 46h15l23 30m-38 0h38m-38 30h15l23-30m46 0h14m46 0h14m46 0h12" />
        <path className="services-visual-panel" d="M25 35h53v22H25zM25 65h53v22H25zM25 95h53v22H25z" />
        <path d="M35 46h30m-30 30h24m-24 30h32" />
        <path className="services-visual-output" d="m116 76 23-23 23 23-23 23zM176 54h46v44h-46zM236 54h46v44h-46zM294 48h41v56h-41z" />
        <path d="M133 76h12m-6-6v12m46-15h28m-28 9h20m-20 9h24m34-14 8 7 14-14m-22 21h24m30-17 6 6 11-13m-16 24h17m-15 8h13" />
        <circle className="services-visual-traveller" r="3.5" />
      </svg>
    );
  }

  if (type === "ai") {
    return (
      <svg viewBox="0 0 360 150" role="img" aria-label="Fuentes autorizadas, procesamiento y borrador con referencias para revisión humana">
        <path className="services-index-visual-guide" d="M16 24h328M16 126h328M23 30v-10m312 111v-10" />
        <path className="services-visual-route" d="M92 76h37m88 0h24" />
        <path className="services-visual-panel" d="M23 42h55l14 14v51H23zM78 42v14h14M30 37v-5h53l14 14" />
        <path d="M34 62h33m-33 9h43m-43 9h28m-28 10h32" />
        <g className="services-ai-process">
          <path className="services-visual-output" d="M136 45h67l9 9v44l-9 9h-67l-9-9V54z" />
          <path d="M140 38v-7m14 7v-7m15 7v-7m15 7v-7m15 7v-7m-59 90v-7m14 7v-7m15 7v-7m15 7v-7m15 7v-7" />
          <path className="services-visual-accent" d="m170 55 19 11v20l-19 11-19-11V66zm0 0v21m-19-10 19 10 19-10m-19 10v21" />
        </g>
        <g className="services-ai-result">
          <path className="services-visual-panel" d="M241 40h94v72h-94z" />
          <path d="M252 54h69m-69 11h48m-48 11h60" />
          <path className="services-visual-output" d="M252 90h25v10h-25zM282 90h16v10h-16z" />
          <g className="services-ai-approval"><circle className="services-visual-accent" cx="318" cy="94" r="9" /><path className="services-visual-check" d="m314 94 3 3 5-6" /></g>
        </g>
      </svg>
    );
  }

  if (type === "apps") {
    return (
      <svg viewBox="0 0 360 150" role="img" aria-label="Aplicación de gestión con navegación, indicadores y detalle de un registro">
        <path className="services-index-visual-guide" d="M16 24h328M16 127h328m-39-86v73" />
        <path className="services-visual-panel" d="M27 34h242l8 8v72H27zM27 50h250m-195 0v64" />
        <path d="M39 42h3m6 0h3m6 0h3m173 0h25M38 61h31m-31 12h22m-22 12h29m-29 12h18M93 90h117m-117 12h98" />
        <path className="services-visual-output" d="M94 59h60v20H94zM162 59h76v20h-76z" />
        <path d="m102 72 9-5 9 2 10-5 11 5m32 3h6m6 0h12m6 0h16" />
        <g className="services-app-activity"><circle className="services-visual-accent" cx="194" cy="91" r="3.5" /></g>
        <g className="services-app-detail">
          <path className="services-visual-output" d="M212 82h121v35H212z" />
          <path d="m223 99 5 5 8-10m10 2h71m-71 9h48" />
        </g>
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 360 150" role="img" aria-label="La misma composición web adaptada de una pantalla de escritorio a un móvil">
      <path className="services-index-visual-guide" d="M16 24h328M16 126h328M30 117h216m-216-4v8m216-8v8" />
      <g className="services-web-desktop">
        <path className="services-visual-panel" d="M27 35h220v73H27zM27 50h220m-211-8h4m6 0h4m6 0h4" />
        <path className="services-visual-output" d="M145 56h89v42h-89zM153 94h73" />
        <path d="M40 64h70m-70 10h53m-53 10h64m51 3 16-17 14 10 12-10 25 17" />
        <rect className="services-visual-accent services-web-focus" x="40" y="92" width="42" height="7" rx="3.5" />
      </g>
      <path className="services-visual-route" d="M247 76h32m-6-5 5 5-5 5" />
      <g className="services-web-mobile">
        <path className="services-visual-panel" d="M283 31h43l6 6v74l-6 6h-43l-6-6V37zM277 47h55m-55 57h55m-31 7h8" />
        <path className="services-visual-output" d="M285 65h39v20h-39z" />
        <path d="M285 54h31m-31 5h20m-15 20 8-8 7 5 5-5 9 8m-34 13h30m-30 5h20" />
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

    const reduceMotion = shouldReduceInterfaceMotion();
    if (reduceMotion) {
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
      disposed = true;
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
