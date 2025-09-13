const puppeteer = require('puppeteer');

async function takeScreenshot(url, path) {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: 'networkidle0' });
  await page.screenshot({ path, fullPage: true });
  await browser.close();
}

const url = 'http://localhost:3002';
const screenshotPath = 'screenshots/portfolio.png';

takeScreenshot(url, screenshotPath).then(() => {
  console.log(`Screenshot saved to ${screenshotPath}`);
}).catch(console.error);