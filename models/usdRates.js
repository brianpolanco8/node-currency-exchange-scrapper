const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const usdRatesSchema = new Schema({
    buy: {
        type: Object,
        required: true
    },
    sell: {
        type: Object,
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model('USDRates', usdRatesSchema)