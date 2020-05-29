const mongoose = require('mongoose')
const USDRates = require('../models/usdRates')
const { popularScrapper } = require('../scrapper')

module.exports = {
    Query: {
        hello: () => 'Hello world!',
        usdRates: async () => {
            const dollarRates = await popularScrapper();

            // const usdRates = new USDRates({
            //     buy: {
            //         popularDollarBuy: dollarRates.dollarBuy,
            //     },
            //     sell: {
            //         popularDollarSell: dollarRates.dollarSell
            //     }
            // });

            // await usdRates.save();

            // const usdRates = await USDRates.findOneAndUpdate({}, {
            //     buy: {
            //         ...usdRates.buy,
            //         popularDollarBuy: dollarRates.dollarBuy,
            //     },
            //     sell: {
            //         ...usdRates.sell,
            //         popularDollarSell: dollarRates.dollarSell
            //     }
            // }, { upsert: true });

            let usdRates = await USDRates.findOne({});
            try {
                if (usdRates) {
                    await USDRates.updateOne({}, {
                        buy: {
                            ...usdRates.buy,
                            popularDollarBuy: dollarRates.dollarBuy,
                        },
                        sell: {
                            ...usdRates.sell,
                            popularDollarSell: dollarRates.dollarSell
                        }
                    })

                } else {
                    usdRates = new USDRates({
                        buy: {
                            popularDollarBuy: dollarRates.dollarBuy,
                        },
                        sell: {
                            popularDollarSell: dollarRates.dollarSell
                        }
                    })
                }
            } catch (error) {
                throw error;
            }
            await usdRates.save()
            return { ...usdRates._doc, _id: usdRates._id.toString(), createdAt: usdRates.createdAt.toISOString(), updatedAt: usdRates.updatedAt.toISOString() }
        }
    },
};
