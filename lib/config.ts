const explicitIndexability = process.env.NEXT_PUBLIC_SITE_INDEXABLE;

export const siteConfig = {
  name: "Temis Atrile",
  displayName: "Temis Λtrile",
  alternateName: "Temis Λtrile",
  description:
    "Ayudamos a empresas de toda España a crecer con estrategia, inteligencia artificial, automatización, desarrollo web y soluciones tecnológicas a medida.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://temisatrile.com",
  contactEndpoint:
    process.env.NEXT_PUBLIC_CONTACT_ENDPOINT ?? "/api/contact.php",
  email:
    process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() ?? "contacto@temisatrile.com",
  indexable:
    explicitIndexability === undefined
      ? process.env.NODE_ENV === "production"
      : explicitIndexability === "true",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.trim() ?? "",
  phone: process.env.NEXT_PUBLIC_CONTACT_PHONE?.trim() ?? "",
  budgetDemoUrl: process.env.NEXT_PUBLIC_BUDGET_DEMO_URL?.trim() ?? "",
} as const;
