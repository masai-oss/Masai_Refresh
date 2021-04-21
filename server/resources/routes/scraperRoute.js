const scraperRouter = require('express').Router()
const { scrapeData } = require('../controller/scraperController')

scraperRouter.post('/', scrapeData)

module.exports = scraperRouter