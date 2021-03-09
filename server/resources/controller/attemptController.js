const Submission = require('../models/Submission')
const Topic = require('../models/Topic')

const createAttempt = async ( req, res ) => {
    let { id : user_id } = req
    let { topic_id } = req.params
    
    try{
        let submission = await Submission.findOne({user_id, topic_id}).exec()
        // console.log(submission)
        if(!submission){
            let submission = await Submission({user_id, topic_id}).save()
            console.log(submission)
        }
        // res.status(200).json({error: false, message: sub})
    }
    catch(err){
        res.status(400).json({error: true, message: err})
    }
}

module.exports = {
    createAttempt
}
