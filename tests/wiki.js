const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch({
    headless: false,
    slowMo: 1000,
  });
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto('https://www.wikipedia.org/');
  await page.getByRole('searchbox', { name: 'Search Wikipedia' }).fill('Transformers in AI');
  await page.getByRole('button', { name: 'Search' }).click();
  

  // Extract meaningful article content (paragraphs, headings, list items)
  const articleText = await page.evaluate(() => {
    const contentElement = document.querySelector('#mw-content-text');
    if (!contentElement) return '';
    
    const tags = contentElement.querySelectorAll('p');
    return Array.from(tags)
      .map(el => el.innerText.trim())
      .filter(text => text.length > 0)
      .join('\n\n');
  });

  fs.writeFileSync('ai_article1.txt', articleText);

  await browser.close();
})();
