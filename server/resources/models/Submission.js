const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const outcomeEnum = require("../utils/enums/OutcomeEnum");
const QuestionTypeEnum = require("../utils/enums/QuestionTypeEnum");

const submissionSchema = new Schema(
  {
    topic_id: {
      required: true,
      type: Schema.Types.ObjectId,
    },
    user_id: {
      required: true,
      type: Schema.Types.ObjectId,
    },
    stats: {
      type: Schema.Types.ObjectId,
      ref: "stats",
    },
    attempts: [
      {
        questions: [Schema.Types.ObjectId],
        stats: {
          type: Schema.Types.ObjectId,
          ref: "stats",
        },
        answers: [
          {
            question_id: {
              type: Schema.Types.ObjectId,
              required: true,
            },
            type: {
              type: String,
              required: true,
              enum: [...Object.values(QuestionTypeEnum)],
            },
            outcome: {
              type: String,
              enum: [...Object.values(outcomeEnum)],
              default: outcomeEnum.SKIPPED,
            },
            time: {
              type: Number,
              min: 0,
              default: 0,
            },
            response: {
              type: Schema.Types.Mixed,
              required: function () {
                return this.type === QuestionTypeEnum.SHORT;
              },
            },
            selected: {
              type: Schema.Types.Mixed,
              required: function () {
                return this.type === QuestionTypeEnum.MCQ;
              },
            },
            decision: {
              type: Schema.Types.Mixed,
              required: function () {
                return this.type === QuestionTypeEnum.TF;
              },
            },
          },
        ],
        isStatsUpdated: {
          type: Boolean,
          default: false,
          required: true,
        },
        current_question: {
          type: Number,
          default: 0,
          required: true,
        },
      },
    ],
  },
  {
    versionKey: false,
  }
);

const Submission = mongoose.model("submissions", submissionSchema);

module.exports = { Submission };
