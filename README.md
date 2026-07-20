# Web oficial

Sitio corporativo en fase de desarrollo para una consultora de transformación operativa. La identidad definitiva —nombre, logotipo, dominio y paleta— se incorporará antes del lanzamiento público.

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

Mientras `NEXT_PUBLIC_SITE_INDEXABLE` no sea `true`, la web emite `noindex`, `nofollow` y bloquea el rastreo en `robots.txt`. Esta protección debe mantenerse hasta disponer de identidad, dominio y contenido definitivos.

## Despliegue

El proyecto de Vercel está conectado al repositorio de GitHub. Los cambios integrados en la rama principal generan un nuevo despliegue automáticamente.
