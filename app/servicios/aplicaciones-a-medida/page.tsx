import type { Metadata } from "next";
import { ServiceDetailShowcase } from "@/components/service-detail-showcase";
import { serviceDetails } from "@/lib/service-details";
import { siteConfig } from "@/lib/config";
import { breadcrumbSchema, jsonLd, serviceSchema, socialImage } from "@/lib/seo";

const service = serviceDetails.apps;

export const metadata: Metadata = {
  title: "Aplicaciones y software a medida para empresas",
  description:
    "Aplicaciones internas, paneles operativos, herramientas de gestión y software a medida para empresas de toda España.",
  alternates: { canonical: "/servicios/aplicaciones-a-medida/" },
  openGraph: {
    title: `Aplicaciones y software a medida | ${siteConfig.name}`,
    description: service.lead,
    url: "/servicios/aplicaciones-a-medida/",
    images: [socialImage],
  },
};

export default function CustomApplicationsPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      serviceSchema({
        name: "Aplicaciones y software a medida para empresas",
        serviceType: "Desarrollo de software a medida",
        path: "/servicios/aplicaciones-a-medida/",
        description: service.lead,
      }),
      breadcrumbSchema([
        { name: "Inicio", path: "/" },
        { name: "Servicios", path: "/servicios/" },
        { name: "Aplicaciones a medida", path: "/servicios/aplicaciones-a-medida/" },
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
