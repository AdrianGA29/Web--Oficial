export type DetailServiceId = "automation" | "apps" | "ai";

export type DetailService = {
  id: DetailServiceId;
  slug: string;
  number: string;
  eyebrow: string;
  meta: string;
  hero: string;
  lead: string;
  heroAction: string;
  valueKicker: string;
  valueTitle: string;
  valueIntro: string;
  outcomes: readonly {
    number: string;
    title: string;
    text: string;
  }[];
  comparisonKicker: string;
  comparisonTitle: string;
  comparisonIntro: string;
  comparisonBefore: string;
  comparisonAfter: string;
  comparison: readonly (readonly [string, string])[];
  solutionsKicker: string;
  solutionsTitle: string;
  solutionsIntro: string;
  solutions: readonly {
    number: string;
    title: string;
    detail: string;
    text: string;
  }[];
  capabilityKicker: string;
  capabilityTitle: string;
  capabilityIntro: string;
  capabilityTags: readonly string[];
  processKicker: string;
  processTitle: string;
  processIntro: string;
  process: readonly (readonly [string, string, string])[];
  ctaKicker: string;
  ctaTitle: string;
  ctaText: string;
  previous: { label: string; meta: string; href: string };
  next: { label: string; meta: string; href: string };
};

export const serviceDetails: Record<DetailServiceId, DetailService> = {
  automation: {
    id: "automation",
    slug: "automatizacion",
    number: "02",
    eyebrow: "AUTOMATIZACIÓN E INTEGRACIONES",
    meta: "FLUJOS + TRAZABILIDAD",
    hero: "Tu equipo no debería hacer de puente entre herramientas que no se hablan.",
    lead:
      "Conectamos tareas, información y herramientas para reducir trabajo manual sin perder control, responsables ni capacidad de revisión.",
    heroAction: "Revisar un proceso repetitivo",
    valueKicker: "CUANDO COPIAR, PREGUNTAR Y ACORDARSE YA NO ESCALA",
    valueTitle: "La información avanza. Las personas intervienen donde aportan criterio.",
    valueIntro:
      "El coste de un proceso manual no está solo en las horas. También aparece en datos duplicados, respuestas tardías, pasos olvidados y decisiones sin contexto.",
    outcomes: [
      {
        number: "01",
        title: "El dato se introduce una vez",
        text: "La misma información puede reutilizarse en documentos, avisos y herramientas sin volver a copiarla.",
      },
      {
        number: "02",
        title: "El siguiente paso no depende de la memoria",
        text: "Estados, condiciones y fechas pueden activar avisos o acciones sin perseguir a cada responsable.",
      },
      {
        number: "03",
        title: "El estado deja de exigir tres mensajes",
        text: "Responsable, último cambio y siguiente acción quedan visibles en un punto compartido.",
      },
      {
        number: "04",
        title: "La excepción llega a la persona adecuada",
        text: "El sistema avanza lo repetible y se detiene cuando una decisión necesita criterio humano.",
      },
    ],
    comparisonKicker: "PROCESO MANUAL / FLUJO CONECTADO",
    comparisonTitle: "El trabajo repetitivo no debería esconder el error hasta que lo ve el cliente.",
    comparisonIntro:
      "Conectar un proceso no significa automatizarlo todo. Significa decidir qué puede avanzar solo y qué debe detenerse para revisión.",
    comparisonBefore: "PROCESO DISPERSO",
    comparisonAfter: "FLUJO CONECTADO",
    comparison: [
      ["El mismo dato se copia en correo, hoja y programa.", "Se captura una vez y se reutiliza donde hace falta."],
      ["Para conocer el estado hay que preguntar a varias personas.", "Estado, responsable y siguiente acción quedan visibles."],
      ["Los avisos dependen de que alguien se acuerde.", "Fechas y condiciones activan el seguimiento adecuado."],
      ["El error aparece cuando el cliente ya lo ha sufrido.", "Validaciones y excepciones pueden detener el flujo antes."],
    ],
    solutionsKicker: "POSIBLES SOLUCIONES",
    solutionsTitle: "Procesos concretos. Mejoras que se pueden comprobar.",
    solutionsIntro:
      "La primera automatización debe resolver una fricción reconocible y funcionar por sí misma, aunque después pueda conectarse con otras áreas.",
    solutions: [
      {
        number: "01",
        title: "Solicitudes y oportunidades",
        detail: "CAPTURA / ASIGNACIÓN / SEGUIMIENTO",
        text: "Clasificación y seguimiento desde una entrada común, con contexto y responsable.",
      },
      {
        number: "02",
        title: "Documentos y presupuestos",
        detail: "DATOS / PLANTILLAS / REVISIÓN",
        text: "Generación de borradores a partir de información validada, manteniendo una revisión antes del envío.",
      },
      {
        number: "03",
        title: "Avisos y vencimientos",
        detail: "ESTADOS / FECHAS / RESPONSABLES",
        text: "Recordatorios vinculados a condiciones reales del proceso, no a la memoria personal.",
      },
      {
        number: "04",
        title: "Sincronización de datos",
        detail: "CRM / ERP / CORREO / APIS",
        text: "Información coherente entre formularios, herramientas de gestión y bases de datos.",
      },
    ],
    capabilityKicker: "EJEMPLO DE APLICACIÓN",
    capabilityTitle: "Una consulta entra. El seguimiento comienza sin copiarla tres veces.",
    capabilityIntro:
      "El formulario valida la información, registra la oportunidad, asigna un responsable y prepara el siguiente contacto. La persona conserva la decisión; el sistema se ocupa del recorrido.",
    capabilityTags: ["Integraciones", "Estados", "Supervisión"],
    processKicker: "IMPLANTACIÓN / 04 ETAPAS",
    processTitle: "Automatizar empieza por entender dónde puede fallar el proceso.",
    processIntro:
      "Primero reconstruimos el recorrido real. Después definimos estados, excepciones y responsables antes de conectar ninguna herramienta.",
    process: [
      ["01", "Mapear", "Entradas, decisiones, responsables, herramientas y excepciones del proceso actual."],
      ["02", "Acotar", "Elegir una primera fricción útil y definir qué debe seguir siendo manual."],
      ["03", "Conectar", "Integraciones, reglas, validaciones, permisos y avisos con trazabilidad."],
      ["04", "Comprobar", "Pruebas con casos reales, documentación y ajustes antes de ampliar el alcance."],
    ],
    ctaKicker: "PRIMERA HORA DE CONSULTORÍA / GRATUITA Y SIN COMPROMISO",
    ctaTitle: "¿Qué tarea se repite demasiado en tu empresa?",
    ctaText:
      "Descríbenos el proceso tal como ocurre hoy. Te ayudaremos a distinguir qué conviene conectar, automatizar o mantener manual.",
    previous: { label: "Desarrollo web", meta: "01 / INTERFACES", href: "/servicios/desarrollo-web" },
    next: { label: "Aplicaciones a medida", meta: "03 / SOFTWARE", href: "/servicios/aplicaciones-a-medida" },
  },
  apps: {
    id: "apps",
    slug: "aplicaciones-a-medida",
    number: "03",
    eyebrow: "APLICACIONES Y HERRAMIENTAS INTERNAS",
    meta: "SOFTWARE + OPERACIONES",
    hero: "Cuando las herramientas de siempre ya no siguen el ritmo de tu empresa.",
    lead:
      "Creamos aplicaciones internas, paneles y sistemas de gestión alrededor de la forma real en que trabaja tu equipo.",
    heroAction: "Explorar una herramienta interna",
    valueKicker: "EL SOFTWARE SE ADAPTA AL PROCESO, NO AL REVÉS",
    valueTitle: "Tu equipo no debería trabajar alrededor de las limitaciones de una herramienta.",
    valueIntro:
      "Cuando las hojas de cálculo, los programas aislados o las soluciones genéricas empiezan a ocultar información, diseñamos una herramienta proporcionada al proceso y preparada para evolucionar.",
    outcomes: [
      {
        number: "01",
        title: "Una única versión de la operativa",
        text: "Clientes, estados, documentos y responsables dejan de contradecirse entre archivos y herramientas.",
      },
      {
        number: "02",
        title: "Menos rodeos para completar una tarea",
        text: "Pantallas, campos y acciones siguen el trabajo real, incluidas sus excepciones.",
      },
      {
        number: "03",
        title: "El conocimiento no vive en una persona",
        text: "Reglas, cálculos e historial conservan el criterio para poder entenderlo, revisarlo y transferirlo.",
      },
      {
        number: "04",
        title: "La inversión empieza por el cuello de botella",
        text: "La primera versión se centra en lo que limita hoy al equipo y deja una base preparada para ampliar.",
      },
    ],
    comparisonKicker: "HERRAMIENTA / ENCAJE OPERATIVO",
    comparisonTitle: "Una herramienta útil refleja el trabajo real, incluidas sus excepciones.",
    comparisonIntro:
      "No se trata de construir más software. Se trata de reunir contexto, reglas y acciones en el punto donde hoy se pierde control.",
    comparisonBefore: "SOFTWARE GENÉRICO",
    comparisonAfter: "HERRAMIENTA A MEDIDA",
    comparison: [
      ["El equipo adapta su trabajo a pasos que no encajan.", "La herramienta refleja el proceso y sus excepciones."],
      ["Se pagan módulos que nadie utiliza.", "La primera fase prioriza funciones con valor operativo."],
      ["La información termina en notas y hojas paralelas.", "Cada registro reúne contexto, estado y responsable."],
      ["Las reglas importantes solo las conoce una persona.", "Cálculos, criterios e historial quedan dentro del sistema."],
    ],
    solutionsKicker: "POSIBLES SOLUCIONES",
    solutionsTitle: "Una herramienta para el punto donde hoy se pierde control.",
    solutionsIntro:
      "No empezamos construyendo una plataforma completa. Identificamos la parte del trabajo que necesita orden y diseñamos una primera versión útil.",
    solutions: [
      {
        number: "01",
        title: "Gestión comercial",
        detail: "OPORTUNIDADES / TAREAS / SEGUIMIENTO",
        text: "Conversaciones, propuestas y siguientes acciones reunidas alrededor del trabajo comercial diario.",
      },
      {
        number: "02",
        title: "Presupuestación técnica",
        detail: "VARIABLES / COSTES / VERSIONES",
        text: "Cálculos, márgenes y revisiones dentro de un recorrido comprensible y trazable.",
      },
      {
        number: "03",
        title: "Pedidos y proyectos",
        detail: "ESTADOS / EQUIPO / DOCUMENTACIÓN",
        text: "Responsables, incidencias, entregas y archivos compartiendo una única visión del trabajo.",
      },
      {
        number: "04",
        title: "Paneles operativos",
        detail: "DATOS / PRIORIDADES / DECISIÓN",
        text: "Información priorizada para saber qué ocurre, qué está bloqueado y dónde actuar.",
      },
    ],
    capabilityKicker: "PRODUCTO EN FUNCIONAMIENTO",
    capabilityTitle: "Actividad comercial dispersa convertida en una herramienta visible.",
    capabilityIntro:
      "Una demostración con panel, bandeja, oportunidades y seguimiento reunidos alrededor del trabajo comercial diario.",
    capabilityTags: ["CRM comercial", "Flujos operativos", "Seguimiento", "Panel responsive"],
    processKicker: "DESARROLLO / 04 ETAPAS",
    processTitle: "La primera versión debe ser pequeña, útil y coherente con lo que vendrá después.",
    processIntro:
      "Diseñamos alrededor del uso real y validamos pronto las decisiones costosas: estructura de datos, permisos, flujos e integraciones.",
    process: [
      ["01", "Entender", "Proceso, usuarios, información, reglas y punto exacto donde se pierde control."],
      ["02", "Prototipar", "Recorrido y pantallas clave antes de comprometer toda la construcción."],
      ["03", "Construir", "Arquitectura, interfaz, datos, permisos e integraciones por entregas verificables."],
      ["04", "Evolucionar", "Uso real, ajustes y nuevas funciones solo cuando el sistema ya tiene una base estable."],
    ],
    ctaKicker: "PRIMERA HORA DE CONSULTORÍA / GRATUITA Y SIN COMPROMISO",
    ctaTitle: "¿Qué herramienta está limitando hoy a tu equipo?",
    ctaText:
      "Cuéntanos dónde se reparte la información o qué proceso depende demasiado de hojas, memoria y pasos manuales.",
    previous: { label: "Automatización", meta: "02 / FLUJOS", href: "/servicios/automatizacion" },
    next: { label: "Inteligencia artificial", meta: "04 / IA APLICADA", href: "/servicios/inteligencia-artificial" },
  },
  ai: {
    id: "ai",
    slug: "inteligencia-artificial",
    number: "04",
    eyebrow: "INTELIGENCIA ARTIFICIAL APLICADA",
    meta: "DATOS + SUPERVISIÓN",
    hero: "Inteligencia artificial para una tarea concreta. Con control humano.",
    lead:
      "Analizamos, probamos e implantamos IA cuando aporta una ventaja real frente a una solución más sencilla y puede utilizarse con límites claros.",
    heroAction: "Valorar un caso de uso",
    valueKicker: "PRIMERO LA TAREA. DESPUÉS LA TECNOLOGÍA",
    valueTitle: "IA sin saber qué datos toca, quién responde y cómo se revisa no es innovación.",
    valueIntro:
      "Partimos de un resultado concreto. Revisamos información, errores posibles, proveedor, accesos e intervención humana antes de decidir si la IA es realmente la opción adecuada.",
    outcomes: [
      {
        number: "01",
        title: "Primero decidimos si hace falta IA",
        text: "Si una automatización convencional resuelve mejor el problema, no añadimos complejidad innecesaria.",
      },
      {
        number: "02",
        title: "Los datos no se suben sin saber adónde van",
        text: "Revisamos qué información entra, qué proveedor interviene, quién accede y bajo qué condiciones.",
      },
      {
        number: "03",
        title: "Una prueba antes de comprometer el proceso",
        text: "Calidad, fallos y límites se comprueban con ejemplos representativos antes de implantar.",
      },
      {
        number: "04",
        title: "La decisión importante conserva responsable",
        text: "Definimos qué puede sugerir la IA, qué debe revisar una persona y cuándo detener el sistema.",
      },
    ],
    comparisonKicker: "IA IMPROVISADA / IA CON CRITERIO",
    comparisonTitle: "La IA útil empieza por poner límites antes de ponerla a trabajar.",
    comparisonIntro:
      "El modelo es solo una pieza. La utilidad depende también de la finalidad, los datos, las fuentes, la evaluación y la persona que responde por el resultado.",
    comparisonBefore: "IA IMPROVISADA",
    comparisonAfter: "IA CON CRITERIO",
    comparison: [
      ["Se elige una herramienta porque todo el mundo habla de ella.", "Se compara la IA con alternativas más sencillas."],
      ["Se suben documentos sin revisar proveedor ni condiciones.", "Se define qué dato entra, para qué y bajo qué acceso."],
      ["La primera respuesta se convierte en resultado final.", "Se fijan revisión humana, límites y excepciones."],
      ["Se implanta sin medir errores ni impacto.", "Una prueba valida calidad, riesgos y utilidad."],
    ],
    solutionsKicker: "POSIBLES SOLUCIONES",
    solutionsTitle: "Asistencia donde el volumen supera al tiempo disponible.",
    solutionsIntro:
      "La IA puede apoyar tareas de lectura, clasificación, búsqueda o preparación de borradores. La decisión final sigue teniendo contexto y responsable.",
    solutions: [
      {
        number: "01",
        title: "Documentos",
        detail: "EXTRACCIÓN / CLASIFICACIÓN / RESUMEN",
        text: "Extraer datos, ordenar contenido y preparar síntesis para una revisión posterior.",
      },
      {
        number: "02",
        title: "Consultas",
        detail: "INTENCIÓN / CONTEXTO / BORRADOR",
        text: "Organizar solicitudes, identificar la necesidad y proponer una primera respuesta.",
      },
      {
        number: "03",
        title: "Conocimiento interno",
        detail: "BÚSQUEDA / FUENTES / RESPUESTA",
        text: "Localizar información y responder únicamente sobre documentación autorizada.",
      },
      {
        number: "04",
        title: "Apoyo comercial",
        detail: "INVESTIGACIÓN / SÍNTESIS / REVISIÓN",
        text: "Preparar análisis y borradores sin automatizar decisiones comerciales sensibles.",
      },
    ],
    capabilityKicker: "EJEMPLO DE APLICACIÓN",
    capabilityTitle: "Cincuenta documentos no deberían exigir cincuenta búsquedas manuales.",
    capabilityIntro:
      "Un asistente localiza contenido, extrae campos y prepara una síntesis. La persona consulta la fuente, corrige el resultado y decide qué hacer con la información.",
    capabilityTags: ["Extracción", "Síntesis", "Fuentes", "Validación humana"],
    processKicker: "IMPLANTACIÓN / 04 ETAPAS",
    processTitle: "Una prueba controlada vale más que una promesa difícil de verificar.",
    processIntro:
      "Definimos el caso de uso, los datos y el criterio de evaluación antes de integrar. Solo avanzamos cuando la prueba demuestra utilidad suficiente.",
    process: [
      ["01", "Enmarcar", "Tarea, resultado esperado, alternativas y decisiones que nunca debe tomar el sistema."],
      ["02", "Revisar", "Datos, finalidad, accesos, proveedor, conservación y posibles riesgos."],
      ["03", "Probar", "Ejemplos representativos, errores, calidad, fuentes y coste de operación."],
      ["04", "Gobernar", "Supervisión humana, límites, trazabilidad, documentación y revisión continua."],
    ],
    ctaKicker: "PRIMERA HORA DE CONSULTORÍA / GRATUITA Y SIN COMPROMISO",
    ctaTitle: "¿Tienes una tarea en mente, pero no sabes si necesita IA?",
    ctaText:
      "La revisamos contigo. Si una automatización convencional o una herramienta más sencilla encaja mejor, también te lo diremos.",
    previous: { label: "Aplicaciones a medida", meta: "03 / SOFTWARE", href: "/servicios/aplicaciones-a-medida" },
    next: { label: "Desarrollo web", meta: "01 / INTERFACES", href: "/servicios/desarrollo-web" },
  },
};

