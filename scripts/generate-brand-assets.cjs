// Deterministic vector rasterization; no image-generation service or runtime dependency.
// Use NODE_PATH for the bundled sharp installation, or install sharp in the build environment.
const fs = require("node:fs/promises");
const path = require("node:path");
const sharp = require("sharp");

async function main() {
  const root = path.join(__dirname, "..");
  const icon = await fs.readFile(path.join(root, "app/icon.svg"));
  const logo = await fs.readFile(path.join(root, "public/brand/logo.svg"), "utf8");
  const output = path.join(root, "public/brand");
  for (const size of [48, 96, 192, 512]) {
    await sharp(icon).resize(size, size).png().toFile(path.join(output, `icon-${size}.png`));
  }
  await sharp(icon).resize(180, 180).png().toFile(path.join(root, "public/apple-touch-icon.png"));
  const pngs = await Promise.all([16, 32, 48].map(size => sharp(icon).resize(size, size).png().toBuffer()));
  const header = Buffer.alloc(6 + pngs.length * 16);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(pngs.length, 4);
  let offset = header.length;
  pngs.forEach((png, index) => {
    const entry = 6 + index * 16;
    header[entry] = [16, 32, 48][index];
    header[entry + 1] = header[entry];
    header.writeUInt16LE(1, entry + 4);
    header.writeUInt16LE(32, entry + 6);
    header.writeUInt32LE(png.length, entry + 8);
    header.writeUInt32LE(offset, entry + 12);
    offset += png.length;
  });
  await fs.writeFile(path.join(root, "public/favicon.ico"), Buffer.concat([header, ...pngs]));
  const lightLogo = logo.replaceAll("#010101", "#F5F5F5");
  await sharp(icon).resize(512, 512).png().toFile(path.join(output, "logo-512.png"));
  // A logo-based sharing image replaces the unrelated legacy cloud photograph.
  const sharing = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
    <rect width="1200" height="630" fill="#070B1A"/>
    <path d="M64 92H1136M64 538H1136" stroke="#F5F5F5" stroke-opacity=".12"/>
    <svg x="94" y="179" width="272" height="272" viewBox="42 165 512 512">${lightLogo.replace(/^<svg[^>]*>/, "").replace(/<\/svg>\s*$/, "")}</svg>
    <text x="437" y="287" fill="#F5F5F5" font-family="Montserrat,Arial,sans-serif" font-size="65" font-weight="600" letter-spacing="-2">Temis Atrile</text>
    <text x="440" y="347" fill="#B1A7E6" font-family="Montserrat,Arial,sans-serif" font-size="27">Consultoría estratégica y tecnológica</text>
    <text x="440" y="410" fill="#F5F5F5" opacity=".65" font-family="Montserrat,Arial,sans-serif" font-size="21">temisatrile.com</text>
  </svg>`;
  await sharp(Buffer.from(sharing)).jpeg({ quality: 92 }).toFile(path.join(root, "public/og/social-brand.jpg"));
  console.log("Generated favicon, Apple icon, PNG sizes, organization logo and sharing image.");
}
main().catch(error => { console.error(error); process.exitCode = 1; });
