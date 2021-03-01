const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const topics_enum = require('../utils/enums/TopicsEnum')
const question_schema = require('./Question')

const topicSchema = new Schema(
  {
    name: {
        type: String,
        required: true,
        enum: [...Object.values(topics_enum)]
    },
    icon: {
        type: String,
        required: true
    },
    questions: []
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model("topics", topicSchema);
