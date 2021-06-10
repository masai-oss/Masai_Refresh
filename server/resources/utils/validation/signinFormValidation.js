const joi = require("joi")

const signinFormValidation = (data) => {
  const schema = joi.object({
    email: joi.string().min(3).required(),
    password: joi.string().min(8).required(),
  })
  return schema.validate(data)
}

module.exports = {
  signinFormValidation,
}
