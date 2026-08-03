import { siteConfig } from "@/lib/config";

const baseUrl = siteConfig.url.replace(/\/$/, "");

export const socialImage = {
  url: "/og/social.jpg",
  width: 1690,
  height: 931,
  alt: "Temis Atrile, consultoría estratégica y tecnológica",
};

export const organizationId = `${baseUrl}/#organization`;
export const websiteId = `${baseUrl}/#website`;

export const organizationReference = {
  "@type": "Organization",
  "@id": organizationId,
  name: siteConfig.name,
  alternateName: siteConfig.alternateName,
  url: `${baseUrl}/`,
};

export const organizationSchema = {
  ...organizationReference,
  email: siteConfig.email,
  areaServed: {
    "@type": "Country",
    name: "España",
  },
  knowsAbout: [
    "Transformación digital",
    "Automatización de procesos",
    "Desarrollo web",
    "Aplicaciones a medida",
    "Inteligencia artificial aplicada",
    "Consultoría tecnológica",
  ],
};

export const websiteSchema = {
  "@type": "WebSite",
  "@id": websiteId,
  url: `${baseUrl}/`,
  name: siteConfig.name,
  alternateName: siteConfig.alternateName,
  publisher: { "@id": organizationId },
  inLanguage: "es-ES",
};

export function absoluteUrl(path = "/") {
  return `${baseUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

export function breadcrumbSchema(
  items: ReadonlyArray<{ name: string; path: string }>,
) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function serviceSchema({
  name,
  serviceType,
  description,
  path,
}: {
  name: string;
  serviceType: string;
  description: string;
  path: string;
}) {
  const url = absoluteUrl(path);

  return {
    "@type": "Service",
    "@id": `${url}#service`,
    name,
    serviceType,
    description,
    url,
    provider: { "@id": organizationId },
    areaServed: {
      "@type": "Country",
      name: "España",
    },
  };
}

export function jsonLd(value: unknown) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}
