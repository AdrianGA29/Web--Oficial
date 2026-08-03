const fs = require("node:fs");
const path = require("node:path");

const outputDirectory = path.join(process.cwd(), "out");
const expectedPages = [
  ["/", "index.html", ["Organization", "WebSite", "FAQPage"]],
  ["/servicios/", "servicios/index.html", ["CollectionPage", "BreadcrumbList"]],
  ["/servicios/desarrollo-web/", "servicios/desarrollo-web/index.html", ["Service", "BreadcrumbList"]],
  ["/servicios/automatizacion/", "servicios/automatizacion/index.html", ["Service", "BreadcrumbList"]],
  ["/servicios/aplicaciones-a-medida/", "servicios/aplicaciones-a-medida/index.html", ["Service", "BreadcrumbList"]],
  ["/servicios/inteligencia-artificial/", "servicios/inteligencia-artificial/index.html", ["Service", "BreadcrumbList"]],
  ["/nosotros/", "nosotros/index.html", ["AboutPage", "BreadcrumbList"]],
  ["/privacidad/", "privacidad/index.html", []],
  ["/terminos/", "terminos/index.html", []],
  ["/cookies/", "cookies/index.html", []],
];

const failures = [];
const results = [];

function extract(html, pattern) {
  return html.match(pattern)?.[1]?.trim() ?? "";
}

function collectTypes(value, result = new Set()) {
  if (Array.isArray(value)) {
    value.forEach((item) => collectTypes(item, result));
  } else if (value && typeof value === "object") {
    if (typeof value["@type"] === "string") result.add(value["@type"]);
    Object.values(value).forEach((item) => collectTypes(item, result));
  }
  return result;
}

for (const [route, relativeFile, requiredSchemaTypes] of expectedPages) {
  const file = path.join(outputDirectory, relativeFile);
  if (!fs.existsSync(file)) {
    failures.push(`${route}: falta ${relativeFile}`);
    continue;
  }

  const html = fs.readFileSync(file, "utf8");
  const title = extract(html, /<title>(.*?)<\/title>/is);
  const description = extract(
    html,
    /<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)/is,
  );
  const robots = extract(
    html,
    /<meta[^>]+name=["']robots["'][^>]+content=["']([^"']*)/is,
  );
  const canonical = extract(
    html,
    /<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']*)/is,
  );
  const openGraphImage = extract(
    html,
    /<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']*)/is,
  );
  const h1Count = (html.match(/<h1\b/gi) ?? []).length;
  const expectedCanonical = `https://temisatrile.com${route}`;
  const schemaTypes = new Set();

  for (const match of html.matchAll(/<script[^>]+type=["']application\/ld\+json["'][^>]*>(.*?)<\/script>/gis)) {
    try {
      collectTypes(JSON.parse(match[1]), schemaTypes);
    } catch {
      failures.push(`${route}: JSON-LD no válido`);
    }
  }

  if (!title) failures.push(`${route}: falta title`);
  if (!description) failures.push(`${route}: falta meta description`);
  if (/noindex|nofollow/i.test(robots)) failures.push(`${route}: robots=${robots}`);
  if (canonical !== expectedCanonical) {
    failures.push(`${route}: canonical ${canonical || "ausente"}`);
  }
  if (h1Count !== 1) failures.push(`${route}: ${h1Count} elementos h1`);
  for (const schemaType of requiredSchemaTypes) {
    if (!schemaTypes.has(schemaType)) {
      failures.push(`${route}: falta JSON-LD ${schemaType}`);
    }
  }

  if (openGraphImage !== "https://temisatrile.com/og/social.jpg") {
    failures.push(`${route}: og:image ${openGraphImage || "ausente"}`);
  }

  results.push({ route, title, canonical, openGraphImage, h1Count, schemaTypes: [...schemaTypes] });
}

const robotsFile = path.join(outputDirectory, "robots.txt");
const sitemapFile = path.join(outputDirectory, "sitemap.xml");

if (!fs.existsSync(robotsFile)) {
  failures.push("falta robots.txt");
} else {
  const robots = fs.readFileSync(robotsFile, "utf8");
  if (/Disallow:\s*\/$/im.test(robots)) failures.push("robots.txt bloquea todo el sitio");
  if (!/Allow:\s*\/$/im.test(robots)) failures.push("robots.txt no declara Allow: /");
  if (!robots.includes("https://temisatrile.com/sitemap.xml")) {
    failures.push("robots.txt no enlaza el sitemap canónico");
  }
}

if (!fs.existsSync(sitemapFile)) {
  failures.push("falta sitemap.xml");
} else {
  const sitemap = fs.readFileSync(sitemapFile, "utf8");
  for (const [route] of expectedPages) {
    const expectedUrl = `https://temisatrile.com${route}`;
    if (!sitemap.includes(`<loc>${expectedUrl}</loc>`)) {
      failures.push(`sitemap: falta ${expectedUrl}`);
    }
  }
}

process.stdout.write(`${JSON.stringify({ pages: results, failures }, null, 2)}\n`);
if (failures.length > 0) process.exit(1);
