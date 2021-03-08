const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const outcomeEnum = require('../utils/enums/OutcomeEnum')

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
                        outcome: {
                            type: String,
                            default: outcomeEnum.SKIPPED,
                            enum: [...Object.values(outcomeEnum)]
                        },
                        time: {
                            required: true,
                            type: String
                        },
                        response: String,
                        selected: Number,
                        decision: Boolean
                    }
                ],
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
                        required: true,
                        type: Number
                    }
                }
            }
        ]
    },
    {
        versionKey: false,
    }
);

module.exports = mongoose.model("topic", submissionSchema);
