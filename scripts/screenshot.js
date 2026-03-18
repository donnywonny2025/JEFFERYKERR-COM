const puppeteer = require('puppeteer');

async function takeScreenshot(url, path) {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  // Set a large viewport to capture a full-page feel while allowing fullPage capture
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
  await page.goto(url, { waitUntil: 'networkidle0' });
  // Give page-load animations a moment to complete for a clean capture
  await page.waitForTimeout(1200);
  await page.screenshot({ path, fullPage: true });
  await browser.close();
}

const port = process.env.PORT || 3001;
const url = `http://localhost:${port}`;
const screenshotPath = 'screenshots/portfolio.png';

takeScreenshot(url, screenshotPath).then(() => {
  console.log(`Screenshot saved to ${screenshotPath}`);
}).catch(console.error);