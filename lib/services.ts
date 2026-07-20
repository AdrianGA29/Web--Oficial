export type Service = {
  slug: string;
  index: string;
  title: string;
  shortTitle: string;
  eyebrow: string;
  summary: string;
  promise: string;
  tags: string[];
  problems: { title: string; text: string }[];
  includes: { title: string; text: string }[];
  steps: string[];
  visual: "flow" | "budget" | "web";
  demoHref?: string;
  demoLabel?: string;
};

export const services: Service[] = [
  {
    slug: "automatizacion-procesos",
    index: "01",
    title: "Automatización de procesos que elimina fricción, no criterio",
    shortTitle: "Automatización de procesos",
    eyebrow: "Servicio troncal",
    summary:
      "Conectamos tareas, información y responsables para que el trabajo avance con menos intervención manual y más control.",
    promise:
      "Un proceso más claro, trazable y fácil de escalar sin convertir tu empresa en un proyecto tecnológico infinito.",
    tags: ["Diagnóstico", "Integraciones", "Automatización", "Supervisión humana"],
    problems: [
      { title: "Trabajo duplicado", text: "La misma información se copia en distintas herramientas y formatos." },
      { title: "Seguimiento manual", text: "Los próximos pasos dependen de recordatorios personales y conversaciones sueltas." },
      { title: "Poca trazabilidad", text: "Cuesta explicar qué ocurrió, quién decidió y cuál es el estado real." },
    ],
    includes: [
      { title: "Mapa operativo", text: "Documentamos el flujo actual, sus excepciones y los puntos de decisión." },
      { title: "Diseño del sistema", text: "Definimos qué automatizar, qué mantener manual y cómo medir el resultado." },
      { title: "Implantación acompañada", text: "Integramos, probamos con usuarios reales y dejamos documentación útil." },
    ],
    steps: ["Observar", "Priorizar", "Diseñar", "Integrar", "Medir"],
    visual: "flow",
  },
  {
    slug: "presupuestacion-tecnica",
    index: "02",
    title: "Presupuestación técnica más rápida, consistente y revisable",
    shortTitle: "Presupuestación técnica",
    eyebrow: "Herramienta aplicada",
    summary:
      "Transformamos cálculos, materiales y criterios dispersos en un flujo de presupuestación que conserva el conocimiento técnico.",
    promise:
      "Menos tiempo preparando cada propuesta y más claridad para revisar costes, márgenes y decisiones antes de enviarla.",
    tags: ["Costes técnicos", "Materiales", "Simulación", "Trazabilidad"],
    problems: [
      { title: "Cálculos dispersos", text: "Tarifas, materiales y parámetros viven en hojas o referencias distintas." },
      { title: "Dependencia de una persona", text: "El criterio está en la experiencia de alguien y cuesta transferirlo." },
      { title: "Revisión lenta", text: "Comparar versiones o entender un precio requiere reconstruir el razonamiento." },
    ],
    includes: [
      { title: "Modelo de cálculo", text: "Estructuramos variables, reglas y excepciones sin ocultar el criterio técnico." },
      { title: "Interfaz operativa", text: "Diseñamos un flujo rápido para preparar, revisar y conservar presupuestos." },
      { title: "Historial útil", text: "Cada cálculo mantiene contexto suficiente para entenderlo y reutilizarlo." },
    ],
    steps: ["Datos", "Criterios", "Cálculo", "Revisión", "Propuesta"],
    visual: "budget",
  },
  {
    slug: "webs-interactivas-ia",
    index: "03",
    title: "Experiencias web que explican mejor y convierten con intención",
    shortTitle: "Webs interactivas con IA",
    eyebrow: "Experiencia digital",
    summary:
      "Creamos webs rápidas, expresivas y útiles, donde la interacción acompaña al mensaje y la IA resuelve una necesidad concreta.",
    promise:
      "Una presencia digital que deja de ser una tarjeta estática y empieza a trabajar como parte de tu proceso comercial.",
    tags: ["Estrategia", "Motion UI", "Conversión", "IA aplicada"],
    problems: [
      { title: "Propuesta difícil de explicar", text: "El valor del servicio se pierde entre bloques genéricos y mensajes intercambiables." },
      { title: "Experiencia plana", text: "La web informa, pero no guía al usuario ni demuestra la calidad del trabajo." },
      { title: "Tecnología decorativa", text: "Animación o IA aparecen sin una función clara dentro del recorrido comercial." },
    ],
    includes: [
      { title: "Narrativa y arquitectura", text: "Ordenamos el contenido alrededor de decisiones reales del usuario." },
      { title: "Diseño y movimiento", text: "Creamos una interfaz propia, accesible y orientada a mantener la atención." },
      { title: "Desarrollo medible", text: "Construimos con rendimiento, analítica y una base preparada para evolucionar." },
    ],
    steps: ["Estrategia", "Narrativa", "Diseño", "Desarrollo", "Aprendizaje"],
    visual: "web",
    demoHref: "https://portfoliopersonal-nu.vercel.app/",
    demoLabel: "Ver experiencia real",
  },
];

export function getService(slug: string) {
  return services.find((service) => service.slug === slug);
}
