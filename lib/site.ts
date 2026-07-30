export const navigation = [
  { label: "Inicio", href: "/#inicio" },
  { label: "Servicios", href: "/servicios" },
  { label: "Nosotros", href: "/nosotros" },
  { label: "Preguntas", href: "/#preguntas" },
] as const;

export const commitments = [
  "Alcance cerrado por escrito",
  "IA siempre supervisada",
  "Primera sesión sin coste",
] as const;

export const challenges = [
  {
    icon: "messages",
    title: "Las consultas llegan, pero no siempre se controlan",
    description:
      "WhatsApp, llamadas y correos conviven sin una vista común. Cuesta saber quién está pendiente y qué oportunidad se está enfriando.",
    question: "¿Sientes que el control de tus clientes se te escapa?",
    featured: true,
  },
  {
    icon: "receipt",
    title: "Los presupuestos se hacen, pero luego se enfrían",
    description:
      "Se preparan, se envían y quedan parados sin aviso, sin próximo paso y sin una forma clara de recuperar la conversación.",
    question: "¿Tus presupuestos se quedan en el olvido?",
    featured: true,
  },
  {
    icon: "files",
    title: "La información vive en demasiados sitios",
    description:
      "Carpetas, notas, Excel y mensajes guardan partes distintas del contexto.",
    question: "¿Localizar un dato depende de preguntar?",
    featured: false,
  },
  {
    icon: "repeat",
    title: "Hay tareas que se repiten cada semana",
    description:
      "Copiar datos, actualizar estados o rehacer documentos consume horas invisibles.",
    question: "¿Tu equipo repite trabajo que podría fluir solo?",
    featured: false,
  },
  {
    icon: "search",
    title: "Falta una vista real de lo que ocurre",
    description:
      "El estado de un proyecto depende de quién lo lleva y de lo que recuerda.",
    question: "¿Necesitas preguntar varias veces para saberlo?",
    featured: false,
  },
  {
    icon: "workflow",
    title: "Tenéis herramientas, pero el proceso sigue siendo manual",
    description:
      "El problema no siempre es comprar software: suele ser conectar bien lo que ya existe.",
    question: "¿La tecnología acompaña de verdad vuestra forma de trabajar?",
    featured: false,
  },
] as const;

export const methodSteps = [
  {
    number: "01",
    title: "Entender cómo trabajáis",
    description:
      "Entramos en la operativa real: personas, herramientas, decisiones y excepciones. Sin vender una solución antes de comprender el problema.",
    output: "Mapa del proceso actual",
  },
  {
    number: "02",
    title: "Detectar el cuello de botella",
    description:
      "Separamos la fricción visible de la causa que la provoca y estimamos su coste en tiempo, riesgo y oportunidades.",
    output: "Prioridad argumentada",
  },
  {
    number: "03",
    title: "Proponer una primera solución útil",
    description:
      "Definimos el cambio más pequeño capaz de producir una mejora relevante, incluyendo límites y criterio de éxito.",
    output: "Hoja de ruta viable",
  },
  {
    number: "04",
    title: "Construir con alcance claro",
    description:
      "Diseñamos, integramos y probamos la solución junto al equipo que la usará. Cada decisión queda documentada.",
    output: "Sistema funcional",
  },
  {
    number: "05",
    title: "Medir, aprender y escalar",
    description:
      "Comprobamos el impacto, corregimos lo necesario y dejamos una base preparada para el siguiente avance.",
    output: "Evolución con criterio",
  },
] as const;

export const differentiators = [
  {
    icon: "sparkles",
    title: "IA aplicada a rentabilidad",
    description:
      "La utilizamos solo cuando reduce carga, mejora una decisión o abre una oportunidad medible. Nunca como decoración.",
  },
  {
    icon: "blocks",
    title: "Herramientas conectadas al trabajo real",
    description:
      "Construimos alrededor de cómo funciona tu empresa, integrando lo que ya aporta valor y eliminando pasos innecesarios.",
  },
  {
    icon: "shield",
    title: "Criterio técnico, legal y financiero",
    description:
      "Una solución no está terminada porque funcione: debe ser segura, viable y sostenible para el negocio.",
  },
] as const;

export const team = [
  {
    name: "Adrian",
    role: "Desarrollador full stack y especialista en sistemas",
    pillar: "Criterio técnico",
    description:
      "Diseña y desarrolla soluciones de principio a fin: arquitectura, interfaces, lógica de negocio, integraciones y automatizaciones convertidas en sistemas rápidos, fiables y preparados para crecer.",
    image: "adrian",
    tone: "blue",
  },
  {
    name: "Patricia",
    role: "Derecho, cumplimiento y estudios internacionales",
    pillar: "Criterio legal",
    description:
      "Aporta una visión jurídica y estratégica completa: traduce regulación, privacidad, contratación y riesgos internacionales en marcos claros para avanzar con seguridad y responsabilidades bien definidas.",
    image: "patricia",
    tone: "gold",
  },
  {
    name: "Alejandro",
    role: "Estrategia, administración y finanzas",
    pillar: "Criterio financiero",
    description:
      "Convierte cada mejora en una decisión de negocio defendible: analiza inversión, retorno, impacto operativo y escalabilidad para priorizar oportunidades rentables y sostener el crecimiento.",
    image: "alejandro",
    tone: "gold",
  },
] as const;

export const faqs = [
  {
    category: "PROYECTO",
    question: "¿Qué tipo de proyectos podéis desarrollar?",
    answer:
      "Trabajamos en desarrollo web, automatizaciones, herramientas internas, aplicaciones a medida y consultoría e implantación de inteligencia artificial. Antes de aceptar un proyecto revisamos el contexto, la viabilidad y si realmente podemos aportar valor.",
  },
  {
    category: "PROYECTO",
    question: "¿Tengo que saber exactamente qué necesito?",
    answer:
      "No. Es suficiente con que puedas explicar qué ocurre ahora, qué os está costando tiempo o qué queréis mejorar. La primera conversación sirve precisamente para ordenar el problema antes de hablar de herramientas.",
  },
  {
    category: "PROCESO",
    question: "¿Cómo empieza la colaboración?",
    answer:
      "Empezamos con una hora de consultoría gratuita y sin compromiso. La dedicamos a conocer la empresa, revisar el contexto y valorar si existe una primera línea de trabajo razonable.",
  },
  {
    category: "PROCESO",
    question: "¿Cuánto cuesta y cuánto tarda un proyecto?",
    answer:
      "Depende del alcance, las integraciones y el punto de partida. No damos una cifra o un plazo genérico sin revisar el caso: antes de empezar dejamos por escrito qué incluye la propuesta, sus fases, el coste y una planificación realista.",
  },
  {
    category: "PROCESO",
    question: "¿Es necesario empezar con un proyecto grande?",
    answer:
      "No. Cuando tiene sentido preferimos una primera fase acotada, útil por sí misma y suficientemente clara para comprobar su valor. Así reducimos riesgo y evitamos transformar toda la operativa de golpe.",
  },
  {
    category: "TECNOLOGÍA",
    question: "¿Tengo que sustituir las herramientas que ya utilizo?",
    answer:
      "Normalmente no. Primero revisamos qué funciona, qué está desconectado y qué puede simplificarse o integrarse. Solo proponemos sustituir una herramienta cuando mantenerla limita de verdad la solución.",
  },
  {
    category: "TECNOLOGÍA",
    question: "¿Cómo abordáis la inteligencia artificial y la seguridad?",
    answer:
      "La IA es una herramienta, no el punto de partida. Definimos qué datos intervienen, qué puede automatizarse y dónde debe existir supervisión humana. En procesos sensibles priorizamos límites claros, trazabilidad y control.",
  },
  {
    category: "CONTINUIDAD",
    question: "¿Qué ocurre después de entregar el proyecto?",
    answer:
      "Acordamos desde el inicio la entrega, los accesos, las licencias, la documentación y la propiedad aplicable a cada elemento. Si el proyecto necesita mantenimiento, soporte o evolución, lo planteamos como una fase separada y transparente.",
  },
] as const;

export const frictionOptions = [
  "Consultas y seguimiento comercial",
  "Presupuestos lentos o sin seguimiento",
  "Información dispersa",
  "Tareas repetitivas",
  "Falta de visibilidad operativa",
  "Herramientas desconectadas",
  "Otro",
] as const;
