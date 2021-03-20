const puppeteer = require("puppeteer");

let product = process.argv.slice(2)[0];

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(`https://www.amazon.es/dp/${product}`);
 
  headings = await page.evaluate(() => {
    return document.querySelector("#priceblock_ourprice").textContent.replace('€', '').trim();
  });
  console.log(headings);
  await browser.close();
})();