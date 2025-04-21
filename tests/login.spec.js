const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({
    headless: false,
    slowMo:1000,
  });
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('https://shop-simplify.vercel.app/signIn');
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('pudasaini.sid123@gmail.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('1231234');
  await page.getByRole('checkbox', { name: 'Show Password' }).check();
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('123123');
  await page.getByRole('button', { name: 'Sign in' }).click();

  // ---------------------
  await context.close();
  await browser.close();
})();