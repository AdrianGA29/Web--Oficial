import type { Metadata } from "next";
import { ServiceDetailShowcase } from "@/components/service-detail-showcase";
import { serviceDetails } from "@/lib/service-details";
import { siteConfig } from "@/lib/config";

const service = serviceDetails.ai;

export const metadata: Metadata = {
  title: "Inteligencia artificial aplicada a empresas",
  description:
    "Consultoría, pruebas de concepto e implantación responsable de inteligencia artificial para empresas de toda España.",
  alternates: { canonical: "/servicios/inteligencia-artificial" },
  openGraph: {
    title: `Inteligencia artificial aplicada a empresas | ${siteConfig.name}`,
    description: service.lead,
    url: "/servicios/inteligencia-artificial",
  },
};

export default function ArtificialIntelligencePage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Inteligencia artificial aplicada a empresas",
    serviceType: "Consultoría e implantación de inteligencia artificial",
    provider: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
    areaServed: { "@type": "Country", name: "España" },
    url: `${siteConfig.url}/servicios/inteligencia-artificial`,
    description: service.lead,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <ServiceDetailShowcase service={service} />
    </>
  );
}

