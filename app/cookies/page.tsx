import type { Metadata } from "next";
import { LegalPage, type LegalSection } from "@/components/legal-page";

export const metadata: Metadata = { title: "Cookies" };

const sections: LegalSection[] = [
  { title: "Configuración actual", paragraphs: ["El MVP no utiliza Google Analytics, píxeles publicitarios ni herramientas de personalización comercial. Por ese motivo no se muestra un banner de consentimiento en esta fase."] },
  { title: "Analítica de Vercel", paragraphs: ["El sitio utiliza Vercel Web Analytics para obtener información agregada sobre visitas y rendimiento. La integración se ha elegido como opción de medición mínima y no debe recibir datos personales incluidos en formularios."] },
  { title: "Cookies técnicas", paragraphs: ["La infraestructura o el navegador pueden utilizar mecanismos estrictamente necesarios para entregar el sitio, protegerlo o conservar ajustes técnicos. Estos mecanismos no se emplean para crear perfiles publicitarios."] },
  { title: "Cambios futuros", paragraphs: ["Si se incorpora una herramienta que requiera consentimiento —por ejemplo, analítica publicitaria o seguimiento entre sitios— se actualizará esta política y se implementará un sistema de gestión del consentimiento antes de cargarla."] },
  { title: "Control desde el navegador", paragraphs: ["Los navegadores permiten consultar, bloquear o eliminar cookies desde sus ajustes. Desactivar mecanismos esenciales puede afectar al funcionamiento de algunos servicios web."] },
];

export default function CookiesPage() {
  return <LegalPage eyebrow="Transparencia" title="Política de cookies" description="Medición mínima y sin herramientas publicitarias en el MVP." notice="Esta política describe la configuración técnica prevista para el MVP y se revisará junto con los textos legales definitivos antes del lanzamiento." sections={sections} />;
}
