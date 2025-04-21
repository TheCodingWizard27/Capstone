const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

(async () => {
  const browser = await chromium.launch({ headless: false, slowMo: 1000 });
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto('https://www.google.com/search?sca_esv=43f628b37c77e4c4&q=dogs&udm=2&fbs=ABzOT_CWdhQLP1FcmU5B0fn3xuWpA-dk4wpBWOGsoR7DG5zJBsxayPSIAqObp_AgjkUGqekYoUzDaOcDDjQfK4KpR2OIJg0p8GjEafhVsU6UZNT2tUhHTA_XMhcunRVhbh9fJ-E_NpOwc0V4M-pxQ-VRkNVBLtVA39i8pg8uW6jlEtLtrbdNHgWLD-vHAmoqmNrKak2sYhiqpsjYUvt_8vhjtkMNrZWABg&sa=X&ved=2ahUKEwinubPprdmMAxXSv4kEHROmAmEQtKgLegQIERAB&biw=1352&bih=762&dpr=2');

  // Extract visible text and image URLs
  const data = await page.evaluate(() => {
    const text = document.body.innerText.trim().replace(/\s+/g, ' ');
    const images = Array.from(document.querySelectorAll('img'))
      .map(img => img.src)
      .filter(src => !!src);
    return { text, images };
  });

  // Prepare CSV content
  let csv = `"Text","Image Link"\n`;

  // Write all image links with full text in the first row only
  if (data.images.length > 0) {
    csv += `"${data.text.replace(/"/g, '""')}","${data.images[0]}"\n`;
    for (let i = 1; i < data.images.length; i++) {
      csv += `"","${data.images[i]}"\n`;
    }
  } else {
    csv += `"${data.text.replace(/"/g, '""')}",""\n`;
  }

  fs.writeFileSync(path.join(__dirname, 'imdb_data.csv'), csv);

  await browser.close();
})();
