"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { serviceCatalog, type ServiceVisual } from "@/lib/service-catalog";
import { ServiceVisualGraphic } from "@/components/service-visuals";

const needMap = [
  ["La web no explica bien el valor", "Desarrollo web", "01"],
  ["El equipo mueve información a mano", "Automatización", "02"],
  ["El software genérico no encaja", "Aplicaciones a medida", "03"],
  ["Hay más información que tiempo", "Inteligencia artificial", "04"],
] as const;

const principles = [
  {
    number: "01",
    title: "Utilidad antes que novedad",
    text: "La tecnología entra cuando resuelve un bloqueo concreto, no para decorar una propuesta.",
  },
  {
    number: "02",
    title: "Alcance que se puede defender",
    text: "Cada proyecto parte de una necesidad, unos límites y una primera entrega comprensible.",
  },
  {
    number: "03",
    title: "Una base que pueda evolucionar",
    text: "Diseñamos para el uso real de hoy sin cerrar el camino a la siguiente mejora.",
  },
] as const;

function SystemMap({ active }: { active: ServiceVisual }) {
  return (
    <div className="services-hero-map" aria-hidden="true">
      <svg viewBox="0 0 720 430">
        <defs>
          <linearGradient id="hub-route" x1="0" x2="1">
            <stop offset="0" stopColor="#f5f5f5" stopOpacity=".08" />
            <stop offset=".52" stopColor="#a49aff" stopOpacity=".9" />
            <stop offset="1" stopColor="#f5f5f5" stopOpacity=".18" />
          </linearGradient>
          <radialGradient id="hub-core">
            <stop offset="0" stopColor="#8f82ff" stopOpacity=".48" />
            <stop offset="1" stopColor="#8f82ff" stopOpacity="0" />
          </radialGradient>
        </defs>
        <path className="services-map-grid" d="M0 90h720M0 215h720M0 340h720M154 0v430M360 0v430M566 0v430" />
        <circle className="services-map-halo" cx="360" cy="215" r="118" />
        <circle className="services-map-orbit" cx="360" cy="215" r="86" />
        <path className="services-map-route" d="M74 78h118c60 0 78 38 100 82M74 352h118c60 0 78-38 100-82M646 78H528c-60 0-78 38-100 82M646 352H528c-60 0-78-38-100-82" />
        {[
          [74, 78, "web"],
          [74, 352, "automation"],
          [646, 78, "apps"],
          [646, 352, "ai"],
        ].map(([cx, cy, id]) => (
          <g key={id}>
            <circle className={`services-map-node${active === id ? " is-active" : ""}`} cx={cx} cy={cy} r="8" />
            <circle className="services-map-node-ring" cx={cx} cy={cy} r="17" />
          </g>
        ))}
        <rect className="services-map-core" x="290" y="176" width="140" height="78" rx="12" />
        <path className="services-map-core-line" d="M315 202h90M315 215h62M315 228h76" />
        <circle className="services-map-pulse" cx="292" cy="160" r="5" />
      </svg>
      <span className="services-map-label is-web">WEB / PRODUCTO</span>
      <span className="services-map-label is-auto">FLUJOS / SISTEMAS</span>
      <span className="services-map-label is-app">SOFTWARE / DATOS</span>
      <span className="services-map-label is-ai">ANÁLISIS / IA</span>
      <span className="services-map-center">NECESIDAD<br />REAL</span>
      <div className="services-map-status">
        <span />
        SISTEMA DE CAPACIDADES / 04
      </div>
    </div>
  );
}

export function ServicesHub() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [activeService, setActiveService] = useState<ServiceVisual>("web");

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    root.classList.add("is-reveal-ready");

    const items = Array.from(root.querySelectorAll<HTMLElement>("[data-service-reveal]"));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          (entry.target as HTMLElement).classList.add("is-revealed");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -8% 0px" },
    );
    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={rootRef} className="services-hub">
      <section className="services-hub-hero">
        <div className="container-shell services-hub-hero-inner">
          <div className="services-hub-hero-copy" data-service-reveal>
            <Link href="/" className="services-back-link">
              <ArrowLeft size={14} aria-hidden="true" />
              TEMIS ATRILE / SERVICIOS
            </Link>
            <p className="services-hub-index">CAPACIDADES / 01—04</p>
            <h1>
              No vendemos tecnología por catálogo.
              <span>Diseñamos la pieza que resuelve el bloqueo.</span>
            </h1>
            <p className="services-hub-lead">
              Cuatro líneas de trabajo y un mismo criterio: entender primero qué necesita el negocio y construir después una solución que pueda utilizar, mantener y hacer crecer.
            </p>
            <a href="#directorio-servicios" className="services-hub-scroll">
              Ver capacidades
              <span><ArrowDown size={17} aria-hidden="true" /></span>
            </a>
          </div>
          <SystemMap active={activeService} />
        </div>
        <div className="services-hub-hero-footer" aria-hidden="true">
          <span>DESARROLLO</span><i /><span>AUTOMATIZACIÓN</span><i /><span>SOFTWARE</span><i /><span>IA APLICADA</span>
        </div>
      </section>

      <section id="directorio-servicios" className="services-directory">
        <div className="container-shell">
          <header className="services-section-heading" data-service-reveal>
            <p>DIRECTORIO DE CAPACIDADES</p>
            <div>
              <h2>Una entrada distinta para cada clase de problema.</h2>
              <span>El servicio no es el punto de partida. Es la forma que toma la solución cuando el problema ya se ha entendido.</span>
            </div>
          </header>

          <div className="services-directory-list">
            {serviceCatalog.map((service) => (
              <article
                key={service.id}
                id={`servicio-${service.id}`}
                className={`service-directory-row is-${service.id}${activeService === service.id ? " is-active" : ""}`}
                onPointerEnter={() => setActiveService(service.id)}
                onFocusCapture={() => setActiveService(service.id)}
              >
                <div className="service-directory-number" aria-hidden="true">{service.number}</div>
                <div className="service-directory-copy">
                  <p>{service.eyebrow}</p>
                  <h3>{service.title}</h3>
                  <h4>{service.promise}</h4>
                  <p className="service-directory-description">{service.description}</p>
                  <ul aria-label={`Capacidades de ${service.title}`}>
                    {service.capabilities.map((capability) => <li key={capability}>{capability}</li>)}
                  </ul>
                  <Link href={service.href} className="service-directory-link">
                    <span>{service.action}</span>
                    {service.id === "web" ? <ArrowRight size={18} aria-hidden="true" /> : <ArrowUpRight size={18} aria-hidden="true" />}
                  </Link>
                </div>
                <div className="service-directory-visual">
                  <span className="service-visual-caption">{service.signal}</span>
                  <ServiceVisualGraphic type={service.id} />
                  <span className="service-visual-code">TA / {service.number} — {service.id.toUpperCase()}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="services-needs">
        <div className="container-shell">
          <header className="services-needs-heading" data-service-reveal>
            <p>NO HACE FALTA SABER QUÉ PEDIR</p>
            <h2>Empieza por contar qué está fallando.</h2>
          </header>
          <div className="services-needs-grid">
            {needMap.map(([problem, service, number]) => (
              <div className="services-need-row" key={problem} data-service-reveal>
                <span>{number}</span>
                <p>{problem}</p>
                <i aria-hidden="true" />
                <strong>{service}</strong>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="services-principles">
        <div className="container-shell services-principles-layout">
          <header data-service-reveal>
            <p>CRITERIO COMPARTIDO</p>
            <h2>La forma cambia.<br />La exigencia no.</h2>
            <span>Todo proyecto debe superar las mismas tres preguntas antes de ponerse en marcha.</span>
          </header>
          <div className="services-principles-list">
            {principles.map((principle) => (
              <article key={principle.number} data-service-reveal>
                <span>{principle.number}</span>
                <div>
                  <h3>{principle.title}</h3>
                  <p>{principle.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="services-hub-cta">
        <div className="container-shell services-hub-cta-inner" data-service-reveal>
          <div>
            <p>PRIMERA HORA DE CONSULTORÍA / SIN COSTE</p>
            <h2>Si el problema todavía no tiene nombre, empecemos por ordenarlo.</h2>
          </div>
          <div>
            <p>Revisamos el contexto de tu empresa, detectamos una primera línea razonable y te decimos con claridad si podemos aportar valor.</p>
            <Link href="/#contacto">
              Hablar de vuestro caso
              <ArrowUpRight size={18} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
