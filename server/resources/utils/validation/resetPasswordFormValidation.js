const joi = require('joi')

const resetPasswordFormValidation = (data) => {
  const schema = joi.object({
    email: joi.string().min(3).required(),
    new_password: joi.string().trim().min(8).required(),
    OTP: joi.string().trim().min(6).max(6).required()
  })
  return schema.validate(data)
}

module.exports = {
  resetPasswordFormValidation
}