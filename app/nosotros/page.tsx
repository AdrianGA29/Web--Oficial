import type { Metadata } from "next";
import { AboutShowcase } from "@/components/about-showcase";
import { absoluteUrl, breadcrumbSchema, jsonLd, organizationId, socialImage } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Nosotros",
  description:
    "Conoce Temis Atrile: estrategia empresarial, criterio jurídico y desarrollo tecnológico unidos para transformar empresas con soluciones viables.",
  alternates: { canonical: "/nosotros/" },
  openGraph: { url: "/nosotros/", images: [socialImage] },
};

export default function AboutPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "AboutPage",
        "@id": `${absoluteUrl("/nosotros/")}#webpage`,
        url: absoluteUrl("/nosotros/"),
        name: "Sobre Temis Atrile",
        description: metadata.description,
        about: { "@id": organizationId },
        inLanguage: "es-ES",
      },
      breadcrumbSchema([
        { name: "Inicio", path: "/" },
        { name: "Nosotros", path: "/nosotros/" },
      ]),
    ],
  };

  return (
    <>
      <AboutShowcase />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(structuredData) }} />
    </>
  );
}
