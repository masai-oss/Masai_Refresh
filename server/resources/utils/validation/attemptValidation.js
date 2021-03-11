const Joi = require("joi");

const attemptValidation = (data) => {
  const schema = Joi.object({
    attempt_id: Joi.string().required(),
    submission_id: Joi.string().required(),
  });
  return schema.validate(data);
};

const recordAnswerValidation = (data) => {
  const schema = Joi.object({
    attempt_id: Joi.string().required(),
    submission_id: Joi.string().required(),
    answer_type: Joi.number().required(),
    time: Joi.number().required()
  });
  return schema.validate(data)
}

module.exports = { attemptValidation, recordAnswerValidation }