const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const topics_enum = require("../utils/enums/TopicsEnum");
const QuestionTypeEnum = require("../utils/enums/QuestionTypeEnum");
const reasonEnum = require("../utils/enums/ReasonEnum");

const topicSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      enum: [...Object.values(topics_enum)],
    },
    icon: {
      type: String,
      required: true,
    },
    questions: [
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
        disabled: {
          type: Boolean,
          required: true,
          default: false,
        },
        source: {
          type: String,
          required: true,
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
      },
    ],
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model("topics", topicSchema);
