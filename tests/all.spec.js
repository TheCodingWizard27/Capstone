const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({
    headless: false,
    slowMo:1000
  });
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('https://www.wikipedia.org/');
  await page.getByRole('searchbox', { name: 'Search Wikipedia' }).click();
  await page.getByRole('searchbox', { name: 'Search Wikipedia' }).fill('Transformers in AI');
  await page.getByRole('searchbox', { name: 'Search Wikipedia' }).press('Enter');
  await page.getByRole('button', { name: 'Search' }).click();
  await page.getByRole('link', { name: 'Generative pre-trained transformer', exact: true }).click();
  await page.close();

  // ---------------------
  await context.close();
  await browser.close();
})();