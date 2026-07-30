import Image from "next/image";
import gestionDashboardPreview from "@/assets/images/gestion-dashboard-preview.webp";
import portfolioHeroPreview from "@/assets/images/portfolio-hero-preview.png";

const frames = {
  web: {
    image: portfolioHeroPreview,
    alt: "Vista previa del portfolio interactivo de Adrián García",
    name: "PORTFOLIO INTERACTIVO",
    type: "EXPERIENCIA WEB",
    status: "ONLINE",
    number: "01",
    metric: "60 FPS",
    coordinate: "40.4168° N",
    position: "object-center",
  },
  crm: {
    image: gestionDashboardPreview,
    alt: "Vista previa de la herramienta de gestión comercial",
    name: "GESTIÓN COMERCIAL",
    type: "SISTEMA OPERATIVO",
    status: "DEMO ACTIVA",
    number: "02",
    metric: "LIVE DATA",
    coordinate: "03.7038° W",
    position: "object-top",
  },
} as const;

export function ToolProductFrame({ type }: { type: "web" | "crm" }) {
  const frame = frames[type];

  return (
    <div className="tool-product-frame">
      <span className="tool-product-frame-glow" aria-hidden="true" />
      <span className="tool-product-frame-depth" aria-hidden="true" />

      <div className="tool-product-frame-top">
        <span className="tool-product-frame-identity">
          <b>{frame.number}</b>
          {frame.name}
        </span>
        <span className="tool-product-frame-path">{frame.type} / TEMIS ΛTRILE</span>
      </div>

      <div className="tool-product-frame-media">
        <Image
          src={frame.image}
          alt={frame.alt}
          fill
          sizes="(min-width: 1100px) 58vw, 100vw"
          className={`object-cover ${frame.position}`}
        />
        <div className="tool-product-frame-grid" aria-hidden="true" />
        <div className="tool-product-frame-scan" aria-hidden="true" />
        <div className="tool-product-frame-reticle" aria-hidden="true">
          <span />
          <span />
        </div>
        <span className="tool-product-frame-coordinate" aria-hidden="true">
          {frame.coordinate}
        </span>
        <div className="tool-product-frame-telemetry" aria-hidden="true">
          <span>VISUAL SYSTEM</span>
          <i />
          <span>{frame.metric}</span>
        </div>
      </div>

      <div className="tool-product-frame-bottom">
        <span>
          <i aria-hidden="true" />
          {frame.status}
        </span>
        <span>INTERACTIVE PREVIEW / {frame.number}</span>
      </div>

      <span className="tool-product-frame-corner" aria-hidden="true" />
      <span className="tool-product-frame-corner is-bottom" aria-hidden="true" />
    </div>
  );
}
