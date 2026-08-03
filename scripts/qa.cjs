const fs = require("node:fs");
const path = require("node:path");
const { chromium } = require("playwright");

const routes = [
  "/",
  "/servicios/",
  "/servicios/desarrollo-web/",
  "/servicios/automatizacion/",
  "/servicios/aplicaciones-a-medida/",
  "/servicios/inteligencia-artificial/",
  "/nosotros/",
  "/privacidad/",
  "/terminos/",
  "/cookies/",
];

const baseUrl = process.env.QA_BASE_URL ?? "http://localhost:3000";
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
      indexable: result.robots?.includes("noindex") !== true,
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

  const experience = await browser.newPage({ viewport: { width: 1440, height: 900 }, reducedMotion: "no-preference" });
  await experience.goto(baseUrl, { waitUntil: "networkidle" });
  const showcase = experience.locator("#soluciones");
  await showcase.scrollIntoViewIfNeeded();
  await experience.getByRole("button", { name: "Ver la web aquí" }).click();
  const dialog = experience.locator("dialog[open]");
  await dialog.waitFor({ state: "visible" });
  await experience.locator("dialog iframe").waitFor({ state: "visible" });
  await experience.waitForTimeout(900);
  await experience.addScriptTag({ path: axePath });
  const experienceA11y = await experience.evaluate(async () => {
    const result = await window.axe.run(document, { resultTypes: ["violations"], runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21aa"] } });
    return result.violations.filter((violation) => ["serious", "critical"].includes(violation.impact)).map(({ id, help }) => ({ id, help }));
  });
  report.interactions.experiencePreview = {
    examples: await showcase.locator("article").count(),
    budgetExampleVisible: await showcase.getByText("Presupuestación técnica", { exact: false }).count(),
    dialogVisible: await dialog.isVisible(),
    iframeSrc: await experience.locator("dialog iframe").getAttribute("src"),
    bodyOverflow: await experience.locator("body").evaluate((body) => getComputedStyle(body).overflow),
    animationName: await dialog.evaluate((element) => getComputedStyle(element).animationName),
    focusInside: await dialog.evaluate((element) => element.contains(document.activeElement)),
    seriousA11yViolations: experienceA11y,
  };
  await experience.screenshot({ path: ".artifacts/experience-modal.png" });
  await experience.keyboard.press("Escape");
  await experience.waitForTimeout(320);
  report.interactions.experiencePreview.closedWithEscape = await experience.locator("dialog[open]").count() === 0;
  if (report.interactions.experiencePreview.examples !== 1 || report.interactions.experiencePreview.budgetExampleVisible !== 0 || !report.interactions.experiencePreview.dialogVisible || !report.interactions.experiencePreview.iframeSrc?.includes("portfoliopersonal") || report.interactions.experiencePreview.bodyOverflow !== "hidden" || !report.interactions.experiencePreview.focusInside || report.interactions.experiencePreview.seriousA11yViolations.length > 0 || !report.interactions.experiencePreview.closedWithEscape) report.failures.push("experience preview");
  await experience.close();

  const experienceMobile = await browser.newPage({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, reducedMotion: "reduce" });
  await experienceMobile.goto(baseUrl, { waitUntil: "networkidle" });
  await experienceMobile.getByRole("button", { name: "Ver la web aquí" }).click();
  const mobileDialog = experienceMobile.locator("dialog[open]");
  await experienceMobile.getByText("Preparando la experiencia…").waitFor({ state: "hidden", timeout: 15000 });
  const mobileDialogBox = await mobileDialog.boundingBox();
  report.interactions.experiencePreview.mobile = {
    visible: await mobileDialog.isVisible(),
    loaded: await experienceMobile.getByText("Preparando la experiencia…").count() === 0,
    withinViewport: Boolean(mobileDialogBox && mobileDialogBox.x >= 0 && mobileDialogBox.y >= 0 && mobileDialogBox.x + mobileDialogBox.width <= 390 && mobileDialogBox.y + mobileDialogBox.height <= 844),
    closeButtonVisible: await experienceMobile.getByRole("button", { name: "Cerrar vista interactiva" }).isVisible(),
  };
  await experienceMobile.screenshot({ path: ".artifacts/experience-modal-mobile.png" });
  if (!report.interactions.experiencePreview.mobile.visible || !report.interactions.experiencePreview.mobile.loaded || !report.interactions.experiencePreview.mobile.withinViewport || !report.interactions.experiencePreview.mobile.closeButtonVisible) report.failures.push("experience preview mobile");
  await experienceMobile.close();

  const form = await browser.newPage({ viewport: { width: 1280, height: 900 }, reducedMotion: "reduce" });
  await form.goto(`${baseUrl}/#contacto`, { waitUntil: "networkidle" });
  await form.getByRole("button", { name: "Enviar solicitud" }).click();
  report.interactions.formValidation = {
    invalidFields: await form.locator('[aria-invalid="true"]').count(),
    errorMessages: await form.locator('[id$="-error"]').count(),
  };
  if (report.interactions.formValidation.invalidFields < 5 || report.interactions.formValidation.errorMessages < 5) report.failures.push("form validation");
  await form.close();

  const robots = await (await fetch(`${baseUrl}/robots.txt`)).text();
  report.interactions.robots = robots;
  if (!robots.includes("Allow: /") || robots.includes("Disallow: /")) report.failures.push("robots indexability");

  const removedMethodPage = await fetch(`${baseUrl}/metodo`);
  report.interactions.removedMethodPage = removedMethodPage.status;
  if (removedMethodPage.status !== 404) report.failures.push("removed method page");

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
