const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const statsSchema = new Schema(
  {
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
    question_id: {
      type: Schema.Types.ObjectId,
      ref: "questions",
    },
    topic_id: {
      type: Schema.Types.ObjectId,
      ref: "topics",
    },
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
    submission_id: {
      type: Schema.Types.ObjectId,
      ref: "submissions",
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Stat = mongoose.model("stats", statsSchema);
module.exports = { Stat };
