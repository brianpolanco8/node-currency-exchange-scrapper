const { gql } = require('apollo-server-express')

module.exports = gql`

type usdRates {
    _id: ID!
    buy: buyRates
    sell: sellRates
    createdAt: String
    updatedAt: String
}

type buyRates {
    popularDollarBuy: String
    scotiaDollarBuy: String
}

type sellRates{
    popularDollarSell: String
    scotiaDollarSell: String
}

type Query {
  hello: String
  usdRates: usdRates!
  getUsdRates: usdRates
}

`;