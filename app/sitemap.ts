import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/config";
import { services } from "@/lib/services";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/servicios", "/nosotros", "/diagnostico", "/contacto", "/privacidad", "/terminos", "/cookies"];
  const serviceRoutes = services.map((service) => `/servicios/${service.slug}`);

  return [...routes, ...serviceRoutes].map((route) => ({
    url: `${siteConfig.url}${route}`,
    changeFrequency: route === "" ? "monthly" : "yearly",
    priority: route === "" ? 1 : route.startsWith("/servicios") ? 0.8 : 0.6,
  }));
}
