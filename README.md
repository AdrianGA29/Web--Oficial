# Temis Λtrile

Sitio corporativo en fase de desarrollo para Temis Λtrile, consultora de transformación operativa. El logotipo, el dominio y el resto de la identidad definitiva se incorporarán antes del lanzamiento público.

## Desarrollo local

```bash
npm install
npm run dev
```

La aplicación estará disponible en `http://localhost:3000`.

## Comprobaciones

```bash
npm run typecheck
npm run build
```

## Variables de entorno

Copia `.env.example` a `.env.local` y completa únicamente los valores disponibles. El formulario necesita `NEXT_PUBLIC_FORMSPREE_ENDPOINT` para enviar solicitudes reales.

Los builds de producción son indexables por defecto. `NEXT_PUBLIC_SITE_INDEXABLE=false` queda reservado para previews privadas y entornos que no deban aparecer en buscadores.

## Despliegue

La web se exporta como contenido estático y se publica en el directorio `/public` del hosting de IONOS. Antes de desplegar se deben ejecutar las comprobaciones de tipos, build y SEO.
