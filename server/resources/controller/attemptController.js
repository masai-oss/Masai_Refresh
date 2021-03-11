const Submission = require('../models/Submission')
const Topic = require('../models/Topic')
const QuestionTypeEnum = require('../utils/enums/QuestionTypeEnum')
const TopicsEnum = require('../utils/enums/TopicsEnum')

const createAttempt = async ( req, res ) => {
    let { id : user_id } = req
    let { size, topic_id } = req.body
    if(!size){
        size = 5
    }

    try{

        let answers = await Topic.aggregate([
            {
                $match: {
                    "_id" : require('mongodb').ObjectID(topic_id)
                }
            },
            {
                $unwind: "$questions"
            },
            {
                $project: {
                    "question_id" : "$questions._id",
                    "type" : "$questions.type",
                    "type" : "$questions.type",
                    "_id" : 0
                }
            },
            {
                $sample: {
                    size: size
                }
            }
        ])

        if(answers.length === 0){
            throw "The topic ID did not match"
        }

        let submission_obj = await Submission.findOne({topic_id, user_id})
        if(!submission_obj){
            await Submission({topic_id, user_id}).save()
        }

        
        let questions = answers.map(el => el.question_id)
        let result = await Submission.updateOne({topic_id, user_id}, 
            {
                $push : {
                    attempts: {
                        $each: [{questions, answers}]
                    } 
                }
            }    
        )
        
        if(result.nModified > 0){
            let submission = await Submission.findOne({topic_id, user_id})
            let attempts = submission.attempts
            let latestAttempt = attempts[attempts.length - 1]
            res.status(200).json({error: false, data: { questions: latestAttempt.questions, attempt_id: latestAttempt._id, submission_id: submission._id  }})
        }
        else{
            throw "New Practice Quiz attempt could not be created."
        }

    }
    catch(err){
        res.status(400).json({error: true, message: `${err}`})
    } 
}

const nextAttempt = async(req, res) => {
    let { attempt_id, submission_id } = req.body

    try{
        let attempt_question = await get_attempt_question(submission_id, attempt_id)
        if(!attempt_question){
            throw new Error("The Practice quiz has ended.")
        }
        
        let topic = await Topic.findOne({ "questions._id" : attempt_question }, {questions: {$elemMatch: {_id: attempt_question}}})
        let topic_question = topic.questions[0]
        let question_to_send = get_question_to_send(topic_question)
        await update_current_question_in_submission(submission_id, attempt_id)

        res.status(200).json({error: false, data: question_to_send})
    }
    catch(err){
        res.status(400).json({error: true, message: `${err}`})
    }
}

const recordAttempt = async(req, res) => {
    let { attempt_id, submission_id, answer_type, response, selected, decision } = req.body
    try{
        let attempt_question = await get_attempt_question(submission_id, attempt_id, true)
        if(!attempt_question){
            throw new Error("The Practice quiz has ended.")
        }
        let answer = answer_type === QuestionTypeEnum.SHORT ? response : answer_type === QuestionTypeEnum.TF ? selected : decision
        await update_submission(submission_id, attempt_id, answer_type, answer)

        res.status(200).json({error: false, message: "Record updated"})
    }
    catch(err){
        res.status(400).json({error: true, message: `${err}`})
    }
}




// helper functions
// -----------------------------------------------------------------------------------------------------------------


const update_submission = async(submission_id, attempt_id, answer_type, answer) => {
    console.log(answer)
    let type = answer_type === QuestionTypeEnum.SHORT ? "response" : answer_type === QuestionTypeEnum.TF ? "selected" : "decision"

    let sub = await Submission.findOne({_id: submission_id, "attempts._id": attempt_id})
    let current_question = sub.attempts[0].current_question

    await Submission.updateOne(
        {
            _id: submission_id,
            "attempts._id": attempt_id,
        },
        {
            [`attempts.$.answers.${current_question}.${type}`] : answer
        }
    )
}
const update_topic = async(topic_id, question_id, answer_type) => {
    let key = answer_type === 1 ? "correct" : answer_type === 0 ? "wrong" : "skipped"
    key = `questions.$.stats.${key}`

    await Topic.updateOne(
        {
            _id: topic_id,
            "questions._id": question_id   
        },
        {
            $inc: {
               [key] : 1
            }
        }
    )
}

const get_attempt_question = async (submission_id, attempt_id, record = false) => {
    let submission = await Submission.findById(submission_id)
    let attempt = submission.attempts.find(el => el._id == attempt_id)
    let current_question_index = attempt.current_question
    return attempt.questions[record ? current_question_index - 1 : current_question_index]
}


const update_alloted_in_topic = async (topic_id, question_id) => {
    await Topic.updateOne(
        {
            _id: topic_id,
            "questions._id": question_id   
        },
        {
            $inc: {
                "questions.$.stats.alloted": 1
            }
        }
    )
}

const update_current_question_in_submission = async (submission_id, attempt_id) => {
    await Submission.updateOne(
        {
            _id: submission_id,
            "attempts._id": attempt_id   
        },
        {
            $inc: {
                "attempts.$.current_question" : 1
            }
        }
    )
}

const get_question_to_send = (topic_question) => {
    return {
        id: topic_question._id,
        type: topic_question.type,
        statement: topic_question.statement,
        explanation: topic_question.explanation,
        correct: topic_question.correct,
        answer: topic_question.answer,
        options: topic_question.options
    }
}

module.exports = {
    createAttempt,
    nextAttempt,
    recordAttempt
}
