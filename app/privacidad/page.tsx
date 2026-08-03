import type { Metadata } from "next";
import { LegalPage, type LegalSection } from "@/components/legal-page";
import { socialImage } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Política de privacidad",
  description: "Información sobre el tratamiento de los datos enviados a través del sitio web de Temis Atrile.",
  alternates: { canonical: "/privacidad/" },
  openGraph: { url: "/privacidad/", images: [socialImage] },
};

const sections: LegalSection[] = [
  {
    title: "Información que recopilamos",
    paragraphs: [
      "El formulario de contacto puede solicitar nombre, empresa o nombre del proyecto, correo electrónico, teléfono opcional y el contexto que la persona decida compartir con nosotros.",
      "No necesitamos categorías especiales de datos personales para valorar una consulta. Recomendamos no incluir información confidencial, de terceros o que no resulte necesaria para explicar el proyecto.",
    ],
    points: [
      "Datos de identificación y contacto.",
      "Información profesional o relativa al proyecto.",
      "Contenido incluido voluntariamente en el mensaje.",
    ],
  },
  {
    title: "Para qué utilizamos los datos",
    paragraphs: [
      "Utilizamos la información recibida para estudiar la consulta, responder a la persona interesada y preparar, cuando corresponda, una primera sesión de análisis.",
      "También podremos conservar las comunicaciones necesarias para organizar el seguimiento de la solicitud y documentar las decisiones tomadas durante esa conversación.",
    ],
  },
  {
    title: "Base del tratamiento",
    paragraphs: [
      "El tratamiento inicial se apoya en el consentimiento expresado al enviar voluntariamente el formulario y solicitar que contactemos contigo.",
      "Si la conversación deriva en una relación profesional, determinados tratamientos podrán resultar necesarios para preparar o ejecutar el servicio acordado y cumplir las obligaciones legales aplicables.",
    ],
  },
  {
    title: "Proveedores y destinatarios",
    paragraphs: [
      "El formulario se procesa mediante un endpoint propio alojado en la infraestructura de IONOS. Cuando se envía correctamente, su contenido se entrega directamente en el buzón corporativo de Temis Atrile.",
      "No vendemos datos personales ni los cedemos con fines publicitarios. El acceso queda limitado a los proveedores necesarios para operar la web y atender la solicitud.",
    ],
  },
  {
    title: "Conservación y seguridad",
    paragraphs: [
      "Conservamos la información durante el tiempo necesario para atender la consulta, gestionar la posible relación profesional y cumplir las obligaciones que puedan resultar aplicables.",
      "Aplicamos medidas técnicas y organizativas razonables para reducir el riesgo de acceso no autorizado, pérdida, alteración o uso indebido de la información.",
    ],
  },
  {
    title: "Tus derechos",
    paragraphs: [
      "Puedes solicitar el acceso a tus datos, su rectificación o supresión y, cuando corresponda, la oposición, limitación o portabilidad del tratamiento.",
      "También puedes retirar un consentimiento previamente otorgado. La retirada no afecta a la licitud del tratamiento realizado antes de solicitarla.",
    ],
    points: [
      "Acceso, rectificación y supresión.",
      "Oposición y limitación del tratamiento.",
      "Portabilidad y retirada del consentimiento cuando proceda.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="Privacidad y datos"
      title="Política de privacidad"
      description="Explicamos con claridad qué información recibimos, para qué la utilizamos y qué control tienes sobre ella."
      documentCode="LEGAL / 01"
      currentPath="/privacidad"
      sections={sections}
    />
  );
}
