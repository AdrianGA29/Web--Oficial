export type ServiceVisual = "web" | "automation" | "apps" | "ai";

export type ServiceCatalogItem = {
  id: ServiceVisual;
  number: string;
  eyebrow: string;
  title: string;
  promise: string;
  description: string;
  signal: string;
  capabilities: readonly string[];
  href: string;
  action: string;
};

export const serviceCatalog: readonly ServiceCatalogItem[] = [
  {
    id: "web",
    number: "01",
    eyebrow: "INTERFACES / PRODUCTO",
    title: "Desarrollo web",
    promise: "Una web que explica tu valor antes de que tengas que hacerlo tú.",
    description:
      "Diseñamos webs corporativas, tiendas online y productos digitales donde mensaje, experiencia y tecnología trabajan como una sola pieza.",
    signal: "Tu empresa aporta más valor del que su web consigue transmitir.",
    capabilities: ["Web corporativa", "Landing page", "Comercio electrónico", "Producto digital"],
    href: "/servicios/desarrollo-web",
    action: "Explorar servicio",
  },
  {
    id: "automation",
    number: "02",
    eyebrow: "FLUJOS / INTEGRACIONES",
    title: "Automatización",
    promise: "Tu equipo no debería hacer de puente entre herramientas que no se hablan.",
    description:
      "Conectamos sistemas, eliminamos pasos repetitivos y diseñamos flujos fiables para que la operativa avance sin depender de tareas manuales invisibles.",
    signal: "Las personas copian datos, persiguen estados o rehacen documentos.",
    capabilities: ["Procesos internos", "Integraciones", "Documentos", "Seguimiento"],
    href: "/servicios/automatizacion",
    action: "Explorar servicio",
  },
  {
    id: "apps",
    number: "03",
    eyebrow: "SOFTWARE / OPERACIONES",
    title: "Aplicaciones a medida",
    promise: "Cuando la herramienta genérica obliga a tu empresa a trabajar peor.",
    description:
      "Construimos paneles, aplicaciones internas y soluciones conectadas con la lógica concreta del negocio, sin añadir complejidad innecesaria.",
    signal: "Las herramientas disponibles no encajan con el proceso real.",
    capabilities: ["Paneles internos", "Aplicaciones web", "Android y escritorio", "APIs y datos"],
    href: "/servicios/aplicaciones-a-medida",
    action: "Explorar servicio",
  },
  {
    id: "ai",
    number: "04",
    eyebrow: "ANÁLISIS / IA APLICADA",
    title: "Inteligencia artificial",
    promise: "Inteligencia artificial para una tarea concreta. Con control humano.",
    description:
      "Analizamos dónde la IA puede reducir carga, ordenar información o asistir una decisión, y planteamos una implantación viable, trazable y responsable.",
    signal: "El volumen de información ya supera el tiempo disponible para procesarla.",
    capabilities: ["Consultoría", "Pruebas de concepto", "Asistentes", "Procesamiento de información"],
    href: "/servicios/inteligencia-artificial",
    action: "Explorar servicio",
  },
] as const;
