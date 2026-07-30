"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, Check, X } from "lucide-react";
import { ExperiencePreview } from "@/components/experience-preview";

const outcomes = [
  {
    number: "01",
    title: "Tu propuesta se entiende sin buscarla",
    text: "El visitante identifica pronto qué haces, para quién y por qué merece la pena seguir leyendo.",
  },
  {
    number: "02",
    title: "La forma responde a tu marca",
    text: "La narrativa y la interfaz se construyen alrededor del negocio, sin obligar al mensaje a caber en una plantilla genérica.",
  },
  {
    number: "03",
    title: "El móvil forma parte del diseño",
    text: "Lectura, rendimiento y acciones se plantean desde el inicio para una experiencia sólida en cualquier pantalla.",
  },
  {
    number: "04",
    title: "Cada consulta conserva el contexto",
    text: "Los puntos de contacto pueden recoger el origen, la necesidad y el siguiente paso sin terminar en un correo difícil de seguir.",
  },
] as const;

const comparison = [
  ["El visitante tarda en descubrir a qué os dedicáis.", "La propuesta de valor aparece pronto y dirige el recorrido."],
  ["La plantilla obliga a encajar el mensaje en bloques genéricos.", "La narrativa acompaña cómo el cliente comprende y decide."],
  ["El formulario envía un correo sin contexto ni continuidad.", "La consulta conserva origen, intención y siguiente acción."],
  ["Cada nuevo servicio obliga a rehacer la estructura.", "La base modular permite crecer sin perder coherencia."],
] as const;

const solutions = [
  {
    number: "01",
    title: "Web corporativa",
    text: "Una presencia digital clara, creíble y preparada para explicar la empresa, sus servicios y su forma de trabajar.",
    detail: "MARCA / CONTENIDO / CONVERSIÓN",
  },
  {
    number: "02",
    title: "Landing page",
    text: "Una página enfocada en una campaña, servicio o validación, con un recorrido directo hacia una acción concreta.",
    detail: "CAMPAÑA / CAPTACIÓN / VALIDACIÓN",
  },
  {
    number: "03",
    title: "Comercio electrónico",
    text: "Catálogo, compra y gestión diseñados alrededor del producto y del proceso real, sin añadir fricción innecesaria.",
    detail: "CATÁLOGO / COMPRA / OPERATIVA",
  },
  {
    number: "04",
    title: "Producto digital",
    text: "Interfaces, áreas privadas o experiencias interactivas donde el diseño y la lógica del sistema avanzan juntos.",
    detail: "INTERFAZ / SISTEMA / EXPERIENCIA",
  },
] as const;

const process = [
  ["01", "Entender", "Negocio, audiencia, propuesta y objetivo real de la web."],
  ["02", "Ordenar", "Arquitectura, prioridades y recorrido antes de diseñar pantallas."],
  ["03", "Diseñar", "Dirección visual, prototipo y sistema de componentes responsive."],
  ["04", "Construir", "Desarrollo, contenidos, pruebas, rendimiento y publicación."],
] as const;

function WebHeroSystem() {
  return (
    <div className="web-hero-system" aria-hidden="true">
      <div className="web-system-grid" />
      <svg viewBox="0 0 760 600">
        <defs>
          <linearGradient id="web-hero-line" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#f5f5f5" stopOpacity=".06" />
            <stop offset=".55" stopColor="#9b90ff" stopOpacity=".9" />
            <stop offset="1" stopColor="#f5f5f5" stopOpacity=".16" />
          </linearGradient>
        </defs>
        <rect className="web-system-browser" x="88" y="78" width="520" height="358" rx="18" />
        <path className="web-system-rule" d="M88 130h520M410 130v306" />
        <circle className="web-system-dot" cx="116" cy="104" r="4" />
        <circle className="web-system-dot" cx="132" cy="104" r="4" />
        <circle className="web-system-dot" cx="148" cy="104" r="4" />
        <rect className="web-system-copy" x="126" y="178" width="198" height="12" rx="6" />
        <rect className="web-system-title" x="126" y="212" width="238" height="52" rx="8" />
        <rect className="web-system-copy" x="126" y="290" width="206" height="7" rx="3.5" />
        <rect className="web-system-copy" x="126" y="307" width="166" height="7" rx="3.5" />
        <rect className="web-system-button" x="126" y="342" width="92" height="28" rx="14" />
        <circle className="web-system-orbit" cx="505" cy="269" r="76" />
        <circle className="web-system-orbit is-inner" cx="505" cy="269" r="43" />
        <path className="web-system-figure" d="M458 294c28-59 42-87 91-80-11 17-11 35 1 51-15 32-43 45-92 29Z" />
        <path className="web-system-route" d="M40 500h118c55 0 75-36 91-91M720 70h-80c-52 0-70 30-83 74" />
        <circle className="web-system-node" cx="249" cy="409" r="6" />
        <circle className="web-system-node" cx="557" cy="144" r="6" />
        <rect className="web-system-mobile" x="532" y="340" width="116" height="174" rx="18" />
        <path className="web-system-rule" d="M550 376h80M550 395h54M550 427h80M550 445h63M550 478h46" />
        <path className="web-system-scan" d="M102 158h490" />
      </svg>
      <span className="web-system-label is-message">MENSAJE / 01</span>
      <span className="web-system-label is-ui">INTERFAZ / 02</span>
      <span className="web-system-label is-performance">RENDIMIENTO / 03</span>
      <div className="web-system-state"><span /> SYSTEM / RESPONSIVE</div>
    </div>
  );
}

function SolutionGraphic({ index }: { index: number }) {
  if (index === 0) {
    return (
      <svg viewBox="0 0 180 95" aria-hidden="true">
        <rect x="8" y="8" width="164" height="79" rx="7" />
        <path d="M8 27h164M24 43h61M24 55h93M24 68h42" />
        <circle cx="22" cy="18" r="2" /><circle cx="30" cy="18" r="2" />
      </svg>
    );
  }
  if (index === 1) {
    return (
      <svg viewBox="0 0 180 95" aria-hidden="true">
        <path d="M15 76h150M32 67V30h54v37M101 67V17h47v50" />
        <path className="is-accent" d="M39 39h39M39 49h27M109 29h31M109 39h23" />
        <circle cx="92" cy="67" r="5" />
      </svg>
    );
  }
  if (index === 2) {
    return (
      <svg viewBox="0 0 180 95" aria-hidden="true">
        <rect x="14" y="13" width="66" height="67" rx="6" />
        <rect x="100" y="13" width="66" height="30" rx="6" />
        <rect x="100" y="50" width="66" height="30" rx="6" />
        <path className="is-accent" d="M27 30h39M27 41h26M113 27h39M113 64h29" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 180 95" aria-hidden="true">
      <rect x="12" y="14" width="156" height="67" rx="8" />
      <path d="M12 32h156M53 32v49M127 32v49" />
      <circle className="is-accent-fill" cx="90" cy="56" r="13" />
      <path className="is-light" d="M84 56l5 5 9-12M21 23h2M28 23h2" />
    </svg>
  );
}

export function WebServiceShowcase() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    root.classList.add("is-reveal-ready");
    const items = Array.from(root.querySelectorAll<HTMLElement>("[data-web-reveal]"));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          (entry.target as HTMLElement).classList.add("is-revealed");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.13, rootMargin: "0px 0px -8% 0px" },
    );
    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={rootRef} className="web-service-page">
      <section className="web-service-hero">
        <div className="container-shell web-service-hero-inner">
          <div className="web-service-hero-copy" data-web-reveal>
            <Link href="/servicios" className="services-back-link">
              <ArrowLeft size={15} aria-hidden="true" />
              VOLVER A SERVICIOS
            </Link>
            <div className="web-service-meta">
              <span>01 / DESARROLLO WEB</span>
              <span>DISEÑO + TECNOLOGÍA</span>
            </div>
            <h1>Una web que explica tu valor <span>antes de que tengas que hacerlo tú.</span></h1>
            <p>
              Diseñamos webs corporativas, tiendas online y productos digitales que convierten una visita dispersa en un recorrido claro: entender, confiar y dar el siguiente paso.
            </p>
            <div className="web-service-hero-actions">
              <Link href="/#contacto">Hablar de tu web <ArrowUpRight size={18} aria-hidden="true" /></Link>
              <a href="#resultado">Ver qué cambia <ArrowDown size={17} aria-hidden="true" /></a>
            </div>
          </div>
          <WebHeroSystem />
        </div>
        <div className="web-service-hero-rail" aria-hidden="true">
          <span>MENSAJE CLARO</span><i /><span>EXPERIENCIA RESPONSIVE</span><i /><span>BASE ESCALABLE</span>
        </div>
      </section>

      <section id="resultado" className="web-outcomes">
        <div className="container-shell">
          <header className="web-outcomes-heading" data-web-reveal>
            <p>NO SE TRATA DE ESTAR EN INTERNET</p>
            <h2>Se trata de que tu web trabaje contigo.</h2>
            <span>Una buena web no añade ruido a la marca. Ordena el mensaje, reduce dudas y facilita el siguiente paso.</span>
          </header>
          <div className="web-outcomes-grid">
            {outcomes.map((outcome) => (
              <article key={outcome.number} data-web-reveal>
                <span>{outcome.number}</span>
                <div className="web-outcome-mark" aria-hidden="true"><i /><i /><i /></div>
                <h3>{outcome.title}</h3>
                <p>{outcome.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="web-comparison">
        <div className="container-shell web-comparison-layout">
          <header data-web-reveal>
            <p>ANTES / DESPUÉS</p>
            <h2>Lo que cuesta una web que solo cumple.</h2>
            <span>El problema rara vez es una sola pantalla. Suele estar en la relación entre mensaje, estructura, interfaz y continuidad.</span>
          </header>
          <div className="web-comparison-table">
            <div className="web-comparison-labels" aria-hidden="true">
              <span>SIN SISTEMA</span>
              <span>CON CRITERIO</span>
            </div>
            {comparison.map(([before, after], index) => (
              <div className="web-comparison-row" key={before} data-web-reveal>
                <span className="web-comparison-index">0{index + 1}</span>
                <p><X size={15} aria-hidden="true" />{before}</p>
                <i aria-hidden="true"><ArrowRight size={16} /></i>
                <p><Check size={15} aria-hidden="true" />{after}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="web-solutions">
        <div className="container-shell">
          <header className="web-solutions-heading" data-web-reveal>
            <p>FORMAS QUE PUEDE TOMAR</p>
            <div>
              <h2>La solución depende de lo que la web tiene que conseguir.</h2>
              <span>No partimos de un formato cerrado. Elegimos la arquitectura adecuada para el objetivo, el contenido y la operativa que existe detrás.</span>
            </div>
          </header>
          <div className="web-solutions-grid">
            {solutions.map((solution, index) => (
              <article key={solution.number} data-web-reveal>
                <div className="web-solution-top">
                  <span>{solution.number}</span>
                  <p>{solution.detail}</p>
                </div>
                <div className="web-solution-graphic"><SolutionGraphic index={index} /></div>
                <h3>{solution.title}</h3>
                <p>{solution.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="web-proof">
        <div className="container-shell">
          <header className="web-proof-heading" data-web-reveal>
            <p>NO SOLO TE LO CONTAMOS</p>
            <div>
              <h2>Una experiencia que demuestra el nivel antes de explicarlo.</h2>
              <span>Este portfolio reúne dirección visual, narrativa, movimiento y desarrollo frontend en una pieza que puedes explorar sin salir de la página.</span>
            </div>
          </header>
          <div className="web-proof-stage" data-web-reveal>
            <ExperiencePreview
              demoHref="https://portfoliopersonal-nu.vercel.app/"
              title="Portfolio interactivo de Adrián García"
              summary="Un producto digital donde concepto visual, sistema de interacción y ejecución técnica funcionan como una sola experiencia."
              tags={["Dirección visual", "Motion UI", "Frontend", "Experiencia responsive"]}
              exampleLabel="01 · Portfolio"
              browserTitle="Portfolio · Adrián García"
              iframeTitle="Vista interactiva del portfolio de Adrián García"
              actionLabel="Explorar proyecto"
            />
          </div>
        </div>
      </section>

      <section className="web-process">
        <div className="container-shell web-process-layout">
          <header data-web-reveal>
            <p>DESARROLLO / 04 ETAPAS</p>
            <h2>Primero ordenamos. Después diseñamos. Solo entonces construimos.</h2>
            <span>Cada etapa deja una decisión verificable. Así evitamos descubrir demasiado tarde que una web bonita no estaba resolviendo el problema correcto.</span>
          </header>
          <ol className="web-process-list">
            {process.map(([number, title, text]) => (
              <li key={number} data-web-reveal>
                <span>{number}</span>
                <div><h3>{title}</h3><p>{text}</p></div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="web-service-cta">
        <div className="container-shell web-service-cta-inner" data-web-reveal>
          <div>
            <p>PRIMERA HORA DE CONSULTORÍA / GRATUITA Y SIN COMPROMISO</p>
            <h2>¿Tu web representa de verdad lo que sabes hacer?</h2>
          </div>
          <div>
            <p>Cuéntanos qué debería conseguir, qué no está funcionando ahora y qué papel tiene dentro del negocio. Te ayudaremos a definir un primer alcance razonable.</p>
            <Link href="/#contacto">Revisar vuestro caso <ArrowUpRight size={18} aria-hidden="true" /></Link>
          </div>
        </div>
      </section>

      <nav className="web-service-next" aria-label="Navegación entre servicios">
        <div className="container-shell">
          <span>SIGUIENTE CAPACIDAD</span>
          <Link href="/#contacto">
            <div><small>02 / FLUJOS E INTEGRACIONES</small><strong>Automatización</strong></div>
            <ArrowRight size={28} aria-hidden="true" />
          </Link>
        </div>
      </nav>
    </div>
  );
}

