const mongoose = require("mongoose");
const QuestionTypeEnum = require("../utils/enums/QuestionTypeEnum");
const Schema = mongoose.Schema;

const questionSchema = new Schema(
  {
    type: {
        type: String,
        required: true,
        enum: [...Object.values(QuestionTypeEnum)]
    },
    statement: {
        type: String,
        required: true,
        min: 1,
    },
    explanation: {
        type: String
    },
    correct: {
        type: Boolean,
        required: function(){
            return this.type === QuestionTypeEnum.TF
        }
    },
    answer: {
        type: String,
        required: function(){
            return this.type === QuestionTypeEnum.SHORT
        }
    },
    options: {
        type: [{
            _id: false,
            text: {
                type: String,
                required: true,
                min: 1
            },
            correct: {
                type: Boolean,
                required: true
            }
        }]
    },
    stats : {
        alloted: {
            type: Number,
            required: true,
            default: 0
        },
        skipped: {
            type: Number,
            required: true,
            default: 0
        },
        correct: {
            type: Number,
            required: true,
            default: 0
        },
        wrong: {
            type: Number,
            required: true,
            default: 0
        }
    }
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model("topic", questionSchema);
