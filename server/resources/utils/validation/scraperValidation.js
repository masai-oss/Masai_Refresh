const Joi = require("joi");

const scraperValidation = data => {
    const schema = Joi.object({
        url: Joi.string().uri().required()
    })
    return schema.validate(data);
}

module.exports = {
    scraperValidation
}