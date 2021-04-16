const { Question } = require("../models/Question");
const { Topic } = require("../models/Topic");
const { Stat } = require("../models/Stats");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const {
  questionAddValidate,
  idTopicValidation,
  topicValidation,
  toggleVerificationValidation,
} = require("../utils/validation/questionValidation");

const createQuestion = async (req, res) => {
  const { topic: name } = req.params;
  const question = req.body;
  const { error } = questionAddValidate({ ...question, name });
  if (error) {
    return res.status(400).json({
      error: true,
      message: "Adding question failed",
      reason: error.details[0].message,
    });
  }
  try {
    // Find if the topic present
    let findTopic = await Topic.find({ name: name });
    if (!findTopic.length) {
      return res
        .status(400)
        .json({ error: true, message: "Add topic before adding question" });
    }
    let addNewQuestion = await new Question(question).save();
    // creating new stat for the new question
    let newStatData = await new Stat({
      question_id: addNewQuestion._id,
    }).save();
    // adding the stat id to the question created
    await Question.findByIdAndUpdate(
      { _id: addNewQuestion._id },
      { stats: newStatData._id }
    );
    // adding the question ID to topic
    await Topic.updateOne(
      { name: name },
      {
        $push: {
          questions: addNewQuestion._id,
        },
      }
    );
    return res.status(200).json({
      error: false,
      message: "Question added successfully",
    });
  } catch (ere) {
    return res.status(400).json({
      error: true,
      message: "Something Went Wrong",
      reason: `${err}`,
    });
  }
};

const getQuestionById = async (req, res) => {
  let { id: _id } = req.params;
  console.log(_id);
  try {
    let findedQuestion = await Question.find({ _id })
      .populate("stats", { question_id: 0 })
      .exec();
    if (!findedQuestion.length) {
      return res.status(400).json({
        error: true,
        message: "Question not present",
      });
    }
    return res.status(400).json({
      error: true,
      question: findedQuestion,
    });
  } catch (err) {
    return res.status(400).json({
      error: true,
      message: "Something Went Wrong",
      reason: `${err}`,
    });
  }
};

const getQuestionsByTopic = async (req, res) => {
  const { topic: name } = req.params;
  const { error } = topicValidation(req.params);
  if (error) {
    return res.status(400).json({
      error: true,
      message: "Adding question failed",
      reason: error.details[0].message,
    });
  }
  try {
    let topicQuestions = await Topic.find({ name }).populate("questions");
    if (!topicQuestions.length) {
      return res.status(400).json({
        error: true,
        message: "Topic not present",
      });
    }
    const [{ questions }] = topicQuestions;
    return res.status(200).json({
      error: false,
      message: "Question found successfully",
      questions: questions,
    });
  } catch (err) {
    return res.status(400).json({
      error: true,
      message: "Something Went Wrong",
      reason: `${err}`,
    });
  }
};

const getAllQuestions = async (req, res) => {
  try {
    return res.status(200).json({
      error: false,
      data: res.pagination,
    });
  } catch (err) {
    return res.status(400).json({
      error: true,
      message: "Something Went Wrong",
      reason: `${err}`,
    });
  }
};

const updateQuestion = async (req, res) => {
  const { topic: name, id: _id } = req.params;
  const questionData = req.body;
  const { _id: questionId, topic, ...question } = questionData;
  const { error: idTopicError } = idTopicValidation(req.params);
  if (idTopicError) {
    return res.status(400).json({
      error: true,
      message: "Updating question failed check id and topic",
      reason: idTopicError.details[0].message,
    });
  }
  const { error: questionError } = questionAddValidate({ ...question, name });
  if (questionError) {
    return res.status(400).json({
      error: true,
      message: "Updating question failed check question",
      reason: questionError.details[0].message,
    });
  }
  try {
    let updatedQuestion = await Question.updateOne({ _id }, question);
    if (!updatedQuestion) {
      return res.status(400).json({
        error: true,
        message: `${name} question unable to update`,
      });
    }
    return res.status(200).json({
      error: false,
      message: `${name} question updated successfully`,
      question: question,
    });
  } catch (err) {
    return res.status(400).json({
      error: true,
      message: "Something Went Wrong",
      reason: `${err}`,
    });
  }
};

const deleteQuestion = async (req, res) => {
  const { id, topic: name } = req.params;
  const { error } = idTopicValidation(req.params);
  if (error) {
    return res.status(400).json({
      error: true,
      message: "Deleting question failed",
      reason: error.details[0].message,
    });
  }
  try {
    let findedQuestion = await Question.find({ _id: id }).exec();
    if (!findedQuestion.length) {
      return res.status(400).json({
        error: true,
        message: "Question not present",
      });
    }
    // Deleting the stat which is refrenced to the question
    await Stat.deleteOne({ question_id: ObjectId(id) });
    let deleteQuestion = await Question.deleteOne({ _id: ObjectId(id) });
    if (!deleteQuestion) {
      return res.status(400).json({
        error: true,
        message: `${name} question unable to delete`,
      });
    }
    return res.status(200).json({
      error: false,
      message: `${name} question deleted successfully`,
    });
  } catch (err) {
    return res.status(400).json({
      error: true,
      message: "Something Went Wrong",
      reason: `${err}`,
    });
  }
};

const verifyQuestion = async (req, res) => {
  const { id } = req.params;
  const { error } = toggleVerificationValidation({ id });
  if (error) {
    return res.status(400).json({
      error: true,
      message: "Validation for id failed",
      reason: error.details[0].message,
    });
  }
  try {
    let findQuestion = await Question.find({ _id: id }).exec();
    if (!findQuestion.length) {
      return res.status(400).json({
        error: true,
        message: "Question not present",
      });
    }
    let [{ verified }] = findQuestion;
    await Question.updateOne({ _id: id }, { $set: { verified: !verified } });
    return res.status(200).json({
      error: true,
      message: "The toggle of verification has been successful",
      data: {
        verified: !verified,
      },
    });
  } catch (err) {
    return res.status(400).json({
      error: true,
      message: "Something Went Wrong",
      reason: `${err}`,
    });
  }
};

module.exports = {
  createQuestion,
  getQuestionById,
  getQuestionsByTopic,
  getAllQuestions,
  updateQuestion,
  deleteQuestion,
  verifyQuestion,
};
