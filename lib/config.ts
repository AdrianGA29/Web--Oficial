export const siteConfig = {
  name: "Nueva Empresa",
  description:
    "Consultora de transformación operativa para pymes: diagnóstico, sistemas y automatización con criterio técnico, legal y financiero.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://web-oficial-pi.vercel.app",
  formEndpoint:
    process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT ?? "https://formspree.io/f/mzdqlgjl",
  indexable: process.env.NEXT_PUBLIC_SITE_INDEXABLE === "true",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.trim() ?? "",
  phone: process.env.NEXT_PUBLIC_CONTACT_PHONE?.trim() ?? "",
  budgetDemoUrl: process.env.NEXT_PUBLIC_BUDGET_DEMO_URL?.trim() ?? "",
} as const;
