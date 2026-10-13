import type { Metadata } from "next";
import "../legal.css";
import { LegalPage } from "@/components/legal-page";
import { termsSections } from "@/lib/legal";
import { socialImage } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Aviso legal y condiciones de uso",
  description: "Identificación del titular y condiciones de uso del sitio web de Temis Atrile.",
  alternates: { canonical: "/terminos/" },
  openGraph: { url: "/terminos/", images: [socialImage] },
};

export default function Page() {
  return (
    <LegalPage
      eyebrow="Información legal"
      title="Aviso legal y condiciones de uso"
      description="Identificación del titular y condiciones de uso del sitio web de Temis Atrile."
      documentCode="LEGAL / 03"
      currentPath="/terminos"
      sections={termsSections}
    />
  );
}
