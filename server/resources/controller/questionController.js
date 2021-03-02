const Topic = require("../models/Topic");
const {
  questionAddValidate,
  idTopicValidation,
  topicValidation,
  statsValidate,
} = require("../utils/validation/questionValidation");

const addQuestion = async (req, res) => {
  const { topic: name } = req.params;
  const question = req.body;
  const { error } = questionAddValidate({ ...question, name });
  if (error) {
      return res
      .status(400)
      .json({
        error: true,
        message: "Adding question failed",
        reason: error.details[0].message,
      });
  }
  try {
    let findTopic = await Topic.find({ name: name });
    if (!findTopic.length) {
      return res
        .status(400)
        .json({ error: true, message: "Add topic before adding question" });
    }
    await Topic.updateOne(
      { name: name },
      {
        $push: {
          questions: question,
        },
      }
    );
    return res
      .status(200)
      .json({ error: false, message: "Question added Successfully" });
  } catch (err) {
    return res.status(400).json({
      error: true,
      message: "Something Went Wrong",
      reason: err,
    });
  }
};

const updateQuestion = async (req, res) => {
  const { topic: name, id } = req.params;
  const questionData = req.body;
  const { stats, id: questionId, ...question } = questionData
  const { error: statsError } = statsValidate(stats)
  if (statsError) {
    return res
      .status(400)
      .json({
        error: true,
        message: "Updating question failed check Stats",
        reason: statsError.details[0].message 
      });
  }
  const { error: idTopicError } = idTopicValidation(req.params)
  if ( idTopicError) {
    return res
      .status(400)
      .json({
        error: true,
        message: "Updating question failed check id and topic",
        reason: idTopicError.details[0].message 
      });
  }
  const { error: questionError } = questionAddValidate({ ...question, name });
  if (questionError) {
    return res
      .status(400)
      .json({
        error: true,
        message: "Updating question failed check question",
        reason: questionError.details[0].message,
      });
  }
  try {
    let updatedQuestion = await Topic.updateOne(
      {
        name: name,
        "questions.id": id,
      },
      {
        $set: {
          "questions.$": { ...question, id, stats },
        },
      }
    );
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
      reason: err,
    });
  }
};

const deleteQuestion = async (req, res) => {
  const { id, topic: name } = req.params;
  const { error } = idTopicValidation(req.params)
  if (error) {
    return res
      .status(400)
      .json({
        error: true,
        message: "Deleting question failed",
        reason: error.details[0].message,
      });
  }
  try {
    let deleteQuestion = await Topic.updateOne(
      {
        name: name,
      },
      {
        $pull: {
          questions: { id: id },
        },
      }
    );
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
      reason: err,
    });
  }
};

const getAllQuestion = async (req, res) => {
  try {
    let allQuestions = await Topic.find({}, { _id: 0, icon: 0 });
    if (!allQuestions) {
      return res.status(400).json({
        error: true,
        message: "Something went wrong",
      });
    }
    return res.status(200).json({
      error: false,
      message: "Successfully got Questions",
      questions: allQuestions,
    });
  } catch (err) {
    return res.status(400).json({
      error: true,
      message: "Something Went Wrong",
      reason: err,
    });
  }
};

const getQuestionByTopic = async (req, res) => {
  const { topic: name } = req.params;
  const { error } = topicValidation(req.params)
  if (error) {
    return res
      .status(400)
      .json({
        error: true,
        message: "Getting question failed",
        reason: error.details[0].message,
      });
  }
  try {
    let findedQuestion = await Topic.find(
      {
        name: name,
      },
      { _id: 0, icon: 0, name: 0 }
    );
    const { questions } = findedQuestion[0];
    if (!questions.length) {
      return res.status(400).json({
        error: true,
        message: `No Questions present in ${name}`,
      });
    }
    return res.status(200).json({
      error: false,
      message: "Question found successfully",
      questions: questions,
    });
  } catch (err) {
    return res.status(400).json({
      error: true,
      message: "Something Went Wrong",
      reason: err,
    });
  }
};

const getQuestionById = async (req, res) => {
  const { topic: name, id } = req.params;
  const { error } = idTopicValidation(req.params)
  if (error) {
    return res
      .status(400)
      .json({
        error: true,
        message: "Getting question failed",
        reason: error.details[0].message,
      });
  }
  try {
    let findedQuestion = await Topic.findOne(
      {
        name: name,
      },
      { questions: { $elemMatch: { id: id } } }
    );
    const { questions } = findedQuestion;
    if (!questions.length) {
      return res.status(400).json({
        error: true,
        message: "Question not present",
      });
    }
    return res.status(200).json({
      error: false,
      message: "Question found successfully",
      question: questions,
    });
  } catch (err) {
    return res.status(400).json({
      error: true,
      message: "Something Went Wrong",
      reason: err,
    });
  }
};

module.exports = {
  addQuestion,
  getQuestionById,
  getQuestionByTopic,
  updateQuestion,
  deleteQuestion,
  getAllQuestion,
};
