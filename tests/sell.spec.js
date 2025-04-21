const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({
    headless: false,
    slowMo:1000
  });
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('https://shop-simplify.vercel.app/signIn');
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('pudasaini.sid123@gmail.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('123123');
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.getByRole('navigation').getByRole('link', { name: 'Sell' }).click();
  await page.getByRole('textbox', { name: 'Start your Listing' }).click();
  await page.getByRole('textbox', { name: 'Start your Listing' }).fill('New Listing For Demo');
  await page.getByRole('textbox', { name: 'Brand' }).click();
  await page.getByRole('textbox', { name: 'Brand' }).fill('New Brand');
  await page.getByLabel('Category').selectOption('Books');
  await page.getByLabel('Category').selectOption('Clothing');
  await page.getByRole('spinbutton', { name: 'Price' }).click();
  await page.getByRole('spinbutton', { name: 'Price' }).fill('500');
  await page.getByRole('button', { name: 'Next' }).click();
  await page.getByRole('textbox', { name: 'Description' }).click();
  await page.getByRole('textbox', { name: 'Description' }).fill('This is a very good listing');
  await page.getByRole('textbox', { name: 'Description' }).click();
  // await expect(page.getByPlaceholder('Write a description for your')).toContainText('This is a very good listing This is a very good listingThis is a very good listingThis is a very good listingThis is a very good listingThis is a very good listingThis is a very good listingThis is a very good listingThis is a very good listingThis is a very good listingThis is a very good listingThis is a very good listingThis is a very good listingThis is a very good listing');
  await page.getByRole('textbox', { name: 'Description' }).click();
  await page.getByRole('textbox', { name: 'Description' }).fill('This is a very good listing ');
  await page.getByRole('button', { name: 'Next' }).click();
  // await page.getByRole('button', { name: 'Choose Files' }).click();
  // await page.getByRole('button', { name: 'Choose Files' }).setInputFiles(['profile.png', 'profile.png', 'profile.png']);
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.close();

  // ---------------------
  await context.close();
  await browser.close();
})();