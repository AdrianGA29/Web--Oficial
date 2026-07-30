export const siteConfig = {
  name: "Temis Λtrile",
  description:
    "Consultora de transformación operativa para pymes: diagnóstico, sistemas y automatización con criterio técnico, legal y financiero.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://temisatrile.com",
  contactEndpoint:
    process.env.NEXT_PUBLIC_CONTACT_ENDPOINT ?? "/api/contact.php",
  email:
    process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() ?? "contacto@temisatrile.com",
  indexable: process.env.NEXT_PUBLIC_SITE_INDEXABLE === "true",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.trim() ?? "",
  phone: process.env.NEXT_PUBLIC_CONTACT_PHONE?.trim() ?? "",
  budgetDemoUrl: process.env.NEXT_PUBLIC_BUDGET_DEMO_URL?.trim() ?? "",
} as const;
