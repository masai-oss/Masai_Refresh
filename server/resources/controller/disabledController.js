const Topic = require("../models/Topic");

// Get all disabled questions...
const getDisabledQuestion = async (req, res) => {
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
        $match: {
          "questions.disabled": true,
        },
      },
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

// Get disabled question by Id..
const getDisabledQuestionById = async (req, res) => {
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

// Toggle Disable Status of a Question...
const toggleDisableStatus = async (req, res) => {
  const { id } = req.params;
  try {
    let topic = await Topic.findOne({ "questions._id": id });
    let disabled = topic.questions.find((q) => q._id == id).disabled;
    await Topic.updateOne(
      {
        "questions._id": id,
      },
      {
        $set: {
          "questions.$.disabled": !disabled,
        },
      }
    );

    res.status(200).json({
      error: true,
      message: "successful",
      data: { disabled: !disabled },
    });
  } catch (err) {
    res.status(400).json({ error: true, message: `${err}` });
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

module.exports = {
  getDisabledQuestion,
  getDisabledQuestionById,
  toggleDisableStatus,
};
