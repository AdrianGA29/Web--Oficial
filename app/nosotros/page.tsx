import type { Metadata } from "next";
import { AboutShowcase } from "@/components/about-showcase";

export const metadata: Metadata = {
  title: "Nosotros",
  description:
    "Conoce Temis Atrile: estrategia empresarial, criterio jurídico y desarrollo tecnológico unidos para transformar empresas con soluciones viables.",
};

export default function AboutPage() {
  return <AboutShowcase />;
}
