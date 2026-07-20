const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launch({
    headless: true,
    executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
  });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, reducedMotion: "reduce" });
  await page.goto("http://localhost:3000/", { waitUntil: "networkidle" });

  const nav = page.locator("header nav");
  const readHeader = () => nav.evaluate((element) => {
    const style = getComputedStyle(element);
    const rect = element.getBoundingClientRect();
    return {
      width: rect.width,
      height: rect.height,
      background: style.backgroundColor,
      shadow: style.boxShadow,
    };
  });

  const expandedHeader = await readHeader();
  await page.evaluate(() => scrollTo(0, 1000));
  await page.waitForTimeout(700);
  const compactHeader = await readHeader();

  await page.locator("#equipo").scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);
  const teamCards = await page.locator("#equipo article").evaluateAll((elements) => elements.map((element) => {
    const rect = element.getBoundingClientRect();
    return { width: rect.width, height: rect.height, bottom: rect.bottom };
  }));

  await browser.close();
  const cardHeightsMatch = new Set(teamCards.map(({ height }) => height)).size === 1;
  const headerCompacts = compactHeader.width < expandedHeader.width && compactHeader.height < expandedHeader.height;
  process.stdout.write(JSON.stringify({ expandedHeader, compactHeader, headerCompacts, teamCards, cardHeightsMatch }, null, 2));
  if (!headerCompacts || !cardHeightsMatch) process.exit(1);
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
