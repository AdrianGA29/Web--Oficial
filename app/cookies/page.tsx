import type { Metadata } from "next";
import { LegalPage, type LegalSection } from "@/components/legal-page";
import { socialImage } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Política de cookies",
  description: "Información sobre cookies, medición y tecnologías utilizadas en la web de Temis Atrile.",
  alternates: { canonical: "/cookies/" },
  openGraph: { url: "/cookies/", images: [socialImage] },
};

const sections: LegalSection[] = [
  {
    title: "Configuración actual",
    paragraphs: [
      "Esta web no utiliza actualmente herramientas de analítica, píxeles publicitarios ni tecnologías destinadas a crear perfiles comerciales de las personas que la visitan.",
      "Determinados mecanismos técnicos pueden resultar necesarios para entregar el sitio, protegerlo y conservar ajustes básicos de funcionamiento.",
    ],
  },
  {
    title: "Infraestructura técnica",
    paragraphs: [
      "El sitio se aloja en infraestructura de IONOS. Como parte de la prestación técnica, el servidor puede generar registros necesarios para entregar la web, mantener su estabilidad y detectar incidencias de seguridad.",
      "Estos registros técnicos no se utilizan para elaborar perfiles publicitarios ni para personalizar comunicaciones comerciales.",
    ],
  },
  {
    title: "Categorías de tecnologías",
    paragraphs: [
      "La función de cada tecnología determina cómo debe tratarse. En este sitio diferenciamos entre mecanismos necesarios para operar la web y herramientas de medición destinadas a entender su funcionamiento.",
    ],
    points: [
      "Necesarias: entrega, estabilidad y seguridad del sitio.",
      "Analíticas: no utilizadas actualmente.",
      "Publicitarias: no utilizadas actualmente.",
    ],
  },
  {
    title: "Gestión desde el navegador",
    paragraphs: [
      "Los principales navegadores permiten consultar, bloquear o eliminar cookies y otros datos almacenados desde sus ajustes de privacidad.",
      "El bloqueo de mecanismos estrictamente necesarios puede afectar a determinadas funciones o impedir que algunos servicios web se comporten correctamente.",
    ],
  },
  {
    title: "Cambios en las tecnologías utilizadas",
    paragraphs: [
      "Si incorporamos nuevas herramientas de analítica, personalización o publicidad, revisaremos esta información y aplicaremos los controles de consentimiento que correspondan antes de activarlas.",
      "Cualquier cambio relevante se reflejará en esta página para mantener una explicación fiel a la configuración real del sitio.",
    ],
  },
];

export default function CookiesPage() {
  return (
    <LegalPage
      eyebrow="Medición y navegación"
      title="Política de cookies"
      description="Una explicación directa de las tecnologías que intervienen al navegar por esta web y de cómo puedes gestionarlas."
      documentCode="LEGAL / 02"
      currentPath="/cookies"
      sections={sections}
    />
  );
}
