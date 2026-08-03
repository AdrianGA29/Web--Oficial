import type { Metadata } from "next";
import { WebServiceShowcase } from "@/components/web-service-showcase";
import { siteConfig } from "@/lib/config";
import { breadcrumbSchema, jsonLd, serviceSchema, socialImage } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Desarrollo web para empresas",
  description:
    "Diseño y desarrollo de webs corporativas, landing pages, comercio electrónico y productos digitales para empresas de toda España.",
  alternates: { canonical: "/servicios/desarrollo-web/" },
  openGraph: {
    title: `Desarrollo web para empresas | ${siteConfig.name}`,
    description:
      "Webs corporativas, tiendas online y productos digitales donde mensaje, experiencia y tecnología trabajan como una sola pieza.",
    url: "/servicios/desarrollo-web/",
    images: [socialImage],
  },
};

export default function WebDevelopmentPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      serviceSchema({
        name: "Desarrollo web para empresas",
        serviceType: "Diseño y desarrollo web",
        path: "/servicios/desarrollo-web/",
        description:
          "Diseño y desarrollo de webs corporativas, landing pages, comercio electrónico y productos digitales.",
      }),
      breadcrumbSchema([
        { name: "Inicio", path: "/" },
        { name: "Servicios", path: "/servicios/" },
        { name: "Desarrollo web", path: "/servicios/desarrollo-web/" },
      ]),
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(structuredData) }}
      />
      <WebServiceShowcase />
    </>
  );
}
