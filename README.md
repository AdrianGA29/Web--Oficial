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

Desde la carpeta del proyecto, con las dependencias instaladas y OpenSSH y `tar` disponibles:

```bash
npm run deploy:ionos
```

Este comando publica la versión local, incluidos cambios aún no enviados a GitHub. Compila la web, comprueba `out/index.html` y sus recursos, y sube el contenido de `out/` a `/home/www/public` (la carpeta `public` del panel de IONOS). Subirá `_next` antes que las páginas, no borrará archivos publicados y comprobará que el sitio público sirve la nueva versión. Si SSH solicita contraseña, introdúcela en la consola; el script no la guarda. Una clave SSH configurada previamente también funciona.

Para probar la compilación y la exportación sin conectarte a IONOS: `npm run deploy:ionos -- --check`.
