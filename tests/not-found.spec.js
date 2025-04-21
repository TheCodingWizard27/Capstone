const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({
    headless: false,
    slowMo:10000
  });
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('https://shop-simplify.vercel.app/sell');
  await page.locator('.d-flex > div').click();
  await page.locator('canvas').click({
    position: {
      x: 39,
      y: 117
    }
  });
  await page.locator('canvas').click({
    position: {
      x: 291,
      y: 95
    }
  });
  await page.locator('canvas').press('Space');
  await page.close();

  // ---------------------
  await context.close();
  await browser.close();
})();