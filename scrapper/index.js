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


    console.log('-------------------------')
    console.log('Popular')
    console.log('compra', dollarBuy);
    console.log('venta', dollarSell);
    console.log('-------------------------')

    browser.close();
}

const scotiaScrapper = () => {
    request('https://do.scotiabank.com/banca-personal/tarifas/tasas-de-cambio.html', (error, response, html) => {
        if (!error && response.statusCode === 200) {
            const $ = cheerio.load(html);
            const dollarBuy = $('.bns--table').find('tr').eq(1).first().find('td').eq(2);
            const dollarSell = $('.bns--table').find('tr').eq(1).first().find('td').eq(3)
            console.log('-------------------------')
            console.log('Scotia')
            console.log('compra', dollarBuy.text());
            console.log('venta', dollarSell.text());
            console.log('-------------------------')
        }
    })
}

module.exports = {
    scotiaScrapper,
    popularScrapper
}