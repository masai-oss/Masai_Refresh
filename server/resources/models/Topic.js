const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const topics_enum = require("../utils/enums/TopicsEnum");

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
        type: Schema.Types.ObjectId,
        ref: "question",
        required: true,
      },
    ],
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Topic = mongoose.model("topics", topicSchema);
module.exports = { Topic };
