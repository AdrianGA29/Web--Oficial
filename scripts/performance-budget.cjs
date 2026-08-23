const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const output = path.join(root, "out");
const landing = path.join(output, "index.html");
const limits = {
  landingHtml: 260 * 1024,
  landingCss: 220 * 1024,
  mobileHero480: 80 * 1024,
  mobileHero640: 115 * 1024,
  mobileHero768: 150 * 1024,
};

if (!fs.existsSync(landing)) {
  throw new Error("No existe out/index.html. Ejecuta npm run build antes del presupuesto.");
}

const html = fs.readFileSync(landing, "utf8");
const cssFiles = [
  ...new Set(
    [...html.matchAll(/href=["']([^"']+\.css)["']/g)].map((match) =>
      path.join(output, match[1].replace(/^\//, "")),
    ),
  ),
];
const cssBytes = cssFiles.reduce(
  (total, file) => total + (fs.existsSync(file) ? fs.statSync(file).size : 0),
  0,
);

const checks = [
  ["HTML inicial", Buffer.byteLength(html), limits.landingHtml],
  ["CSS inicial", cssBytes, limits.landingCss],
  [
    "Temis móvil 480",
    fs.statSync(path.join(root, "assets/images/temis-hero-v2-mobile-480.webp")).size,
    limits.mobileHero480,
  ],
  [
    "Temis móvil 640",
    fs.statSync(path.join(root, "assets/images/temis-hero-v2-mobile-640.webp")).size,
    limits.mobileHero640,
  ],
  [
    "Temis móvil 768",
    fs.statSync(path.join(root, "assets/images/temis-hero-v2-mobile-768.webp")).size,
    limits.mobileHero768,
  ],
];

let failed = false;
for (const [label, bytes, limit] of checks) {
  const passed = bytes <= limit;
  failed ||= !passed;
  console.log(
    `${passed ? "✓" : "✗"} ${label}: ${(bytes / 1024).toFixed(1)} KB / ${(limit / 1024).toFixed(0)} KB`,
  );
}

if (failed) {
  process.exitCode = 1;
}
