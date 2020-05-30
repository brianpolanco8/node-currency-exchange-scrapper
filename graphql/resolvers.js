const mongoose = require('mongoose')
const USDRates = require('../models/usdRates')
const { popularScrapper, scotiaScrapper } = require('../scrapper')

module.exports = {
    Query: {
        hello: () => 'Hello world!',
        usdRates: async () => {
            const popularDollarRates = await popularScrapper();
            const scotiaDollarRates = await scotiaScrapper();

            console.log('scotiaDollarRates', scotiaDollarRates)


            let usdRates = await USDRates.findOne({});
            try {
                if (usdRates) {
                    await USDRates.updateOne({}, {
                        buy: {
                            ...usdRates.buy,
                            popularDollarBuy: popularDollarRates.dollarBuy,
                            scotiaDollarBuy: scotiaDollarRates.dollarBuy
                        },
                        sell: {
                            ...usdRates.sell,
                            popularDollarSell: popularDollarRates.dollarSell,
                            scotiaDollarSell: scotiaDollarRates.dollarSell
                        }
                    })

                } else {
                    usdRates = new USDRates({
                        buy: {
                            popularDollarBuy: popularDollarRates.dollarBuy,
                            scotiaDollarBuy: scotiaDollarRates.dollarBuy
                        },
                        sell: {
                            popularDollarSell: popularDollarRates.dollarSell,
                            scotiaDollarSell: scotiaDollarRates.dollarSell
                        }
                    })
                }
            } catch (error) {
                throw error;
            }
            await usdRates.save()
            return { ...usdRates._doc, _id: usdRates._id.toString(), createdAt: usdRates.createdAt.toISOString(), updatedAt: usdRates.updatedAt.toISOString() }
        },
        getUsdRates: async () => {
            const usdRates = await USDRates.findOne({});
            console.log('usdRates', usdRates)

            return { ...usdRates._doc, _id: usdRates._id.toString(), buy: { ...usdRates.buy }, createdAt: usdRates.createdAt.toISOString(), updatedAt: usdRates.updatedAt.toISOString() }
        }
    },
};
