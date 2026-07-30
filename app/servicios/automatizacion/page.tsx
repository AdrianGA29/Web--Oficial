import type { Metadata } from "next";
import { ServiceDetailShowcase } from "@/components/service-detail-showcase";
import { serviceDetails } from "@/lib/service-details";
import { siteConfig } from "@/lib/config";

const service = serviceDetails.automation;

export const metadata: Metadata = {
  title: "Automatización de procesos e integraciones",
  description:
    "Automatización de tareas, integraciones entre herramientas, documentos, avisos y seguimiento para empresas de toda España.",
  alternates: { canonical: "/servicios/automatizacion" },
  openGraph: {
    title: `Automatización de procesos e integraciones | ${siteConfig.name}`,
    description: service.lead,
    url: "/servicios/automatizacion",
  },
};

export default function AutomationPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Automatización de procesos e integraciones",
    serviceType: "Automatización de procesos empresariales",
    provider: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
    areaServed: { "@type": "Country", name: "España" },
    url: `${siteConfig.url}/servicios/automatizacion`,
    description: service.lead,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <ServiceDetailShowcase service={service} />
    </>
  );
}

