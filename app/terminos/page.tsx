import type { Metadata } from "next";
import { LegalPage, type LegalSection } from "@/components/legal-page";
import { socialImage } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Términos de uso",
  description: "Condiciones generales para navegar y utilizar el sitio web de Temis Atrile.",
  alternates: { canonical: "/terminos/" },
  openGraph: { url: "/terminos/", images: [socialImage] },
};

const sections: LegalSection[] = [
  {
    title: "Finalidad del sitio",
    paragraphs: [
      "Este sitio presenta los servicios, capacidades y forma de trabajar de Temis Atrile en desarrollo digital, automatización, consultoría tecnológica y soluciones a medida.",
      "La información publicada tiene carácter general. Por sí misma no constituye una oferta contractual ni sustituye una propuesta preparada para un proyecto concreto.",
    ],
  },
  {
    title: "Uso responsable",
    paragraphs: [
      "La persona usuaria se compromete a utilizar la web de forma lícita, respetuosa y compatible con su finalidad.",
      "No está permitido interferir con el funcionamiento del sitio, intentar acceder a zonas restringidas ni enviar mediante los formularios contenido falso, ilícito o que vulnere derechos de terceros.",
    ],
    points: [
      "No alterar, bloquear o sobrecargar el funcionamiento de la web.",
      "No utilizar el contenido con fines ilícitos o engañosos.",
      "No introducir código, archivos o instrucciones maliciosas.",
    ],
  },
  {
    title: "Información sobre servicios",
    paragraphs: [
      "Los contenidos describen enfoques y capacidades generales. Cada colaboración requiere analizar el contexto, definir un alcance y acordar expresamente las condiciones aplicables.",
      "Ninguna explicación publicada sustituye asesoramiento legal, financiero o técnico adaptado a las circunstancias de una empresa o proyecto concreto.",
    ],
  },
  {
    title: "Propiedad intelectual",
    paragraphs: [
      "Los textos, diseños, interfaces, código y recursos visuales propios de esta web están protegidos por la normativa aplicable.",
      "La navegación no concede derechos de explotación sobre estos materiales. Los recursos pertenecientes a terceros se utilizan conforme a sus respectivas condiciones o licencias.",
    ],
  },
  {
    title: "Enlaces y servicios externos",
    paragraphs: [
      "Algunas secciones pueden enlazar herramientas, demostraciones o servicios alojados por terceros. Estos destinos mantienen sus propias condiciones, políticas y medidas de seguridad.",
      "Aunque seleccionamos los enlaces con criterio, no podemos controlar de forma permanente la disponibilidad o los cambios realizados en sitios externos.",
    ],
  },
  {
    title: "Disponibilidad y responsabilidad",
    paragraphs: [
      "Trabajamos para mantener la información accesible y el sitio funcionando correctamente, pero pueden producirse interrupciones por mantenimiento, actualizaciones o incidencias técnicas.",
      "El uso de la información publicada se realiza bajo la responsabilidad de quien la consulta y debe valorarse de acuerdo con su contexto y necesidades concretas.",
    ],
  },
  {
    title: "Actualizaciones",
    paragraphs: [
      "Podemos actualizar estos términos cuando cambien el sitio, sus funcionalidades o las condiciones aplicables.",
      "La versión disponible en esta página será la referencia para conocer las reglas de uso vigentes en cada momento.",
    ],
  },
];

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="Condiciones del sitio"
      title="Términos de uso"
      description="Las reglas esenciales para navegar, consultar nuestros contenidos y utilizar los canales disponibles en esta web."
      documentCode="LEGAL / 03"
      currentPath="/terminos"
      sections={sections}
    />
  );
}
