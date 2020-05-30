const request = require('request');
const puppeteer = require('puppeteer');
const cheerio = require('cheerio');

const popularScrapper = async () => {

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto('https://www.popularenlinea.com/personas/Paginas/Home.aspx');

    const dollarSell = await page.evaluate(() => {
        return document.getElementById('venta_peso_dolar_desktop').value
    });

    const dollarBuy = await page.evaluate(() => {
        return document.getElementById('compra_peso_dolar_desktop').value
    });


    // console.log('-------------------------')
    // console.log('Popular')
    // console.log('buy', dollarBuy);
    // console.log('sell', dollarSell);
    // console.log('-------------------------')

    browser.close();
    parseInt(dollarBuy)
    parseInt(dollarSell)
    return { dollarBuy, dollarSell }
}

// const scotiaScrapper = () => {
//     let dollarBuy = '';
//     let dollarSell = '';
//     request('https://do.scotiabank.com/banca-personal/tarifas/tasas-de-cambio.html', (error, response, html) => {
//         if (!error && response.statusCode === 200) {
//             const $ = cheerio.load(html);
//             const scrappedBuyValue = $('.bns--table').find('tr').eq(1).first().find('td').eq(2);
//             const scrappedSellValue =
//                 // console.log('dollarBuy', scrappedBuyValue.text())
//                 dollarBuy = scrappedBuyValue.text();
//             dollarSell = scrappedSellValue.text();
//             return { dollarBuy, dollarSell }
//         }

//     })
//     console.log('rateValues', rateValues)
//     return rateValues;
// }

const scotiaScrapper = async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto('https://do.scotiabank.com/banca-personal/tarifas/tasas-de-cambio.html');

    await page.addScriptTag({ url: 'https://code.jquery.com/jquery-3.2.1.min.js' })

    const dollarRates = await page.evaluate(() => {
        const $ = window.$;
        const dollarBuy = $('.bns--table').find('tr').eq(1).first().find('td').eq(2).text();
        const dollarSell = $('.bns--table').find('tr').eq(1).first().find('td').eq(3).text();

        return { dollarBuy, dollarSell }

    })

    return dollarRates;
}



module.exports = {
    scotiaScrapper,
    popularScrapper,
    // scotiaScrapperPuppeteer
}