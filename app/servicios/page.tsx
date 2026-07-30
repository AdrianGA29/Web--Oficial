import type { Metadata } from "next";
import { ServicesHub } from "@/components/services-hub";

export const metadata: Metadata = {
  title: "Servicios de desarrollo, automatización e IA",
  description:
    "Desarrollo web, automatización, aplicaciones a medida y consultoría de inteligencia artificial para empresas de toda España.",
  alternates: { canonical: "/servicios" },
};

export default function ServicesPage() {
  return <ServicesHub />;
}
