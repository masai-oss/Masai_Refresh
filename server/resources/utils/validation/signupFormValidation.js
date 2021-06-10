const joi = require("joi")

const signupFormValidation = (data) => {
  const schema = joi.object({
    name: joi.string().min(1).required(),
    password: joi.string().min(8).required(),
    email: joi.string().min(3).required(),
  })
  return schema.validate(data)
}

module.exports = {
  signupFormValidation
}
