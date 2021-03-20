const Joi = require("joi");

const attemptValidation = (data) => {
  const schema = Joi.object({
    attempt_id: Joi.string().required(),
    submission_id: Joi.string().required(),
    question_id: Joi.string().required()
  });
  return schema.validate(data);
};

const recordAnswerValidation = (data) => {
  const schema = Joi.object({
    attempt_id: Joi.string().required(),
    submission_id: Joi.string().required(),
    answer_type: Joi.string().required(),
    response: Joi.any(),
    decision: Joi.any(),
    selected: Joi.any()
  });
  return schema.validate(data)
}

const markQuizCompleteValidation = data => {
  const schema = Joi.object({
    attempt_id: Joi.string().required(),
  });
  return schema.validate(data);
}

module.exports = { attemptValidation, recordAnswerValidation, markQuizCompleteValidation }