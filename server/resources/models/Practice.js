const mongoose = require("mongoose");
const topics_enum = require("../utils/enums/TopicsEnum");
const question_type_enum = require("../utils/enums/QuestionTypeEnum");
const reason_enum = require("../utils/enums/ReasonEnum");

const practiceSchema = new mongoose.Schema(
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
          enum: [...Object.values(question_type_enum)],
        },
        verified: {
          type: Boolean,
          default: false,
        },
        disabled: {
          type: Boolean,
          required: true,
          default: false,
        },
        flag: [
          {
            status: {
              solved: {
                type: Boolean,
                default: false,
              },
              by: {
                type: mongoose.Schema.Types.ObjectId,
                default: null,
              },
            },
            user_id: {
              type: mongoose.Schema.Types.ObjectId,
              required: true,
            },
            reason: {
              type: [{ type: String, enum: [...Object.values(reason_enum)] }],
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
              default: Date.now
            },
          },
        ],
        source: {
          type: String,
          required: true,
        },
        statement: {
          type: String,
          required: true,
          min: 1,
        },
        explanation: {
          type: String,
        },
        answer: {
          type: String,
          required: true,
          min: 1,
        },
        likes: {
          type: Number,
          default: 0,
        },
      },
    ],
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model("practices", practiceSchema);
