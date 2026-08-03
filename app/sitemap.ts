import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/config";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url.replace(/\/$/, "");
  const lastModified = new Date("2026-08-03T00:00:00+02:00");
  const routes = [
    "/",
    "/servicios/",
    "/servicios/desarrollo-web/",
    "/servicios/automatizacion/",
    "/servicios/aplicaciones-a-medida/",
    "/servicios/inteligencia-artificial/",
    "/nosotros/",
    "/privacidad/",
    "/terminos/",
    "/cookies/",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified,
    changeFrequency: route === "/" ? "monthly" : "yearly",
    priority: route === "/" ? 1 : route.startsWith("/servicios/") ? 0.8 : 0.6,
  }));
}
