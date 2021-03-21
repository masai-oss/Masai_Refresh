const Joi = require("joi");
const reasonEnum = require("../enums/ReasonEnum");

const reportValues = Object.values(reasonEnum);

const reportQuestionValidation = (data) => {
  const schema = Joi.object({
    reason: Joi.array().items(Joi.string().valid(...reportValues)).min(1).max(4).required(),
    description: Joi.string().min(1).max(255).required(),
  });
  return schema.validate(data);
};

module.exports = { reportQuestionValidation };