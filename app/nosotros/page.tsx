import type { Metadata } from "next";
import "../about.css";
import { AboutShowcase } from "@/components/about-showcase";
import { absoluteUrl, breadcrumbSchema, jsonLd, organizationId, socialImage } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Sobre nosotros: consultoría y tecnología en Toledo",
  description:
    "Conoce Temis Atrile, firma establecida en Toledo que combina estrategia empresarial, criterio jurídico y tecnología. Atención presencial y proyectos en toda España.",
  alternates: { canonical: "/nosotros/" },
  openGraph: {
    title: "Sobre nosotros: consultoría y tecnología en Toledo | Temis Atrile",
    description: "Conoce Temis Atrile, firma establecida en Toledo que combina estrategia empresarial, criterio jurídico y tecnología. Atención presencial y proyectos en toda España.",
    url: "/nosotros/", images: [socialImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sobre nosotros: consultoría y tecnología en Toledo | Temis Atrile",
    description: "Conoce Temis Atrile, firma establecida en Toledo que combina estrategia empresarial, criterio jurídico y tecnología. Atención presencial y proyectos en toda España.",
    images: [socialImage],
  },
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
