import type { Metadata } from "next";
import { WebServiceShowcase } from "@/components/web-service-showcase";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: "Desarrollo web para empresas",
  description:
    "Diseño y desarrollo de webs corporativas, landing pages, comercio electrónico y productos digitales para empresas de toda España.",
  alternates: { canonical: "/servicios/desarrollo-web" },
  openGraph: {
    title: `Desarrollo web para empresas | ${siteConfig.name}`,
    description:
      "Webs corporativas, tiendas online y productos digitales donde mensaje, experiencia y tecnología trabajan como una sola pieza.",
    url: "/servicios/desarrollo-web",
  },
};

export default function WebDevelopmentPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Desarrollo web para empresas",
    serviceType: "Diseño y desarrollo web",
    provider: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    areaServed: {
      "@type": "Country",
      name: "España",
    },
    url: `${siteConfig.url}/servicios/desarrollo-web`,
    description:
      "Diseño y desarrollo de webs corporativas, landing pages, comercio electrónico y productos digitales.",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <WebServiceShowcase />
    </>
  );
}

