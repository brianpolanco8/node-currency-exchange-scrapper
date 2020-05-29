const { gql } = require('apollo-server-express')

module.exports = gql`

type usdRates {
    id: ID!
    buy: buyRates!
    sell: sellRates!
}

type buyRates {
    popularUsdBuy: Int!
    # scotiaUsdBuy: Int!
}

type sellRates{
    popularUsdSell: Int!
    # scotiaUsdSell: Int!
}

type Query {
  hello: String
  usdRates: usdRates!
}

`;