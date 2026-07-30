import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/config";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/servicios",
    "/servicios/desarrollo-web",
    "/nosotros",
    "/privacidad",
    "/terminos",
    "/cookies",
  ];

  return routes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    changeFrequency: route === "" ? "monthly" : "yearly",
    priority: route === "" ? 1 : route.startsWith("/servicios") ? 0.8 : 0.6,
  }));
}
