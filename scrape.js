const fs = require('fs');
const { chromium } = require('playwright');
const fetch = require('node-fetch');
const { writeFile } = require('fs/promises');

const BASE_URL = 'http://www.pdfdrive.com';

async function getDownloadLink(browser, bookLink) {
  const page = await browser.newPage();
  await page.goto(`${BASE_URL}${bookLink}`);

  // Hacer clic en el botón de descarga antes de la espera
  await page.click('#download-button-link');

  // Agregar una espera explícita de 10 segundos
  await page.waitForTimeout(12000);

  const midLink = await page.$eval('a.btn.btn-primary.btn-user', (el) => el.href);
  
  await page.close();

  return midLink;
}

async function downloadBook(browser, bookLink, bookTitle) {
  const downloadLink = await getDownloadLink(browser, bookLink);

  const response = await fetch(downloadLink);
  const buffer = await response.buffer();

  if (!fs.existsSync('downloads')) {
    fs.mkdirSync('downloads');
  }

  await writeFile(`downloads/${bookTitle}.pdf`, buffer);
  console.log(`Downloaded ${bookTitle}`);
}


(async () => {
  // Example book link and title (replace with the desired book)
  const bookLink = '/never-split-the-difference-negotiating-as-if-your-life-depended-on-it-e145171860.html';
  const bookTitle = 'Never Split the Difference';
  const browser = await chromium.launch({ headless: false });
  await downloadBook(browser, bookLink, bookTitle);
  await browser.close();
})();
