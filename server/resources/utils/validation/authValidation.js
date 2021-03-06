const Joi = require("joi");

const userInfoValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    googleId: Joi.string().required(),
    profilePic: Joi.string().required(),
  });
  return schema.validate(data);
};

module.exports = userInfoValidation