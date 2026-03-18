const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

async function captureScreenshots() {
  const dir = path.join(__dirname, '../public/how-i-built-this');
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  const browser = await puppeteer.launch({ 
    headless: false,
    defaultViewport: { width: 1400, height: 900 },
    args: ['--start-maximized']
  });

  try {
    const page = await browser.newPage();

    console.log('📸 Capturing Claude screenshot...');
    await page.goto('https://claude.ai', { waitUntil: 'networkidle0' });
    await page.waitForTimeout(3000);
    await page.screenshot({ 
      path: path.join(dir, 'claude-interface.png'),
      type: 'png',
      quality: 100
    });
    console.log('✓ Claude screenshot saved');

    console.log('📸 Capturing Netlify settings screenshot...');
    await page.goto('https://app.netlify.com', { waitUntil: 'networkidle0' });
    await page.waitForTimeout(3000);
    await page.screenshot({ 
      path: path.join(dir, 'netlify-settings.png'),
      type: 'png',
      quality: 100
    });
    console.log('✓ Netlify settings screenshot saved');

    console.log('📸 Capturing GitHub code screenshot...');
    await page.goto('https://github.com', { waitUntil: 'networkidle0' });
    await page.waitForTimeout(3000);
    await page.screenshot({ 
      path: path.join(dir, 'code-example.png'),
      type: 'png',
      quality: 100
    });
    console.log('✓ Code example screenshot saved');

    console.log('📸 Capturing DNS settings screenshot...');
    await page.goto('https://www.namecheap.com', { waitUntil: 'networkidle0' });
    await page.waitForTimeout(3000);
    await page.screenshot({ 
      path: path.join(dir, 'dns-settings.png'),
      type: 'png',
      quality: 100
    });
    console.log('✓ DNS settings screenshot saved');
    
    console.log('✅ All screenshots captured successfully in public/how-i-built-this/');
  } catch (error) {
    console.error('Error capturing screenshots:', error.message);
  } finally {
    await browser.close();
  }
}

captureScreenshots();
