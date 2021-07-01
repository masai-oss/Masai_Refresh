const joi = require("joi");

const resetPasswordFormValidation = (data) => {
  const schema = joi.object({
    new_password: joi.string().trim().min(8).required(),
    pass: joi.string().trim().min(1).required(),
  });
  return schema.validate(data);
};

module.exports = {
  resetPasswordFormValidation,
};
