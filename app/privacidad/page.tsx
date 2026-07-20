import type { Metadata } from "next";
import { LegalPage, type LegalSection } from "@/components/legal-page";

export const metadata: Metadata = { title: "Privacidad" };

const sections: LegalSection[] = [
  { title: "Datos que se solicitan", paragraphs: ["El formulario de contacto puede solicitar nombre, empresa, correo electrónico, teléfono opcional, el área de fricción seleccionada y cualquier contexto adicional que la persona decida proporcionar.", "No se solicitan categorías especiales de datos personales. Recomendamos no incluir información confidencial, de terceros o innecesaria para valorar la consulta."] },
  { title: "Finalidad del tratamiento", paragraphs: ["La información enviada se utiliza para responder a la consulta, preparar una posible sesión de diagnóstico y mantener las comunicaciones necesarias relacionadas con esa solicitud.", "Los datos no se utilizarán para comunicaciones comerciales adicionales sin una base jurídica adecuada."] },
  { title: "Base jurídica", paragraphs: ["El tratamiento inicial se basa en el consentimiento expresado al enviar el formulario. Si posteriormente existe una relación contractual, ciertos tratamientos podrán apoyarse en la ejecución del contrato o en obligaciones legales aplicables."] },
  { title: "Proveedor del formulario", paragraphs: ["El formulario se procesa mediante Formspree como proveedor técnico. Antes del lanzamiento definitivo se documentarán el responsable del tratamiento, las condiciones aplicables, las posibles transferencias internacionales y los plazos de conservación."] },
  { title: "Conservación y seguridad", paragraphs: ["Los datos se conservarán únicamente durante el tiempo necesario para atender la solicitud y cumplir las obligaciones que resulten aplicables. Se adoptarán medidas razonables para evitar accesos no autorizados, pérdida o uso indebido."] },
  { title: "Derechos", paragraphs: ["La persona interesada podrá solicitar acceso, rectificación, supresión, oposición, limitación o portabilidad cuando corresponda. El canal corporativo definitivo para ejercer estos derechos se publicará antes de indexar el sitio."] },
];

export default function PrivacyPage() {
  return <LegalPage eyebrow="Privacidad" title="Política de privacidad" description="Cómo se tratará la información enviada a través de este sitio." notice="Documento provisional pendiente de identificación fiscal, domicilio, canal corporativo y revisión legal antes del lanzamiento." sections={sections} />;
}
