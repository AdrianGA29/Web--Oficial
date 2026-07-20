import {
  Bot,
  ClipboardList,
  Files,
  MessageCircleQuestion,
  MessagesSquare,
  Repeat2,
  ScrollText,
  ShieldCheck,
  Workflow,
} from "lucide-react";
import { assets } from "../assets";
import type {
  ContactItem,
  FaqItem,
  InfoCard,
  NavLink,
  TeamMember,
  ToolDemo,
} from "../types";

export const navLinks: NavLink[] = [
  { name: "Desafíos", href: "#desafios" },
  { name: "Soluciones", href: "#soluciones" },
  { name: "Nuestro método", href: "#metodo" },
  { name: "Diferenciación", href: "#diferenciacion" },
  { name: "Equipo", href: "#equipo" },
];

export const challenges: InfoCard[] = [
  {
    title: "Las consultas llegan, pero no siempre se controlan",
    description:
      "Un cliente escribe por WhatsApp, otro llama, otro manda un correo... y al final cuesta saber quién está pendiente, quién respondió y quién se ha quedado sin seguimiento.",
    question: "¿Sientes que el control de tus clientes se te escapa?",
    icon: MessagesSquare,
  },
  {
    title: "Los presupuestos se hacen, pero luego se enfrían",
    description:
      "Se prepara un presupuesto, se envía y, si nadie se acuerda de revisarlo, queda parado. Sin aviso, sin próximo paso y sin saber si esa venta se ha perdido.",
    question: "¿Tus presupuestos enviados se quedan en el olvido?",
    icon: ScrollText,
  },
  {
    title: "Cada persona guarda la información a su manera",
    description:
      "Un archivo en una carpeta, una nota en el móvil, un Excel compartido, un mensaje perdido y parte del contexto en la cabeza de alguien.",
    question: "¿Tu información está dispersa y difícil de localizar?",
    icon: Files,
  },
  {
    title: "Hay tareas que se repiten todas las semanas",
    description:
      "Copiar datos, pasar información de un sitio a otro, mandar mensajes parecidos, actualizar estados o preparar documentos casi iguales consume horas sin que nadie lo note.",
    question: "¿Pierdes tiempo cada semana en tareas repetitivas?",
    icon: Repeat2,
  },
  {
    title: "El equipo pregunta demasiado para saber qué está pasando",
    description:
      "Cuando todo depende de preguntar quién lo lleva, si se respondió o dónde está un documento, la empresa pierde tiempo, contexto y control operativo.",
    question: "¿Tienes que preguntar varias veces para saber el estado real de un proyecto?",
    icon: MessageCircleQuestion,
  },
  {
    title: "Tenéis herramientas, pero el trabajo sigue siendo manual",
    description:
      "Correo, Excel, WhatsApp, carpetas o algún programa pueden convivir durante años sin crear un proceso claro si nadie los conecta con criterio.",
    question: "Tenéis herramientas digitales, ¿pero el trabajo sigue siendo manual?",
    icon: ClipboardList,
  },
];

export const toolDemos: ToolDemo[] = [
  {
    name: "Demo de Gestión",
    audience:
      "Para empresas que reciben consultas, correos o mensajes de clientes y necesitan convertir esa información en oportunidades, tareas y seguimiento comercial.",
    description:
      "Demo tipo CRM inteligente con datos ficticios. Analiza solicitudes, extrae datos relevantes, propone siguientes pasos, crea oportunidades comerciales y conserva fichas de cliente con historial completo. La IA ayuda a priorizar, pero la decisión final siempre queda en manos del equipo.",
    tags: [
      "Consultas centralizadas",
      "Pipeline comercial",
      "Historial de cliente",
      "Acciones sugeridas",
      "IA supervisada",
    ],
    cta: "Probar sistema funcional",
    href: "https://example.com",
  },
  {
    name: "Demo Hotel",
    audience:
      "Para hoteles y alojamientos que necesitan coordinar turnos, plantilla, tareas operativas, documentación y exportaciones desde un entorno más claro.",
    description:
      "Demo de gestión interna para dirección hotelera. Permite mostrar cómo centralizar parte de la operativa diaria con datos ficticios, reducir trabajo repetitivo y ganar una vista más clara de lo que ocurre cada día.",
    tags: [
      "Turnos y plantilla",
      "Tareas internas",
      "Documentación",
      "Exportaciones",
      "Control diario",
    ],
    cta: "Ver demo operativa",
    href: "https://example.com",
  },
  {
    name: "Demo de Presupuestos",
    audience:
      "Para empresas de mecanizado, CNC o procesos técnicos que dedican demasiado tiempo a calcular costes, revisar parámetros y preparar presupuestos.",
    description:
      "Demo para generar y gestionar presupuestos técnicos. Simula piezas, materiales, costes y criterios de trabajo para transformar un proceso disperso en presupuestos más rápidos, consistentes y fáciles de revisar.",
    tags: [
      "Costes técnicos",
      "Materiales",
      "Simulación",
      "Clientes",
      "Presupuestos",
    ],
    cta: "Simular caso real",
    href: "https://example.com",
  },
  {
    name: "Web interactiva con IA",
    audience:
      "Para marcas, profesionales y empresas que quieren una web más viva, con motion, interacción, narrativa visual y apoyo inteligente para guiar al usuario.",
    description:
      "Ejemplo de experiencia web dinámica con animaciones, microinteracciones y un asistente con IA pensado para acompañar la navegación. Sirve para mostrar que una web también puede ser una herramienta comercial, no solo una tarjeta de visita.",
    tags: [
      "Motion UI",
      "Interacción",
      "Chatbot IA",
      "Portfolio",
      "Experiencia premium",
    ],
    cta: "Interactuar con el flujo",
    href: "https://portfoliopersonal-nu.vercel.app/",
  },
];

export const solutions: InfoCard[] = [
  {
    title: "IA aplicada a la rentabilidad",
    description:
      "Implementamos inteligencia artificial solo cuando genera un impacto medible: automatización de flujos de trabajo, análisis predictivo o reducción de carga operativa. La tecnología es un habilitador de negocio, nunca un elemento decorativo.",
    icon: Bot,
  },
  {
    title: "Herramientas a medida",
    description:
      "No entregamos soluciones aisladas. Diseñamos arquitectura digital que se integra con el flujo real de tu empresa, garantizando que cada herramienta sea funcional, segura y esté alineada con tus objetivos de crecimiento.",
    icon: Workflow,
  },
  {
    title: "Metodología de mejora incremental",
    description:
      "Aplicamos un modelo de despliegue progresivo: identificamos el punto de fricción más crítico, ejecutamos una solución de alto impacto, validamos el retorno y escalamos el sistema sobre una base sólida y profesional.",
    icon: ShieldCheck,
  },
];

export const teamMembers: TeamMember[] = [
  {
    name: "Adrian",
    title: "Sistemas y Desarrollo de Aplicaciones",
    department: "Desarrollo",
    image: assets.adrian,
    alt: "Adrian, especialista en Sistemas, Desarrollo de Aplicaciones e IA",
  },
  {
    name: "Nicolas",
    title: "Sistemas, Redes y Big Data",
    department: "Desarrollo",
    image: assets.nicolas,
    alt: "Nicolas, especialista en Sistemas, Redes, Big Data e IA",
  },
  {
    name: "Victor",
    title: "Desarrollo, Mecatrónica Industrial y Big Data",
    department: "Desarrollo",
    image: assets.victor,
    alt: "Victor, especialista en Desarrollo, Mecatrónica Industrial, Big Data e IA",
  },
  {
    name: "Patricia",
    title: "Derecho y Estudios Internacionales",
    department: "Dirección y Administración",
    image: assets.patricia,
    alt: "Patricia, especialista en Derecho, Estudios Internacionales e IA",
  },
  {
    name: "Alejandro",
    title: "Administración y Finanzas",
    department: "Dirección y Administración",
    image: assets.alejandro,
    alt: "Alejandro, especialista en Administración, Finanzas e IA",
  },
  {
    name: "Ariadna",
    title: "Modelado 3D y Sistemas",
    department: "Desarrollo",
    image: assets.ariadna,
    alt: "Ariadna, especialista en Modelado 3D, Sistemas e IA",
  },
  {
    name: "Laura",
    title: "Diseño Gráfico y Multimedia",
    department: "Desarrollo",
    image: assets.laura,
    alt: "Laura, especialista en Diseño Gráfico, Multimedia e IA",
  },
];

export const contactItems: ContactItem[] = [
  {
    label: "Administración",
    value: "administracion@example.com",
    href: "mailto:administracion@example.com",
    type: "email",
  },
  {
    label: "Producción",
    value: "produccion@example.com",
    href: "mailto:produccion@example.com",
    type: "email",
  },
  {
    label: "Contacto general",
    value: "contacto@example.com",
    href: "mailto:contacto@example.com",
    type: "email",
  },
  {
    label: "Teléfono Principal",
    value: "+34 629 906 810",
    href: "tel:+34629906810",
    type: "phone",
  },
  {
    label: "Consultoría & Ventas",
    value: "+34 665 325 861",
    href: "tel:+34665325861",
    type: "phone",
  },
];

export const faqs: FaqItem[] = [
  {
    question: "¿Somos una agencia de IA?",
    answer:
      "No. Somos una consultora de transformación operativa. La inteligencia artificial es una de las muchas herramientas que utilizamos, pero nuestra metodología se basa en integrar soluciones legales, financieras y tecnológicas para optimizar el negocio de forma real. Si la IA no aporta valor, rentabilidad o seguridad jurídica a tu empresa, no la implementamos.",
  },
  {
    question: "¿Tengo que saber exactamente qué necesito?",
    answer:
      "No. Ese es precisamente nuestro trabajo. A través de nuestra auditoría de diagnóstico identificamos tus puntos de fricción reales y diseñamos una hoja de ruta a medida que integra los aspectos legales, financieros y técnicos que tu empresa requiere para escalar.",
  },
  {
    question: "¿Tengo que cambiar todas mis herramientas?",
    answer:
      "No. Apostamos por la integración y la optimización. Analizamos lo que ya funciona en tu empresa y construimos sobre ello, asegurando que cualquier nueva implementación sea eficiente, segura y cumpla con la normativa vigente.",
  },
  {
    question: "¿Empezáis con proyectos grandes?",
    answer:
      "Nos enfocamos en el valor, no en el tamaño. Trabajamos tanto con proyectos puntuales de optimización como con acompañamiento estratégico a largo plazo, siempre garantizando un retorno claro desde las primeras etapas de implementación.",
  },
  {
    question: "¿La IA toma decisiones sola?",
    answer:
      "Nunca. Nuestra arquitectura de soluciones siempre mantiene al humano en el centro. La IA actúa bajo supervisión y parámetros diseñados por nuestro equipo legal y técnico, asegurando que cada decisión automatizada sea transparente, ética y responsable.",
  },
  {
    question: "¿Qué tipo de empresas encajan con nosotros?",
    answer:
      "Empresas que están en fase de crecimiento o que necesitan profesionalizar sus procesos internos para poder escalar de manera ordenada y segura, independientemente de su sector.",
  },
];
