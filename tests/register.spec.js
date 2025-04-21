const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({
    headless: false
  });
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('https://shop-simplify.vercel.app/register');
  await page.getByRole('textbox', { name: 'Name' }).click();
  await page.getByRole('textbox', { name: 'Name' }).fill('sid');
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('pudasaini.sid123@gmail.com');
  await page.getByRole('textbox', { name: 'Password', exact: true }).click();
  await page.getByRole('textbox', { name: 'Password', exact: true }).fill('123');
  await page.getByRole('textbox', { name: 'Re-enter Password' }).click();
  await page.getByRole('textbox', { name: 'Re-enter Password' }).fill('123');
  await page.getByText('Show Password').click();
  await page.getByRole('button', { name: 'Create Account' }).click();
  await page.getByRole('textbox', { name: 'Password', exact: true }).click();
  await page.getByRole('textbox', { name: 'Password', exact: true }).fill('123123');
  await page.getByRole('textbox', { name: 'Re-enter Password' }).click();
  await page.getByRole('textbox', { name: 'Re-enter Password' }).fill('123123');
  await page.getByRole('button', { name: 'Create Account' }).click();
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).press('ArrowLeft');
  await page.getByRole('textbox', { name: 'Email' }).press('ArrowLeft');
  await page.getByRole('textbox', { name: 'Email' }).press('ArrowLeft');
  await page.getByRole('textbox', { name: 'Email' }).press('ArrowLeft');
  await page.getByRole('textbox', { name: 'Email' }).press('ArrowLeft');
  await page.getByRole('textbox', { name: 'Email' }).press('ArrowLeft');
  await page.getByRole('textbox', { name: 'Email' }).press('ArrowLeft');
  await page.getByRole('textbox', { name: 'Email' }).press('ArrowLeft');
  await page.getByRole('textbox', { name: 'Email' }).press('ArrowLeft');
  await page.getByRole('textbox', { name: 'Email' }).press('ArrowRight');
  await page.getByRole('textbox', { name: 'Email' }).fill('pudasaini.sid124@gmail.com');
  await page.getByRole('button', { name: 'Create Account' }).click();

  // ---------------------
  await context.close();
  await browser.close();
})();