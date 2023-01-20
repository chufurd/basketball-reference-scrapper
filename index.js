
const puppeteer = require('puppeteer');


const fs = require('fs');

const baseURL = 'https://www.basketball-reference.com/players/'

async function run() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  const players = []
  for (let letter of 'abcdefghijklmnopqrstuvwxyz'.split('')) {
    await page.goto(`${baseURL}${letter}/`);
    await page.waitForSelector('#players');

    const pagePlayers = await page.evaluate(() => {
      const playerElements = document.querySelectorAll('[data-row] strong');
      return Array.from(playerElements, (e) => {
        const closestRow = e.closest("[data-row]");
        const heightEl = closestRow.querySelector("[data-stat='height']");
        const posEl = closestRow.querySelector("[data-stat='pos']");
        const draftedEl = closestRow.querySelector("[data-stat='year_min']");
        const weightEl = closestRow.querySelector("[data-stat='weight']");
        return { name: e.innerText, height: heightEl? heightEl.innerText:null, position: posEl? posEl.innerText:null, drafted: draftedEl? draftedEl.innerText:null, weight: weightEl? weightEl.innerText:null};
      });
    });
    players.push(...pagePlayers)
  }
  await browser.close();
  fs.writeFileSync('players.json', JSON.stringify(players));
}

run();

