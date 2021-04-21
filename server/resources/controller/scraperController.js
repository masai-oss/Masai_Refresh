const request = require('request')
const cheerio = require('cheerio');
const { scraperValidation } = require('../utils/validation/scraperValidation');

const scrapeData = async (req, res) => {

    // validation
    const { error } = scraperValidation(req.body);
    if (error) {
        return res.status(400).json({
            error: true,
            message: error.details[0].message,
        });
    }

    // scraper logic
    let { url } = req.body
    request(url, (err, response, html) => {
        try{
            if(!err && response.statusCode === 200){
                const $ = cheerio.load(html)
    
                const title = $("meta[property='og:title']")[0] ? $("meta[property='og:title']")[0].attribs.content : undefined
                const image = $("meta[property='og:image']")[0] ? $("meta[property='og:image']")[0].attribs.content : undefined
                const description = $("meta[property='og:description']")[0] ? $("meta[property='og:description']")[0].attribs.content : undefined
                const site_name = $("meta[property='og:site_name']")[0] ? $("meta[property='og:site_name']")[0].attribs.content : undefined
                const type = $("meta[property='og:type']")[0] ? $("meta[property='og:type']")[0].attribs.content : undefined
                const url_name = $("meta[property='og:url']")[0] ? $("meta[property='og:url']")[0].attribs.content : undefined
                const icons = []
    
                $("link").each(function (index, element) {
                    let rel = $(element).attr('rel')
                    if(rel.includes('icon')){
                        icons.push($(element).attr('href'))
                    }
                });
                let icon = icons[0]
    
                const data = {
                    site_name,
                    icon,
                    title, 
                    description,
                    image,
                    type,
                    url: url_name
                }
    
                res.json({error: false, data})
            }
            else{
                throw new Error(err.message)
            }
        }
        catch(err){
            return res.status(400).json({error: true, message: err.message})
        }
    })
}

module.exports = {
    scrapeData
}