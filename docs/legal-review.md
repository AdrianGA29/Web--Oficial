# Revisión legal de Temis Atrile — 7 de octubre de 2026

Cambios locales para revisión. No autorizan por sí mismos el despliegue ni constituyen certificación de cumplimiento. Los textos deben ser revisados por un profesional antes de la publicación definitiva.

## Datos verificados en el proyecto

- Marca: Temis Atrile. Razón social facilitada por la empresa: TEMIS ATRILE E.S.P.J. NIF: E93887487.
- Dominio: temisatrile.com. Correo: contacto@temisatrile.com.
- Exportación estática Next.js y formulario PHP propio: no usa Formspree.
- Formulario: nombre, email, teléfono opcional, empresa/proyecto, mensaje, confirmación de información, URL de origen sin parámetros ni fragmento y fecha.
- Correo remitido al buzón corporativo mediante mail() del servidor. Sin base de datos de contactos en este código.
- Antispam: campo trampa, tiempo mínimo de envío y contador por hash SHA-256 de IP en archivos temporales del servidor.
- La ventana de cálculo del contador es 900 segundos, pero el archivo no se elimina automáticamente al vencer esa ventana. No afirmar que esos datos desaparecen a los 15 minutos.
- No se detectan cookies propias, localStorage, sessionStorage, analítica, píxeles, CAPTCHA externo o newsletter en el código de la web. Fuentes y gráficos locales.
- Demos externas: portfoliopersonal-nu.vercel.app y azoragestion.vercel.app. Ahora requieren activación específica en cada apertura y pueden desactivarse. Esto no demuestra por sí solo que el contenido de terceros sea conforme.

## Imprescindible antes de publicar

1. La razón social ya está incorporada. El usuario ha solicitado omitir el domicilio por ahora; completar registeredAddress en lib/legal.ts antes de cerrar el cumplimiento del aviso legal. La omisión se mantiene como pendiente legal, no como exención. Los campos vacíos no se muestran al visitante.
2. Confirmar inscripción registral, si procede, y si hay actividades reguladas, autorizaciones o datos colegiales que deban identificarse. No deducir la forma jurídica únicamente del prefijo del NIF.
3. Verificar la entidad contratada con IONOS, contrato de encargo de tratamiento, subencargados, ubicación, transferencias y garantías. El repositorio no prueba estos extremos. Completar la política si existen transferencias asociadas a hosting/correo.
4. Auditar los dos proyectos externos y sus cookies, almacenamiento y subrecursos. El aviso de activación no sustituye un consentimiento informado para cookies no esenciales ni legitima transferencias sin garantías. Si no se pueden comprobar, no publicar demos incrustadas: mantener solo enlaces externos hasta resolverlo.
5. Revisar los logs reales del hosting y sus plazos, configuración de copias y eliminación de archivos antispam. Definir un procedimiento operativo de eliminación/bloqueo de consultas, archivos y correos. La política usa criterios de conservación, no promete una automatización inexistente.
6. Documentar la ponderación del interés legítimo para otras consultas y antispam; registrar los tratamientos, proveedores y medidas. Revisar quién tiene acceso al buzón y protegerlo con MFA.
7. Establecer el circuito para atender derechos (un mes como regla general), registrar solicitudes y tramitar incidentes de seguridad. Determinar si existe obligación de DPD según la actividad real.
8. Verificar licencias de imágenes, fuentes, logos y SVG: el texto de propiedad intelectual no acredita permisos.
9. No activar analítica/marketing nuevos sin revisar política y consentimiento previo cuando resulte exigible. No enviar publicidad desde la lista de consultas sin base adecuada.

## Decisiones implementadas

- /terminos/ se mantiene para no romper enlaces y pasa a contener Aviso legal y condiciones de uso.
- Datos de identidad centralizados. A petición del usuario, el formulario muestra únicamente un aviso breve de responsable, finalidad y enlace a los derechos; la razón social, NIF y correo se consultan en la política completa.
- La casilla acredita lectura de información, no un consentimiento genérico para toda la política. La solicitud de presupuesto se basa en medidas precontractuales; otras consultas y seguridad tienen bases diferenciadas.
- Sin contratación automática, precios inventados, promesas de resultados o cláusulas de exoneración absoluta. Sin fuero impuesto a consumidores.
- Se informa del canal de derechos, reclamación AEPD y control de demos. No se añade banner genérico para cookies inexistentes en el código propio.
- Cargar una demo no guarda una elección persistente. Desactivar/cerrar desmonta el iframe. No elimina cookies ya creadas por terceros; se explica en la política.

## Fuentes oficiales consultadas

- RGPD, especialmente arts. 5, 6, 12, 13, 15–22, 28, 32 y 44 y siguientes: https://eur-lex.europa.eu/eli/reg/2016/679/oj?locale=es
- LOPDGDD, especialmente arts. 19 y 32: https://www.boe.es/buscar/act.php?id=BOE-A-2018-16673
- LSSI, especialmente arts. 10, 21 y 22: https://www.boe.es/buscar/act.php?id=BOE-A-2002-13758
- AEPD, casilla de privacidad: https://www.aepd.es/preguntas-frecuentes/2-tus-obligaciones-como-responsable-del-tratamiento/6-el-deber-de-informacion/FAQ-0248-sobre-si-el-usuario-tiene-que-dar-consentimiento-a-clausula-de-privacidad
- AEPD, guía de cookies: https://www.aepd.es/guias/guia-cookies.pdf
- Política de Vercel (fuente del proveedor, no normativa): https://vercel.com/legal/privacy-notice

La presencia de políticas y casillas no basta para cumplir: la operativa real y los contratos también deben corresponder a lo publicado.
