import type { Metadata } from "next";
import { LegalPage, type LegalSection } from "@/components/legal-page";

export const metadata: Metadata = { title: "Términos de uso" };

const sections: LegalSection[] = [
  { title: "Objeto del sitio", paragraphs: ["Este sitio presenta servicios de consultoría, transformación operativa, automatización y desarrollo de experiencias digitales. La información publicada tiene carácter general y no constituye por sí misma una oferta contractual."] },
  { title: "Uso responsable", paragraphs: ["La persona usuaria se compromete a utilizar el sitio de forma lícita, a no interferir con su funcionamiento y a no enviar información falsa, ilícita o que vulnere derechos de terceros mediante sus formularios."] },
  { title: "Alcance de la información", paragraphs: ["Los contenidos describen enfoques y capacidades generales. Cada servicio requiere una evaluación y un alcance acordado expresamente. Ninguna explicación del sitio sustituye asesoramiento legal, financiero o técnico adaptado a un caso concreto."] },
  { title: "Propiedad intelectual", paragraphs: ["Los textos, diseños, interfaces, código y recursos visuales propios del sitio están protegidos por la normativa aplicable. Los materiales de terceros se utilizan bajo sus respectivas condiciones o licencias."] },
  { title: "Enlaces externos", paragraphs: ["Algunas páginas pueden enlazar experiencias o servicios alojados por terceros. No controlamos permanentemente su disponibilidad ni sus políticas, por lo que recomendamos revisar sus condiciones antes de utilizarlos."] },
  { title: "Versión definitiva", paragraphs: ["La identificación completa del titular, la jurisdicción aplicable y los canales formales se incorporarán y revisarán antes del lanzamiento público y la indexación del sitio."] },
];

export default function TermsPage() {
  return <LegalPage eyebrow="Condiciones" title="Términos de uso" description="Reglas generales para utilizar este sitio y consultar sus contenidos." notice="Texto provisional. No sustituye los términos definitivos que se aprobarán en la Puerta C de lanzamiento." sections={sections} />;
}
