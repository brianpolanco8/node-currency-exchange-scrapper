require('dotenv').config()
const express = require('express');
const app = express();
const cron = require("node-cron");
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const { ApolloServer } = require('apollo-server-express');
const { resolvers, schema } = require('./graphql')
const cors = require('cors')
const { scotiaScrapper, popularScrapper, } = require('./scrapper')



cron.schedule('0 0 */1 * * *', () => {
    // cron.schedule('* * * * *', () => {
    popularScrapper().then(dollarRates => {
        resolvers.Query.usdRates().then(dollarRates => {
            console.log(dollarRates)
        })
    })
});


app.use(bodyParser.json())

app.use(cors())

app.get('/', (req, res, next) => {
    res.status(200).json({
        working: 'yes'
    })
})

const server = new ApolloServer({
    typeDefs: schema, resolvers, formatError: (error) => {
        data = error.originalError.data;
        message = error.originalError.message;
        code = error.originalError.code || 500;
        return { message, code };
    }
});

server.applyMiddleware({ app })

mongoose.connect(`${process.env.MONGO_URI}`, {
    useNewUrlParser: true, useUnifiedTopology: true
})
    .then(result => {
        app.listen(process.env.PORT, () => {
            console.log('server is running on port 5000')
        })
    })
    .catch(error => {
        console.log(error)
    })

