import type { Metadata } from "next";
import { ServiceDetailShowcase } from "@/components/service-detail-showcase";
import { serviceDetails } from "@/lib/service-details";
import { siteConfig } from "@/lib/config";
import { breadcrumbSchema, jsonLd, serviceSchema, socialImage } from "@/lib/seo";

const service = serviceDetails.ai;

export const metadata: Metadata = {
  title: "Inteligencia artificial aplicada a empresas",
  description:
    "Consultoría, pruebas de concepto e implantación responsable de inteligencia artificial para empresas de toda España.",
  alternates: { canonical: "/servicios/inteligencia-artificial/" },
  openGraph: {
    title: `Inteligencia artificial aplicada a empresas | ${siteConfig.name}`,
    description: service.lead,
    url: "/servicios/inteligencia-artificial/",
    images: [socialImage],
  },
};

export default function ArtificialIntelligencePage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      serviceSchema({
        name: "Inteligencia artificial aplicada a empresas",
        serviceType: "Consultoría e implantación de inteligencia artificial",
        path: "/servicios/inteligencia-artificial/",
        description: service.lead,
      }),
      breadcrumbSchema([
        { name: "Inicio", path: "/" },
        { name: "Servicios", path: "/servicios/" },
        { name: "Inteligencia artificial", path: "/servicios/inteligencia-artificial/" },
      ]),
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(structuredData) }} />
      <ServiceDetailShowcase service={service} />
    </>
  );
}
