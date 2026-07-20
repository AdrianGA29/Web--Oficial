import type { LegalPageContent } from "../types";

export const termsContent: LegalPageContent = {
  eyebrow: "Nueva Empresa",
  title: "Términos y Condiciones de Uso",
  description: "Condiciones de uso del sitio web y sus servicios digitales.",
  updatedAt: "Última actualización: 1 de Junio, 2026",
  intro:
    "Bienvenido. Agradecemos tu confianza. Los siguientes términos regulan el uso de nuestro Sitio y de todos los servicios digitales asociados. Te pedimos que los leas atentamente antes de continuar.",
  contactTitle: "¿Tienes alguna duda sobre nuestros términos?",
  contactText: (
    <>
      Nuestro equipo legal está a tu entera disposición para resolver cualquier duda. Escríbenos
      directamente a:{" "}
      <a href="mailto:administracion@example.com" className="font-bold text-[#2b6cb0] hover:underline">
        administracion@example.com
      </a>
    </>
  ),
  sections: [
    {
      id: "1",
      title: "Aceptación de los Términos",
      text: "Al acceder, navegar o utilizar este sitio web (el 'Sitio') y los servicios de consultoría, marketing estratégico o adopción tecnológica proporcionados por la empresa, aceptas cumplir y estar sujeto a estos Términos y Condiciones de Uso y a todas las leyes y regulaciones aplicables. Si no estás de acuerdo con alguno de estos términos, tienes prohibido utilizar o acceder a este Sitio.",
    },
    {
      id: "2",
      title: "Descripción de los Servicios",
      text: "La empresa está especializada en consultoría, digitalización empresarial, diseño, sistemas internos, automatización e inteligencia artificial aplicada. Los materiales y servicios contenidos en este Sitio se proporcionan de buena fe. La empresa se reserva el derecho de modificar, actualizar o discontinuar cualquier servicio o aspecto del Sitio en cualquier momento sin previo aviso.",
    },
    {
      id: "3",
      title: "Propiedad Intelectual",
      text: "Todos los contenidos, marcas comerciales, logotipos, diseños, código fuente, interfaces y materiales en general expuestos en este Sitio son propiedad exclusiva de la empresa o se utilizan bajo licencia autorizada, protegidos por leyes internacionales de propiedad intelectual. Queda expresamente prohibida la reproducción, distribución, modificación o comunicación pública de cualquier parte del Sitio sin consentimiento escrito previo.",
    },
    {
      id: "4",
      title: "Limitación de Responsabilidad",
      text: "En ningún caso la empresa, sus directores, empleados o proveedores serán responsables por daños de cualquier naturaleza (incluyendo pérdida de datos, lucro cesante o interrupción del negocio) surgidos del uso o de la imposibilidad de uso del Sitio o de sus servicios de consultoría, incluso si la empresa ha sido notificada verbalmente o por escrito de la posibilidad de tales daños.",
    },
    {
      id: "5",
      title: "Enlaces a Terceros",
      text: "Este Sitio puede contener enlaces a sitios web de terceros que no son de nuestra propiedad ni están controlados por nosotros. La empresa no tiene control ni asume responsabilidad alguna por el contenido, políticas de privacidad o prácticas de los sitios de terceros. Te recomendamos leer los términos y políticas de cualquier sitio web externo que visites.",
    },
    {
      id: "6",
      title: "Modificaciones de los Términos",
      text: "La empresa se reserva el derecho de revisar y modificar estos Términos y Condiciones en cualquier momento sin previo aviso. Al utilizar este Sitio, aceptas estar sujeto a la versión vigente en el momento de tu acceso. Te sugerimos revisar esta página de manera periódica.",
    },
    {
      id: "7",
      title: "Jurisdicción y Ley Aplicable",
      text: "Cualquier reclamo relacionado con el Sitio o los servicios de la empresa se regirá por las leyes vigentes aplicables en el territorio, sometiéndose las partes a la jurisdicción exclusiva de los tribunales competentes en caso de cualquier disputa o controversia.",
    },
  ],
};

export const privacyContent: LegalPageContent = {
  eyebrow: "Privacidad",
  title: "Política de Privacidad y Cookies",
  description: "Información sobre recopilación, uso y protección de datos personales.",
  updatedAt: "Última actualización: 1 de Junio, 2026",
  intro:
    "Tu privacidad es nuestra máxima prioridad. Esta política describe con total transparencia qué datos recopilamos de nuestros usuarios, cómo los utilizamos y qué estrictas medidas tomamos para protegerlos.",
  contactTitle: "¿Deseas ejercer tus derechos ARCO o hacer una consulta?",
  contactText: (
    <>
      Puedes comunicarte directamente con nuestro delegado de protección de datos escribiéndonos un
      correo a:{" "}
      <a href="mailto:administracion@example.com" className="font-bold text-[#2b6cb0] hover:underline">
        administracion@example.com
      </a>
    </>
  ),
  sections: [
    {
      id: "1",
      title: "Información que Recopilamos",
      text: "Recopilamos información personal que nos proporcionas directamente de forma voluntaria al registrarte, enviar formularios de contacto, solicitar demos o suscribirte a nuestros canales de comunicación. Esto incluye tu nombre completo, dirección de correo electrónico, número de teléfono corporativo, nombre de tu empresa, cargo y cualquier detalle provisto en tus consultas.",
    },
    {
      id: "2",
      title: "Uso de la Información",
      text: "Utilizamos tus datos para proveer, operar y mejorar las soluciones y la consultoría tecnológica; gestionar tus citas y demostraciones gratuitas; enviar notificaciones operativas; responder consultas de soporte; y enviar comunicaciones de marketing y novedades de adopción digital (siempre que nos hayas otorgado tu consentimiento explícito, pudiendo revocarlo en cualquier momento).",
    },
    {
      id: "3",
      title: "Base Legal para el Procesamiento",
      text: "De acuerdo con las regulaciones internacionales de protección de datos (como el RGPD), procesamos tu información personal bajo las siguientes bases legales: tu consentimiento expreso brindado al completar formularios; para la ejecución de un contrato o acuerdo de servicios contigo; para cumplir con obligaciones legales; y para el interés legítimo de mejorar nuestros servicios, garantizando siempre tus libertades esenciales.",
    },
    {
      id: "4",
      title: "Retención y Seguridad de Datos",
      text: "Retenemos tus datos únicamente durante el periodo necesario para cumplir con los fines descritos en esta política o según lo requieran las obligaciones legales. Implementamos medidas de seguridad técnicas, lógicas y organizativas avanzadas (incluyendo cifrado de datos en tránsito y reposo, y firewalls) para evitar el acceso no autorizado, la alteración, divulgación o pérdida accidental de tu información.",
    },
    {
      id: "5",
      title: "Tus Derechos (Derechos ARCO)",
      text: "Tienes derechos plenos sobre tus datos personales: derecho a acceder a tu información; a rectificar o actualizar cualquier dato inexacto o incompleto; a solicitar la eliminación o cancelación de tus datos de nuestras bases; y a oponerte o limitar su procesamiento legal. Puedes ejercer cualquiera de estos derechos escribiéndonos en cualquier momento.",
    },
    {
      id: "6",
      title: "Uso de Cookies y Tecnologías Afines",
      text: "Utilizamos cookies esenciales y de análisis sutiles para entender cómo interactúas con nuestro Sitio, recordar tus preferencias, optimizar la carga de la página y medir la efectividad de nuestras campañas de marketing. Puedes configurar tu navegador en cualquier momento para deshabilitar las cookies parcial o totalmente, aunque esto podría limitar ciertas funciones del Sitio.",
    },
    {
      id: "7",
      title: "Contacto y Responsable de Privacidad",
      text: "El responsable del tratamiento de tus datos es la empresa titular del sitio. Si deseas ejercer tus derechos legales de privacidad, realizar consultas o presentar reclamos sobre esta política, puedes ponerte en contacto directo con nuestra unidad de privacidad mediante correo electrónico.",
    },
  ],
};
