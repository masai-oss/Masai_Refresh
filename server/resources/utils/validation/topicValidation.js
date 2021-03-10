const Joi = require("joi");
const topics = require("../enums/TopicsEnum");

const topicValues = Object.values(topics);

const topicValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string()
      .valid(...topicValues)
      .required(),
  });
  return schema.validate(data);
};


const addTopicValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string()
      .valid(...topicValues)
      .required(),
    icon: Joi.string().required()
  });
  return schema.validate(data)
}

module.exports = { topicValidation, addTopicValidation }