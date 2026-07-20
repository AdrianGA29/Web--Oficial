const configuredEndpoint = import.meta.env.VITE_FORMSPREE_ENDPOINT?.trim();

export const contactFormEndpoint =
  configuredEndpoint || "https://formspree.io/f/mzdqlgjl";
