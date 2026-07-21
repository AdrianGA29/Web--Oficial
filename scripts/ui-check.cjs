const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launch({
    headless: true,
    executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
  });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, reducedMotion: "no-preference" });
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
  const firstNavigationLink = page.locator("header nav a").nth(1);
  const firstNavigationLabel = firstNavigationLink.locator(".link-underline");
  const underlineBefore = await firstNavigationLabel.evaluate((element) => getComputedStyle(element).backgroundSize);
  await firstNavigationLink.hover();
  await page.waitForTimeout(140);
  const underlineDuring = await firstNavigationLabel.evaluate((element) => getComputedStyle(element).backgroundSize);
  await page.waitForTimeout(300);
  const navigationHover = await firstNavigationLink.evaluate((element) => {
    const style = getComputedStyle(element);
    return {
      background: style.backgroundColor,
    };
  });
  const underlineAfter = await firstNavigationLabel.evaluate((element) => ({
    backgroundSize: getComputedStyle(element).backgroundSize,
    width: element.getBoundingClientRect().width,
  }));
  await page.screenshot({ path: ".artifacts/header-hover.png", clip: { x: 420, y: 0, width: 600, height: 125 } });
  await page.evaluate(() => scrollTo(0, 1000));
  await page.waitForTimeout(700);
  const compactHeader = await readHeader();

  await page.locator("#equipo").scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);
  const teamCards = await page.locator("#equipo article").evaluateAll((elements) => elements.map((element) => {
    const rect = element.getBoundingClientRect();
    return { width: rect.width, height: rect.height, bottom: rect.bottom };
  }));
  const firstTeamCard = page.locator("#equipo article").first();
  const firstTeamCardBox = await firstTeamCard.boundingBox();
  await page.mouse.move(
    firstTeamCardBox.x + firstTeamCardBox.width * 0.72,
    firstTeamCardBox.y + firstTeamCardBox.height * 0.28,
  );
  await page.waitForTimeout(350);
  const teamHover = await firstTeamCard.evaluate((element) => ({
    pointerX: getComputedStyle(element).getPropertyValue("--team-x").trim(),
    pointerY: getComputedStyle(element).getPropertyValue("--team-y").trim(),
    borderGlowOpacity: getComputedStyle(element, "::before").opacity,
    surfaceGlowOpacity: getComputedStyle(element, "::after").opacity,
    photoGlowOpacity: getComputedStyle(element.querySelector(".team-card-photo-light")).opacity,
    transform: getComputedStyle(element).transform,
  }));
  await page.locator("#equipo").screenshot({ path: ".artifacts/team-hover.png" });
  const headingAlignment = await page.locator("#equipo h2, #preguntas h2").evaluateAll((elements) => elements.map((element) => {
    const rect = element.getBoundingClientRect();
    const container = element.closest(".container-shell").getBoundingClientRect();
    return {
      text: element.textContent,
      centerDelta: Number(((rect.left + rect.width / 2) - (container.left + container.width / 2)).toFixed(3)),
      textAlign: getComputedStyle(element).textAlign,
    };
  }));

  await browser.close();
  const cardHeightsMatch = new Set(teamCards.map(({ height }) => height)).size === 1;
  const teamSpotlightWorks = teamHover.borderGlowOpacity === "1" && teamHover.surfaceGlowOpacity === "1" && teamHover.photoGlowOpacity === "1" && teamHover.pointerX.endsWith("px") && teamHover.pointerY.endsWith("px");
  const headerCompacts = compactHeader.width < expandedHeader.width && compactHeader.height < expandedHeader.height;
  const headingsCentered = headingAlignment.every(({ centerDelta, textAlign }) => Math.abs(centerDelta) < 1 && textAlign === "center");
  const beforeWidth = Number.parseFloat(underlineBefore);
  const duringWidth = Number.parseFloat(underlineDuring);
  const afterWidth = Number.parseFloat(underlineAfter.backgroundSize);
  const navigationUnderlineWorks = navigationHover.background === "rgba(0, 0, 0, 0)" && beforeWidth === 0 && duringWidth > 0 && duringWidth < 100 && Math.abs(afterWidth - 100) < 0.1;
  process.stdout.write(JSON.stringify({ expandedHeader, compactHeader, headerCompacts, navigationHover: { ...navigationHover, underlineBefore, underlineDuring, underlineAfter }, navigationUnderlineWorks, teamCards, cardHeightsMatch, teamHover, teamSpotlightWorks, headingAlignment, headingsCentered }, null, 2));
  if (!headerCompacts || !cardHeightsMatch || !teamSpotlightWorks || !headingsCentered || !navigationUnderlineWorks) process.exit(1);
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
