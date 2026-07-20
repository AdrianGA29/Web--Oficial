import { useEffect } from "react";
import type { AppView, SeoConfig } from "../types";

const SITE_URL = "https://example.com";
const SOCIAL_IMAGE_URL = `${SITE_URL}/og/social.png`;
const SOCIAL_IMAGE_ALT =
  "Nueva Empresa: sistemas, automatización e inteligencia artificial para pymes";

const seoByView: Record<AppView, SeoConfig> = {
  landing: {
    title: "Nueva Empresa | Transformación operativa para pymes",
    description:
      "Consultora de transformación operativa: diagnosticamos procesos, integramos sistemas y aplicamos automatización e IA con criterio.",
    path: "/",
  },
  terms: {
    title: "Términos y Condiciones | Nueva Empresa",
    description: "Consulta los términos y condiciones de uso del sitio web y sus servicios digitales.",
    path: "/terminos",
  },
  privacy: {
    title: "Política de Privacidad y Cookies | Nueva Empresa",
    description: "Información sobre privacidad, cookies, derechos de usuario y tratamiento de datos.",
    path: "/privacidad",
  },
};

function upsertMeta(selector: string, create: () => HTMLMetaElement | HTMLLinkElement, value: string) {
  const existing = document.head.querySelector<HTMLMetaElement | HTMLLinkElement>(selector);
  const element = existing ?? create();

  if (!existing) {
    document.head.appendChild(element);
  }

  if (element instanceof HTMLMetaElement) {
    element.content = value;
  } else {
    element.href = value;
  }
}

function upsertJsonLd(id: string, data: unknown) {
  const existing = document.getElementById(id);
  const script =
    existing instanceof HTMLScriptElement
      ? existing
      : Object.assign(document.createElement("script"), {
          id,
          type: "application/ld+json",
        });

  script.textContent = JSON.stringify(data);

  if (!existing) {
    document.head.appendChild(script);
  }
}

export function useSEO(view: AppView) {
  useEffect(() => {
    const seo = seoByView[view];
    const canonical = `${SITE_URL}${seo.path}`;

    document.title = seo.title;

    upsertMeta("meta[name='description']", () => {
      const meta = document.createElement("meta");
      meta.name = "description";
      return meta;
    }, seo.description);

    upsertMeta("meta[name='robots']", () => {
      const meta = document.createElement("meta");
      meta.name = "robots";
      return meta;
    }, seo.robots ?? "index,follow");

    upsertMeta("link[rel='canonical']", () => {
      const link = document.createElement("link");
      link.rel = "canonical";
      return link;
    }, canonical);

    upsertMeta("meta[property='og:title']", () => {
      const meta = document.createElement("meta");
      meta.setAttribute("property", "og:title");
      return meta;
    }, seo.title);

    upsertMeta("meta[property='og:description']", () => {
      const meta = document.createElement("meta");
      meta.setAttribute("property", "og:description");
      return meta;
    }, seo.description);

    upsertMeta("meta[property='og:type']", () => {
      const meta = document.createElement("meta");
      meta.setAttribute("property", "og:type");
      return meta;
    }, "website");

    upsertMeta("meta[property='og:locale']", () => {
      const meta = document.createElement("meta");
      meta.setAttribute("property", "og:locale");
      return meta;
    }, "es_ES");

    upsertMeta("meta[property='og:site_name']", () => {
      const meta = document.createElement("meta");
      meta.setAttribute("property", "og:site_name");
      return meta;
    }, "Nueva Empresa");

    upsertMeta("meta[property='og:url']", () => {
      const meta = document.createElement("meta");
      meta.setAttribute("property", "og:url");
      return meta;
    }, canonical);

    upsertMeta("meta[property='og:image']", () => {
      const meta = document.createElement("meta");
      meta.setAttribute("property", "og:image");
      return meta;
    }, SOCIAL_IMAGE_URL);

    upsertMeta("meta[property='og:image:width']", () => {
      const meta = document.createElement("meta");
      meta.setAttribute("property", "og:image:width");
      return meta;
    }, "1920");

    upsertMeta("meta[property='og:image:height']", () => {
      const meta = document.createElement("meta");
      meta.setAttribute("property", "og:image:height");
      return meta;
    }, "1080");

    upsertMeta("meta[property='og:image:alt']", () => {
      const meta = document.createElement("meta");
      meta.setAttribute("property", "og:image:alt");
      return meta;
    }, SOCIAL_IMAGE_ALT);

    upsertMeta("meta[name='twitter:card']", () => {
      const meta = document.createElement("meta");
      meta.name = "twitter:card";
      return meta;
    }, "summary_large_image");

    upsertMeta("meta[name='twitter:title']", () => {
      const meta = document.createElement("meta");
      meta.name = "twitter:title";
      return meta;
    }, seo.title);

    upsertMeta("meta[name='twitter:description']", () => {
      const meta = document.createElement("meta");
      meta.name = "twitter:description";
      return meta;
    }, seo.description);

    upsertMeta("meta[name='twitter:image']", () => {
      const meta = document.createElement("meta");
      meta.name = "twitter:image";
      return meta;
    }, SOCIAL_IMAGE_URL);

    upsertMeta("meta[name='twitter:image:alt']", () => {
      const meta = document.createElement("meta");
      meta.name = "twitter:image:alt";
      return meta;
    }, SOCIAL_IMAGE_ALT);

    upsertJsonLd("company-professional-service-schema", {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      name: "Nueva Empresa",
      url: SITE_URL,
      description: seoByView.landing.description,
      email: "contacto@example.com",
      telephone: "+34629906810",
      areaServed: "ES",
      serviceType: [
        "Diagnóstico operativo para pymes",
        "Sistemas internos para empresas",
        "Automatización de procesos",
        "Sistemas internos",
        "Inteligencia artificial aplicada",
      ],
    });
  }, [view]);
}
