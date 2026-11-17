import type { Metadata } from "next";
import { WebServiceShowcase } from "@/components/web-service-showcase";
import { siteConfig } from "@/lib/config";
import { breadcrumbSchema, jsonLd, serviceSchema, socialImage } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Diseño y desarrollo web en Toledo",
  description:
    "Diseño y desarrollo de webs corporativas y tiendas online para empresas de Toledo. Atención presencial en la provincia y proyectos en toda España.",
  alternates: { canonical: "/servicios/desarrollo-web/" },
  openGraph: {
    title: `Diseño y desarrollo web en Toledo | ${siteConfig.name}`,
    description:
      "Diseño y desarrollo de webs corporativas y tiendas online para empresas de Toledo. Atención presencial en la provincia y proyectos en toda España.",
    url: "/servicios/desarrollo-web/",
    images: [socialImage],
  },
  twitter: {
    card: "summary_large_image",
    title: `Diseño y desarrollo web en Toledo | ${siteConfig.name}`,
    description: "Diseño y desarrollo de webs corporativas y tiendas online para empresas de Toledo. Atención presencial en la provincia y proyectos en toda España.",
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
