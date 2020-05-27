const express = require('express');
const app = express();
const cron = require("node-cron");
const { scotiaScrapper, popularScrapper } = require('./scrapper')

cron.schedule('* * * * *', () => {
    scotiaScrapper()
    popularScrapper()
});

app.listen(5000, () => {
    console.log('server is running on port 5000')
})