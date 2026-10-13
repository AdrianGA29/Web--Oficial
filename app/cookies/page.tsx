import type { Metadata } from "next";
import "../legal.css";
import { LegalPage } from "@/components/legal-page";
import { cookieSections } from "@/lib/legal";
import { socialImage } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Política de cookies",
  description: "Información sobre cookies, almacenamiento y control de las demostraciones externas.",
  alternates: { canonical: "/cookies/" },
  openGraph: { url: "/cookies/", images: [socialImage] },
};

export default function Page() {
  return (
    <LegalPage
      eyebrow="Tecnologías y navegación"
      title="Política de cookies"
      description="Información sobre cookies, almacenamiento y control de las demostraciones externas."
      documentCode="LEGAL / 02"
      currentPath="/cookies"
      sections={cookieSections}
    />
  );
}
