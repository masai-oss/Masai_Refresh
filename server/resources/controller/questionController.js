const Topic = require("../models/Topic");
const {
  questionAddValidate,
  idTopicValidation,
  topicValidation,
  statsValidate,
  toggleVerificationValidation,
} = require("../utils/validation/questionValidation");

const addQuestion = async (req, res) => {
  const { topic: name } = req.params;
  const question = req.body;
  const { error } = questionAddValidate({ ...question, name, source: "fake" });
  if (error) {
    return res.status(400).json({
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
          questions: { ...question, source: "fake" },
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
      reason: `${err}`,
    });
  }
};

// Joi verification pending
const toggleVerification = async (req, res) => {
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
    let topic = await Topic.findOne({ "questions._id": id });
    let verified = topic.questions.find((q) => q._id == id).verified;
    await Topic.updateOne(
      {
        "questions._id": id,
      },
      {
        $set: {
          "questions.$.verified": !verified,
        },
      }
    );

    res.status(200).json({
      error: true,
      message: "The toggle of verification has been successful",
      data: { verified: !verified },
    });
  } catch (err) {
    res.status(400).json({ error: true, message: `${err}` });
  }
};

const updateQuestion = async (req, res) => {
  const { topic: name, id: _id } = req.params;
  const questionData = req.body;
  const { stats, _id: questionId, topic, ...question } = questionData;
  const { error: statsError } = statsValidate(stats);
  if (statsError) {
    return res.status(400).json({
      error: true,
      message: "Updating question failed check Stats",
      reason: statsError.details[0].message,
    });
  }
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
    let updatedQuestion = await Topic.updateOne(
      {
        name: name,
        "questions._id": _id,
      },
      {
        $set: {
          "questions.$": { ...question, _id, stats },
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
    let deleteQuestion = await Topic.updateOne(
      {
        name: name,
      },
      {
        $pull: {
          questions: { _id: id },
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
      reason: `${err}`,
    });
  }
};

const pagination = (page, limit, questions) => {
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const results = {};
  let size = questions.length;
  results.limit = limit;
  results.totalCount = size;
  results.maxPage = Math.ceil(size / limit);
  results.currentPage = page;
  if (size > limit) {
    if (endIndex < size) {
      results.next = {
        page: page + 1,
        limit: limit,
      };
    }
    if (startIndex > 0) {
      let maxPage = Math.ceil(size / limit);
      results.prev = {
        page: maxPage < page ? maxPage : page - 1,
        limit: limit,
      };
    }
  }
  if (startIndex > size) {
    results.current = [];
    return results;
  }
  let currenInfo =
    size > limit ? questions.slice(startIndex, endIndex) : questions;
  results.current = currenInfo;
  return results;
};

const getAllQuestion = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  try {
    if (page < 1) {
      return res.status(400).json({
        error: true,
        message: "The Page No must be greater than 0",
      });
    }
    let questions = await Topic.aggregate([
      {
        $addFields: {
          "questions.topic": "$name",
        },
      },
      {
        $group: {
          _id: 0,
          allQuestions: { $push: "$questions" },
        },
      },
    ]);
    if (!questions[0].allQuestions.length) {
      return res.status(400).json({
        error: true,
        message: "No questions are present",
      });
    }
    let allQuestions = [];
    questions[0].allQuestions.forEach((topicQue) => {
      if (topicQue.length !== undefined) {
        allQuestions.push(...topicQue);
      }
    });
    let paginatedResults = pagination(page, limit, allQuestions);
    return res.status(200).json({
      error: false,
      message: "Successfully got Questions",
      questions: paginatedResults,
    });
  } catch (err) {
    return res.status(400).json({
      error: true,
      message: "Something Went Wrong",
      reason: `${err}`,
    });
  }
};

const getQuestionByTopic = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const { topic: name } = req.params;
  const { error } = topicValidation(req.params);
  if (error) {
    return res.status(400).json({
      error: true,
      message: "Getting question failed",
      reason: error.details[0].message,
    });
  }
  try {
    if (page < 1) {
      return res.status(400).json({
        error: true,
        message: "The Page No must be greater than 0",
      });
    }
    let findedQuestion = await Topic.find(
      {
        name: name,
      },
      { icon: 0, name: 0 }
    );
    if (!findedQuestion.length) {
      return res.status(400).json({
        error: true,
        message: `No Questions present in ${name}`,
      });
    }
    const [{ questions }] = findedQuestion;
    let paginatedResults = pagination(page, limit, questions);
    return res.status(200).json({
      error: false,
      message: "Question found successfully",
      questions: paginatedResults,
    });
  } catch (err) {
    return res.status(400).json({
      error: true,
      message: "Something Went Wrong",
      reason: `${err}`,
    });
  }
};

const getQuestionById = async (req, res) => {
  const { id } = req.params;
  try {
    let findedQuestion = await Topic.find(
      { questions: { $elemMatch: { _id: id } } },
      { "questions.$": 1, _id: 0 }
    );
    if (!findedQuestion.length) {
      return res.status(400).json({
        error: true,
        message: "Question not present",
      });
    }
    const [{ questions }] = findedQuestion;
    return res.status(200).json({
      error: false,
      message: "Question found successfully",
      question: questions,
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
  addQuestion,
  getQuestionById,
  getQuestionByTopic,
  updateQuestion,
  deleteQuestion,
  getAllQuestion,
  toggleVerification,
};
