"use client";

import { createTimeline } from "animejs/timeline";
import { stagger } from "animejs/utils";
import { useEffect, useRef } from "react";
import { ExperiencePreview } from "@/components/experience-preview";

const projects = [
  {
    number: "01",
    demoHref: "https://portfoliopersonal-nu.vercel.app/",
    title: "Una web que demuestra el nivel antes de explicarlo.",
    summary:
      "Una experiencia donde dirección visual, narrativa y desarrollo frontend trabajan como una única pieza.",
    capabilities: ["Dirección visual", "Motion UI", "Frontend"],
    label: "EXPERIENCIA DIGITAL",
    browserTitle: "Portfolio interactivo de Adrián García",
    iframeTitle: "Portfolio interactivo de Adrián García",
    action: "Explorar proyecto",
    visual: "web" as const,
  },
  {
    number: "02",
    demoHref: "https://azoragestion.vercel.app/",
    title: "Actividad dispersa convertida en una herramienta visible.",
    summary:
      "Dashboard, bandeja, oportunidades y seguimiento reunidos en un sistema diseñado alrededor del trabajo diario.",
    capabilities: ["CRM comercial", "Flujos operativos", "Seguimiento"],
    label: "SISTEMA OPERATIVO",
    browserTitle: "Demo de la herramienta de gestión comercial",
    iframeTitle: "Demo interactiva de la herramienta de gestión comercial",
    action: "Probar herramienta",
    visual: "crm" as const,
  },
] as const;

export function ToolShowcase() {
  const sectionRef = useRef<HTMLElement>(null);

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
          defaults: { ease: "out(4)" },
          onComplete: () => section.classList.add("is-revealed"),
        })
          .add(section.querySelectorAll("[data-tool-heading]"), {
            opacity: [0, 1],
            translateY: [30, 0],
            duration: 960,
            delay: stagger(90),
          })
          .add(
            section.querySelectorAll("[data-tool-project]"),
            {
              opacity: [0, 1],
              translateY: [56, 0],
              duration: 1150,
              delay: stagger(170),
            },
            "-=520",
          )
          .add(
            section.querySelectorAll("[data-tool-detail]"),
            {
              opacity: [0, 1],
              translateX: [-16, 0],
              duration: 760,
              delay: stagger(65),
            },
            "-=880",
          )
          .add(
            section.querySelectorAll("[data-tool-rule]"),
            {
              scaleX: [0, 1],
              duration: 820,
              delay: stagger(100),
            },
            "-=900",
          );

        observer.disconnect();
      },
      { threshold: 0.1 },
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
      id="soluciones"
      className="tool-studio"
      aria-labelledby="tool-studio-title"
    >
      <div className="tool-studio-grid" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <div className="tool-studio-ambient" aria-hidden="true">
        <span />
        <span />
      </div>
      <span className="tool-studio-wordmark" aria-hidden="true">
        CAPABILITY
      </span>

      <div className="container-shell tool-studio-inner">
        <header className="tool-studio-header">
          <div className="tool-studio-meta" data-tool-heading>
            <span>03 / TRABAJO REAL</span>
            <i data-tool-rule aria-hidden="true" />
            <span>PRODUCTOS EN FUNCIONAMIENTO</span>
          </div>

          <div className="tool-studio-intro">
            <h2 id="tool-studio-title" data-tool-heading>
              No te lo contamos.
              <strong>Te lo enseñamos.</strong>
            </h2>
            <div className="tool-studio-intro-note" data-tool-heading>
              <span>02 / PRODUCTOS ACTIVOS</span>
              <p>
                Dos productos reales. Dos maneras de convertir una necesidad en algo que se puede utilizar.
              </p>
              <div aria-hidden="true">
                <i />
                <span>EXPLORA LOS PROYECTOS</span>
              </div>
            </div>
          </div>
        </header>

        <div className="tool-studio-projects">
          {projects.map((project, index) => (
            <div
              key={project.number}
              className="tool-studio-project"
              data-tool-project
            >
              <div className="tool-studio-project-rule" aria-hidden="true">
                <span>{project.number}</span>
                <i data-tool-rule />
                <span>{project.label}</span>
              </div>

              <div data-tool-detail>
                <ExperiencePreview
                  reverse={index === 1}
                  demoHref={project.demoHref}
                  title={project.title}
                  summary={project.summary}
                  tags={[...project.capabilities]}
                  exampleLabel={`${project.number} / ${project.label}`}
                  browserTitle={project.browserTitle}
                  iframeTitle={project.iframeTitle}
                  actionLabel={project.action}
                  visual={project.visual}
                />
              </div>
            </div>
          ))}
        </div>

        <footer className="tool-studio-footer" data-tool-heading>
          <span>DISEÑO</span>
          <i data-tool-rule aria-hidden="true" />
          <span>DESARROLLO</span>
          <i data-tool-rule aria-hidden="true" />
          <span>OPERATIVA</span>
        </footer>
      </div>

      <div className="tool-studio-signal" aria-hidden="true">
        <span>03</span>
        <i />
        <span>TEMIS ΛTRILE / DIGITAL SYSTEMS</span>
      </div>
    </section>
  );
}
