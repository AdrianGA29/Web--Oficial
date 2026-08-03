import type { Metadata } from "next";
import { ServicesHub } from "@/components/services-hub";
import { absoluteUrl, breadcrumbSchema, jsonLd, organizationId, socialImage } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Servicios de desarrollo, automatización e IA",
  description:
    "Desarrollo web, automatización, aplicaciones a medida y consultoría de inteligencia artificial para empresas de toda España.",
  alternates: { canonical: "/servicios/" },
  openGraph: { url: "/servicios/", images: [socialImage] },
};

export default function ServicesPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${absoluteUrl("/servicios/")}#webpage`,
        url: absoluteUrl("/servicios/"),
        name: "Servicios de Temis Atrile",
        description: metadata.description,
        about: { "@id": organizationId },
        inLanguage: "es-ES",
      },
      breadcrumbSchema([
        { name: "Inicio", path: "/" },
        { name: "Servicios", path: "/servicios/" },
      ]),
    ],
  };

  return (
    <>
      <ServicesHub />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(structuredData) }} />
    </>
  );
}
