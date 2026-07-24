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
    position: "object-center",
  },
  crm: {
    image: gestionDashboardPreview,
    alt: "Vista previa de la herramienta de gestión comercial",
    name: "GESTIÓN COMERCIAL",
    type: "SISTEMA OPERATIVO",
    status: "DEMO ACTIVA",
    number: "02",
    position: "object-top",
  },
} as const;

export function ToolProductFrame({ type }: { type: "web" | "crm" }) {
  const frame = frames[type];

  return (
    <div className="tool-product-frame">
      <div className="tool-product-frame-top">
        <span>{frame.name}</span>
        <i aria-hidden="true" />
        <span>{frame.type}</span>
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
      </div>

      <div className="tool-product-frame-bottom">
        <span>
          <i aria-hidden="true" />
          {frame.status}
        </span>
        <span>PREVIEW / {frame.number}</span>
      </div>

      <span className="tool-product-frame-corner" aria-hidden="true" />
    </div>
  );
}
