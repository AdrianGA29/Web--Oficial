import type { Metadata } from "next";
import { ServiceDetailShowcase } from "@/components/service-detail-showcase";
import { serviceDetails } from "@/lib/service-details";
import { siteConfig } from "@/lib/config";
import { breadcrumbSchema, jsonLd, serviceSchema, socialImage } from "@/lib/seo";

const service = serviceDetails.automation;

export const metadata: Metadata = {
  title: "Automatización de procesos e integraciones",
  description:
    "Automatización de tareas, integraciones entre herramientas, documentos, avisos y seguimiento para empresas de toda España.",
  alternates: { canonical: "/servicios/automatizacion/" },
  openGraph: {
    title: `Automatización de procesos e integraciones | ${siteConfig.name}`,
    description: service.lead,
    url: "/servicios/automatizacion/",
    images: [socialImage],
  },
};

export default function AutomationPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      serviceSchema({
        name: "Automatización de procesos e integraciones",
        serviceType: "Automatización de procesos empresariales",
        path: "/servicios/automatizacion/",
        description: service.lead,
      }),
      breadcrumbSchema([
        { name: "Inicio", path: "/" },
        { name: "Servicios", path: "/servicios/" },
        { name: "Automatización", path: "/servicios/automatizacion/" },
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
