import type { Metadata } from "next";
import "../legal.css";
import { LegalPage } from "@/components/legal-page";
import { privacySections } from "@/lib/legal";
import { socialImage } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Política de privacidad",
  description: "Información sobre los datos, las finalidades y los derechos de privacidad en Temis Atrile.",
  alternates: { canonical: "/privacidad/" },
  openGraph: { url: "/privacidad/", images: [socialImage] },
};

export default function Page() {
  return (
    <LegalPage
      eyebrow="Privacidad y datos"
      title="Política de privacidad"
      description="Información sobre los datos, las finalidades y los derechos de privacidad en Temis Atrile."
      documentCode="LEGAL / 01"
      currentPath="/privacidad"
      sections={privacySections}
    />
  );
}
