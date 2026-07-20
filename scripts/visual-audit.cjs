const fs = require("node:fs");
const path = require("node:path");
const { chromium } = require("playwright");

const output = path.join(process.cwd(), ".artifacts");
fs.mkdirSync(output, { recursive: true });

const cases = [
  { name: "home-desktop", url: "/", viewport: { width: 1440, height: 1000 }, fullPage: true },
  { name: "home-mobile", url: "/", viewport: { width: 390, height: 844 }, fullPage: true },
  { name: "services-desktop", url: "/servicios", viewport: { width: 1440, height: 1000 }, fullPage: false },
  { name: "diagnostic-mobile", url: "/diagnostico", viewport: { width: 390, height: 844 }, fullPage: false },
];

(async () => {
  const browser = await chromium.launch({ headless: true, executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe" });
  const report = [];
  for (const item of cases) {
    const page = await browser.newPage({ viewport: item.viewport, reducedMotion: "reduce", deviceScaleFactor: 1 });
    const errors = [];
    page.on("console", (message) => { if (message.type() === "error") errors.push(message.text()); });
    page.on("pageerror", (error) => errors.push(error.message));
    await page.goto(`http://localhost:3000${item.url}`, { waitUntil: "networkidle" });
    if (item.fullPage) {
      const height = await page.evaluate(() => document.documentElement.scrollHeight);
      for (let y = 0; y < height; y += Math.max(500, item.viewport.height * 0.7)) {
        await page.evaluate((nextY) => window.scrollTo(0, nextY), y);
        await page.waitForTimeout(40);
      }
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(80);
    }
    const metrics = await page.evaluate(() => ({
      title: document.title,
      width: document.documentElement.scrollWidth,
      viewport: document.documentElement.clientWidth,
      h1: document.querySelector("h1")?.textContent?.trim(),
      robots: document.querySelector('meta[name="robots"]')?.getAttribute("content"),
      links: document.querySelectorAll("a[href]").length,
    }));
    await page.screenshot({ path: path.join(output, `${item.name}.png`), fullPage: item.fullPage });
    if (item.url === "/" && item.viewport.width === 1440) {
      for (const selector of ["#inicio", "#desafios", "#soluciones", "#metodo", "#equipo", "#contacto"]) {
        await page.locator(selector).screenshot({ path: path.join(output, `section-${selector.slice(1)}.png`) });
      }
    }
    if (item.url === "/" && item.viewport.width === 390) {
      for (const selector of ["#inicio", "#desafios", "#soluciones", "#contacto"]) {
        await page.locator(selector).screenshot({ path: path.join(output, `mobile-${selector.slice(1)}.png`) });
      }
    }
    report.push({ ...item, metrics, errors });
    await page.close();
  }
  await browser.close();
  process.stdout.write(JSON.stringify(report, null, 2));
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
