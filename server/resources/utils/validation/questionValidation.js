const Joi = require("joi");
const question_types = require("../enums/QuestionTypeEnum");
const topics = require("../enums/TopicsEnum");

const topicValues = Object.values(topics);
const questionTypeValues = Object.values(question_types)

let options = Joi.object().keys({
  text: Joi.string().required(),
  correct: Joi.boolean().required(),
});

const mcqvalidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().valid(...topicValues).required(),
    type: Joi.string().valid(question_types.MCQ).required(),
    statement: Joi.string().required(),
    explanation: Joi.string().required(),
    options: Joi.array().min(2).max(4).items(options).required(),
  });
  return schema.validate(data);
};

const tfValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().valid(...topicValues).required(),
    type: Joi.string().valid(question_types.TF).required(),
    statement: Joi.string().required(),
    explanation: Joi.string().required(),
    correct: Joi.boolean().required(),
  });
  return schema.validate(data);
};

const shortValidataion = (data) => {
  const schema = Joi.object({
    name: Joi.string().valid(...topicValues).required(),
    type: Joi.string().valid(question_types.SHORT).required(),
    statement: Joi.string().required(),
    explanation: Joi.string().required(),
    answer: Joi.string().required(),
  });
  return schema.validate(data);
};

const questionAddValidate = (data) => {
  let type = data.type
  if (type === question_types.MCQ) {
    return mcqvalidation(data);
  } else if (type === question_types.TF) {
    return tfValidation(data);
  } else if(type === question_types.SHORT){
    return shortValidataion(data);
  }
  else {
    const schema = Joi.object({
      type: Joi.string().valid(...questionTypeValues).required()
    })
    return schema.validate({ type })
  }
};

const statsValidate = (data) => {
  const schema = Joi.object({
    alloted: Joi.number().required(),
    skipped: Joi.number().required(),
    correct: Joi.number().required(),
    wrong: Joi.number().required()
  })
  return schema.validate(data)
}

const idTopicValidation = (data) => {
  const schema = Joi.object({
    topic: Joi.string().valid(...topicValues).required(),
    id: Joi.string().required(),
  });
  return schema.validate(data);
};

const topicValidation = (data) => {
  const schema = Joi.object({
    topic: Joi.string().valid(...topicValues).required(),
  });
  return schema.validate(data)
};

module.exports = { questionAddValidate, idTopicValidation, topicValidation, statsValidate };
