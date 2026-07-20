const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launch({
    headless: true,
    executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
    args: ["--disable-cache"],
  });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.addInitScript(() => {
    window.__qualityMetrics = { lcp: 0, cls: 0 };
    new PerformanceObserver((list) => {
      const entries = list.getEntries();
      window.__qualityMetrics.lcp = entries.at(-1)?.startTime || 0;
    }).observe({ type: "largest-contentful-paint", buffered: true });
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (!entry.hadRecentInput) window.__qualityMetrics.cls += entry.value;
      }
    }).observe({ type: "layout-shift", buffered: true });
  });

  await page.goto("http://127.0.0.1:3001/", { waitUntil: "networkidle" });
  await page.waitForTimeout(1500);
  const metrics = await page.evaluate(() => {
    const resources = performance.getEntriesByType("resource");
    const scripts = resources.filter((entry) => entry.initiatorType === "script");
    const navigation = performance.getEntriesByType("navigation")[0];
    return {
      javascriptTransferKb: Math.round(scripts.reduce((sum, entry) => sum + entry.transferSize, 0) / 1024),
      totalTransferKb: Math.round((resources.reduce((sum, entry) => sum + entry.transferSize, 0) + navigation.transferSize) / 1024),
      domContentLoadedMs: Math.round(navigation.domContentLoadedEventEnd),
      loadMs: Math.round(navigation.loadEventEnd),
      lcpMs: Math.round(window.__qualityMetrics.lcp),
      cls: Number(window.__qualityMetrics.cls.toFixed(4)),
      scriptRequests: scripts.length,
    };
  });
  await browser.close();
  process.stdout.write(JSON.stringify(metrics, null, 2));
  if (metrics.javascriptTransferKb > 180 || metrics.cls > 0.1) process.exit(1);
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
