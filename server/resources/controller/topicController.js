const Topic = require('../models/Topic')


const getAllTopics = async ( req, res ) => {

    try{
        let result = await Topic.find().exec()
        res.status(200).json({error: false, data: result})
    }
    catch(err){
        res.status(400).json({error: true, message: err})
    } 
}

const getTopicById = async ( req, res ) => {
    const { id } = req.params

    try{
        let result = await Topic.findById(id).exec()
        if(!result){
            return res.status(404).json({error: true, message: "Topic with the given ID does not exist"})
        }
        res.status(200).json({error: false, data: result})
    }
    catch(err){
        res.status(400).json({error: true, message: err})
    } 
}

const getTopicByName = async ( req, res ) => {
    let { name } = req.params
    
    try{
        name = name.toUpperCase()
        let result = await Topic.findOne({name}).exec()
        if(!result){
            return res.status(404).json({error: true, message: "Given topic name does not exist"})
        }
        res.status(200).json({error: false, data: result})
    }
    catch(err){
        res.status(400).json({error: true, message: err})
    } 
}

const addTopic = async ( req, res ) => {
    const { name, icon } = req.body  

    try{
        let temp = await Topic.findOne({name}).exec()
        if(!temp){
            await new Topic({name, icon}).save()
            res.status(201).json({error: false, message: "The topic has been created."})
        }
        else{
            res.status(409).json({error: true, message: "The topic cannot be created as it already exists."})
        }
    }
    catch(err){
        res.status(400).json({error: true, message: err})
    }
}
 
const deleteTopic = async ( req, res ) => {
    const { id } = req.params

    try{
        let result = await Topic.deleteOne({_id: id})
        if(result.deletedCount === 0){
            return res.status(404).json({error: true, message: "The Topic could not be deleted as the information provided could not match any record"})
        }
        res.status(200).json({error: false, message: "The topic has been deleted"})
    }
    catch(err){
        res.status(400).json({error: true, message: err})
    }
}

const editTopic = async ( req, res ) => {
    const { id } = req.params
    const data = req.body

    try{
        let result = await Topic.updateOne({_id: id}, data)
        res.status(200).json({error: false, message: "The topic has been updated"})
    }
    catch(err){
        res.status(400).json({error: true, message: err})
    }
}

const replaceTopic = async ( req, res ) => {
    const { id } = req.params
    const data = req.body

    try{
        let result = await Topic.replaceOne({_id: id}, data)
        res.status(200).json({error: false, message: "The topic has been replaced"})
    }
    catch(err){
        res.status(400).json({error: true, message: err})
    }
}

module.exports = {
    getAllTopics,
    getTopicById,
    getTopicByName,
    addTopic,
    deleteTopic,
    editTopic,
    replaceTopic
}
