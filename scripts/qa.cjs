const fs = require("node:fs");
const path = require("node:path");
const { chromium } = require("playwright");

const routes = [
  "/",
  "/servicios",
  "/servicios/automatizacion-procesos",
  "/servicios/presupuestacion-tecnica",
  "/servicios/webs-interactivas-ia",
  "/metodo",
  "/nosotros",
  "/diagnostico",
  "/contacto",
  "/privacidad",
  "/terminos",
  "/cookies",
];

const baseUrl = "http://localhost:3000";
const axePath = require.resolve("axe-core/axe.min.js");

(async () => {
  const browser = await chromium.launch({ headless: true, executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe" });
  const report = { routes: [], interactions: {}, failures: [] };

  for (const route of routes) {
    const page = await browser.newPage({ viewport: { width: 1280, height: 900 }, reducedMotion: "reduce" });
    const consoleErrors = [];
    page.on("console", (message) => { if (message.type() === "error") consoleErrors.push(message.text()); });
    page.on("pageerror", (error) => consoleErrors.push(error.message));
    const response = await page.goto(`${baseUrl}${route}`, { waitUntil: "networkidle" });
    await page.addScriptTag({ path: axePath });
    const result = await page.evaluate(async () => {
      const axeResults = await window.axe.run(document, { resultTypes: ["violations"], runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21aa"] } });
      return {
        h1Count: document.querySelectorAll("h1").length,
        title: document.title,
        robots: document.querySelector('meta[name="robots"]')?.getAttribute("content"),
        overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
        violations: axeResults.violations.filter((violation) => ["serious", "critical"].includes(violation.impact)),
      };
    });
    const rawHtml = await (await fetch(`${baseUrl}${route}`)).text();
    const checks = {
      status: response?.status() === 200,
      oneH1: result.h1Count === 1,
      noindex: result.robots?.includes("noindex") === true,
      noOverflow: result.overflow <= 0,
      htmlContainsH1: rawHtml.includes("<h1"),
      cleanConsole: consoleErrors.length === 0,
      a11y: result.violations.length === 0,
      cleanPlaceholders: !/example\.com|azora/i.test(rawHtml),
    };
    for (const [name, passed] of Object.entries(checks)) {
      if (!passed) report.failures.push(`${route}: ${name}`);
    }
    report.routes.push({ route, title: result.title, checks, consoleErrors, violations: result.violations.map(({ id, impact, help, nodes }) => ({ id, impact, help, nodes: nodes.slice(0, 8).map((node) => ({ target: node.target, summary: node.failureSummary })) })) });
    await page.close();
  }

  const mobile = await browser.newPage({ viewport: { width: 390, height: 844 }, reducedMotion: "reduce" });
  await mobile.goto(baseUrl, { waitUntil: "networkidle" });
  const menuButton = mobile.locator('button[aria-controls="mobile-menu"]');
  await menuButton.click();
  report.interactions.mobileMenu = {
    expanded: (await menuButton.getAttribute("aria-expanded")) === "true",
    visibleLinks: await mobile.locator("#mobile-menu a").count(),
  };
  if (!report.interactions.mobileMenu.expanded || report.interactions.mobileMenu.visibleLinks < 5) report.failures.push("mobile menu");
  await mobile.close();

  const form = await browser.newPage({ viewport: { width: 1280, height: 900 }, reducedMotion: "reduce" });
  await form.goto(`${baseUrl}/diagnostico`, { waitUntil: "networkidle" });
  await form.getByRole("button", { name: "Enviar solicitud" }).click();
  report.interactions.formValidation = {
    invalidFields: await form.locator('[aria-invalid="true"]').count(),
    errorMessages: await form.locator('[id$="-error"]').count(),
  };
  if (report.interactions.formValidation.invalidFields < 5 || report.interactions.formValidation.errorMessages < 5) report.failures.push("form validation");
  await form.close();

  const robots = await (await fetch(`${baseUrl}/robots.txt`)).text();
  report.interactions.robots = robots;
  if (!robots.includes("Disallow: /")) report.failures.push("robots disallow");

  await browser.close();
  const output = path.join(process.cwd(), ".artifacts", "qa-report.json");
  fs.mkdirSync(path.dirname(output), { recursive: true });
  fs.writeFileSync(output, JSON.stringify(report, null, 2));
  process.stdout.write(JSON.stringify({ routes: report.routes.length, interactions: report.interactions, failures: report.failures }, null, 2));
  if (report.failures.length) process.exit(1);
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
