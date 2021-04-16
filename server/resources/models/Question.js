const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const QuestionTypeEnum = require("../utils/enums/QuestionTypeEnum");
const reasonEnum = require("../utils/enums/ReasonEnum");
const { Stat } = require("./Stats");

const questionSchema = new Schema(
  {
    type: {
      type: String,
      required: true,
      enum: [...Object.values(QuestionTypeEnum)],
    },
    verified: {
      type: Boolean,
      default: false,
      required: true,
    },
    source: {
      type: String,
      required: true,
    },
    stats: {
      type: Schema.Types.ObjectId,
      ref: "stats",
    },
    topic_id: {
      type: Schema.Types.ObjectId,
      ref: "topics",
    },
    flag: [
      {
        status: {
          solved: {
            type: Boolean,
            default: false,
          },
          by: {
            // admin user id
            type: Schema.Types.ObjectId,
            default: null,
          },
          description: {
            // reason from admin for user report
            type: String,
            default: null,
          },
          time: {
            type: Date,
            default: null,
          },
        },
        user_id: {
          type: Schema.Types.ObjectId,
        },
        reason: {
          type: [{ type: String, enum: [...Object.values(reasonEnum)] }],
          min: 1,
          max: 4,
        },
        description: {
          type: String,
          min: 1,
          max: 255,
        },
        time: {
          type: Date,
          default: Date.now,
        },
      },
    ],
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
      },
    },
  },
  { versionKey: false, timestamps: true }
);

const Question = mongoose.model("questions", questionSchema);

module.exports = { Question };
