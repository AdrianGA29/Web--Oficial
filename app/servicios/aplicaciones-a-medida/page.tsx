import type { Metadata } from "next";
import { ServiceDetailShowcase } from "@/components/service-detail-showcase";
import { serviceDetails } from "@/lib/service-details";
import { siteConfig } from "@/lib/config";

const service = serviceDetails.apps;

export const metadata: Metadata = {
  title: "Aplicaciones y software a medida para empresas",
  description:
    "Aplicaciones internas, paneles operativos, herramientas de gestión y software a medida para empresas de toda España.",
  alternates: { canonical: "/servicios/aplicaciones-a-medida" },
  openGraph: {
    title: `Aplicaciones y software a medida | ${siteConfig.name}`,
    description: service.lead,
    url: "/servicios/aplicaciones-a-medida",
  },
};

export default function CustomApplicationsPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Aplicaciones y software a medida para empresas",
    serviceType: "Desarrollo de software a medida",
    provider: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
    areaServed: { "@type": "Country", name: "España" },
    url: `${siteConfig.url}/servicios/aplicaciones-a-medida`,
    description: service.lead,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <ServiceDetailShowcase service={service} />
    </>
  );
}

