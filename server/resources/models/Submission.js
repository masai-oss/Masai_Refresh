const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const outcomeEnum = require('../utils/enums/OutcomeEnum')
const QuestionTypeEnum = require("../utils/enums/QuestionTypeEnum");

const submissionSchema = new Schema(
    {
        topic_id: {
            required: true,
            type: Schema.Types.ObjectId
        },
        user_id: {
            required: true,
            type: Schema.Types.ObjectId
        },
        stats: {
            alloted: {
                type: Number,
                default: 0
            },
            skipped: {
                type: Number,
                default: 0
            },
            correct: {
                type: Number,
                default: 0
            },
            wrong: {
                type: Number,
                default: 0
            }
        },
        attempts: [
            {
                questions: [Schema.Types.ObjectId],
                answers: [
                    {
                        question_id: {
                            type: Schema.Types.ObjectId,
                            required: true
                        },
                        type: {
                          type: String,
                          required: true,
                          enum: [...Object.values(QuestionTypeEnum)],
                        },
                        outcome: {
                            type: String,
                            enum: [...Object.values(outcomeEnum)]
                        },
                        time: {
                            type: Number,
                            min: 0,
                            default: null
                        },
                        response: {
                          type: Schema.Types.Mixed,
                          required: function () {
                            return this.type === QuestionTypeEnum.SHORT;
                          }
                        },
                        selected: {
                          type: Schema.Types.Mixed,
                          required: function () {
                            return this.type === QuestionTypeEnum.MCQ;
                          }
                        },
                        decision: {
                          type: Schema.Types.Mixed,
                          required: function () {
                            return this.type === QuestionTypeEnum.TF;
                          }
                        }
                    }
                ],
                isStatsUpdated: {
                    type: Boolean,
                    default: false
                },
                current_question: {
                    type: Number,
                    default: 0,
                    required: true
                },
                stats: {
                    alloted: {
                        type: Number,
                        default: 0
                    },
                    skipped: {
                        type: Number,
                        default: 0
                    },
                    correct: {
                        type: Number,
                        default: 0
                    },
                    wrong: {
                        type: Number,
                        default: 0
                    },
                    time: {
                        type: Number,
                        min: 0
                    }
                }
            }
        ]
    },
    {
        versionKey: false,
    }
);

module.exports = mongoose.model("submissions", submissionSchema);
