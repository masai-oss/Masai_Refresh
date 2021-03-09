const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const topics_enum = require("../utils/enums/TopicsEnum");
const QuestionTypeEnum = require("../utils/enums/QuestionTypeEnum");
const uuid = require("uuid")
const topicSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique:true,
      enum: [...Object.values(topics_enum)],
    },
    icon: {
      type: String,
      required: true,
    },
    questions: [{
      type: {
        type: String,
        required: true,
        enum: [...Object.values(QuestionTypeEnum)],
      },
      statement: {
        type: String,
        required: true,
        min: 1,
      },
      explanation: {
        type: String,
      },
      correct: {
        type: Boolean,
        required: function () {
          return this.type === QuestionTypeEnum.TF;
        },
      },
      answer: {
        type: String,
        required: function () {
          return this.type === QuestionTypeEnum.SHORT;
        },
      },
      options: {
        type: [
          {
            _id: false,
            text: {
              type: String,
              required: true,
              min: 1,
            },
            correct: {
              type: Boolean,
              required: true,
            },
          },
        ],
        required: function () {
          return this.type === QuestionTypeEnum.MCQ;
        }
      },
      stats: {
        alloted: {
          type: Number,
          required: true,
          default: 0,
        },
        skipped: {
          type: Number,
          required: true,
          default: 0,
        },
        correct: {
          type: Number,
          required: true,
          default: 0,
        },
        wrong: {
          type: Number,
          required: true,
          default: 0,
        },
      },
    }],
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model("topics", topicSchema);
