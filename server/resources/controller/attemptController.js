const Submission = require('../models/Submission')
const Topic = require('../models/Topic')
const TopicsEnum = require('../utils/enums/TopicsEnum')

const createAttempt = async ( req, res ) => {
    let { id : user_id } = req
    let { topic_id } = req.params
    let { size } = req.body
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
            res.status(200).json({error: false, data: { questions: latestAttempt.questions, id: latestAttempt._id }})
        }
        else{
            throw "New Practice Quiz attempt could not be created."
        }

    }
    catch(err){
        res.status(400).json({error: true, message: err})
    } 
}

module.exports = {
    createAttempt
}
