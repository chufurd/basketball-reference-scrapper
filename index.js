const puppeteer = require('puppeteer');
const fs = require('fs');



async function scrapePlayerData() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://www.basketball-reference.com/leagues/NBA_2023_per_game.html', { waitUntil: 'networkidle2', timeout: 60000 });
    const players = await page.evaluate(() => {
        const players = Array.from(document.querySelectorAll('tbody tr'));
        return players.map(player => {
            const name = player.querySelector('td[data-stat="player"] a') ? player.querySelector('td[data-stat="player"] a').innerText : null;
            const ppg = player.querySelector('td[data-stat="pts_per_g"]') ? player.querySelector('td[data-stat="pts_per_g"]').innerText : null;
            const apg = player.querySelector('td[data-stat="ast_per_g"]') ? player.querySelector('td[data-stat="ast_per_g"]').innerText : null;
            const rpg = player.querySelector('td[data-stat="trb_per_g"]') ? player.querySelector('td[data-stat="trb_per_g"]').innerText : null;
            const position = player.querySelector('td[data-stat="pos"]') ? player.querySelector('td[data-stat="pos"]').innerText : null;
            const age = player.querySelector('td[data-stat="age"]') ? player.querySelector('td[data-stat="age"]').innerText : null;
            const fgPct = player.querySelector('td[data-stat="fg_pct"]') ? player.querySelector('td[data-stat="fg_pct"]').innerText : null;
            const teamId = player.querySelector('td[data-stat="team_id"] a') ? player.querySelector('td[data-stat="team_id"] a').innerText : null;
            const stlPerG = player.querySelector('td[data-stat="stl_per_g"]') ? player.querySelector('td[data-stat="stl_per_g"]').innerText : null;
            const blkPerG = player.querySelector('td[data-stat="blk_per_g"]') ? player.querySelector('td[data-stat="blk_per_g"]').innerText : null;
            return {name, ppg, apg, rpg, position, age, fgPct, teamId, stlPerG, blkPerG};
        });
    });
    console.log(players);
    await browser.close();
    fs.writeFileSync('players.json', JSON.stringify(players));

}

scrapePlayerData();

//Merged Previous data with new data


// const file1 = require('./players1.json');
// const file2 = require('./players.json');

// for(let i = 0; i < file1.length; i++){
//   for(let j = 0; j < file2.length; j++){
//     if(file1[i].name === file2[j].name) {
//         file1[i] = {...file1[i], ...file2[j]};
//     }
//   }
// }
// console.log(file1);