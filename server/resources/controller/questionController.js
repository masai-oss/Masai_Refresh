const Topic = require("../models/Topic");
const Practice = require("../models/Practice");

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

const toggleVerification = async (req, res) => {
  const { id, type } = req.params;
  try {
    let topic, verified;

    if (type == "long") {
      topic = await Practice.findOne({ "questions._id": id });
      verified = topic.questions.find((q) => q._id == id).verified;

      await Practice.updateOne(
        {
          "questions._id": id,
        },
        {
          $set: {
            "questions.$.verified": !verified,
          },
        }
      );
    } else {
      topic = await Topic.findOne({ "questions._id": id });
      verified = topic.questions.find((q) => q._id == id).verified;
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
    }

    res.status(200).json({
      error: false,
      message: "successful",
      data: { verified: !verified },
    });
  } catch (err) {
    res.status(400).json({ error: true, message: `${err}` });
  }
};

// IN PROGRESS
const updateQuestion = async (req, res) => {
  const { topic: name, id: _id, type } = req.params;
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
    let updatedQuestion;
    if (type === "long") {
      updatedQuestion = await Topic.updateOne(
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
    } else {
      updatedQuestion = await Practice.updateOne(
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
    }

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
  const disabledFilter = req.query.disabledFilter;
  const reportedFilter = req.query.reportedFilter;

  try {
    if (page < 1) {
      return res.status(400).json({
        error: true,
        message: "The Page No must be greater than 0",
      });
    }
    var questions1, questions2;
    if (disabledFilter != "true" && reportedFilter != "true") {
      questions1 = await Topic.aggregate([
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

      questions2 = await Practice.aggregate([
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
    } else if (disabledFilter == "true") {
      questions1 = await Topic.aggregate([
        {
          $addFields: {
            "questions.topic": "$name",
          },
        },
        {
          $project: {
            questions: {
              $filter: {
                input: "$questions",
                as: "item",
                cond: { $eq: ["$$item.disabled", true] },
              },
            },
          },
        },
        {
          $group: {
            _id: 0,
            allQuestions: { $push: "$questions" },
          },
        },
      ]);

      questions2 = await Practice.aggregate([
        {
          $addFields: {
            "questions.topic": "$name",
          },
        },
        {
          $project: {
            questions: {
              $filter: {
                input: "$questions",
                as: "item",
                cond: { $eq: ["$$item.disabled", true] },
              },
            },
          },
        },
        {
          $group: {
            _id: 0,
            allQuestions: { $push: "$questions" },
          },
        },
      ]);
    } else if (reportedFilter == "true") {
      questions1 = await Topic.aggregate([
        {
          $addFields: {
            "questions.topic": "$name",
          },
        },
        {
          $project: {
            questions: {
              $filter: {
                input: "$questions",
                as: "item",
                cond: {
                  $gt: [{ $size: "$$item.flag" }, 0],
                },
              },
            },
          },
        },
        {
          $group: {
            _id: 0,
            allQuestions: { $push: "$questions" },
          },
        },
      ]);

      questions2 = await Practice.aggregate([
        {
          $addFields: {
            "questions.topic": "$name",
          },
        },
        {
          $project: {
            questions: {
              $filter: {
                input: "$questions",
                as: "item",
                cond: {
                  $gt: [{ $size: "$$item.flag" }, 0],
                },
              },
            },
          },
        },
        {
          $group: {
            _id: 0,
            allQuestions: { $push: "$questions" },
          },
        },
      ]);
    }

    let allQuestions = [];
    if (questions1[0].allQuestions.length > 0) {
      questions1[0].allQuestions.forEach((topicQue) => {
        if (topicQue.length !== undefined) {
          allQuestions.push(...topicQue);
        }
      });
    }
    if (questions2[0].allQuestions.length > 0) {
      questions2[0].allQuestions.forEach((topicQue) => {
        if (topicQue.length !== undefined) {
          allQuestions.push(...topicQue);
        }
      });
    }
    if (allQuestions.length == 0) {
      return res.status(400).json({
        error: true,
        message: "No questions are present",
      });
    }

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
  const disabledFilter = req.query.disabledFilter;
  const reportedFilter = req.query.reportedFilter;
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
    var findedQuestion1, findedQuestion2, findedQuestion;
    if (disabledFilter != "true" && reportedFilter != "true") {
      findedQuestion1 = await Topic.find(
        {
          name: name,
        },
        { icon: 0, name: 0 }
      );

      findedQuestion2 = await Practice.find(
        {
          name: name,
        },
        { icon: 0, name: 0 }
      );
    } else if (disabledFilter == "true") {
      findedQuestion1 = await Topic.aggregate([
        {
          $match: {
            name: name,
          },
        },
        {
          $project: {
            questions: {
              $filter: {
                input: "$questions",
                as: "item",
                cond: { $eq: ["$$item.disabled", true] },
              },
            },
          },
        },
      ]);

      findedQuestion2 = await Practice.aggregate([
        {
          $match: {
            name: name,
          },
        },
        {
          $project: {
            questions: {
              $filter: {
                input: "$questions",
                as: "item",
                cond: { $eq: ["$$item.disabled", true] },
              },
            },
          },
        },
      ]);
    } else if (reportedFilter == "true") {
      findedQuestion1 = await Topic.aggregate([
        {
          $match: {
            name: name,
          },
        },
        {
          $project: {
            questions: {
              $filter: {
                input: "$questions",
                as: "item",
                cond: {
                  $gt: [{ $size: "$$item.flag" }, 0],
                },
              },
            },
          },
        },
      ]);

      findedQuestion2 = await Practice.aggregate([
        {
          $match: {
            name: name,
          },
        },
        {
          $project: {
            questions: {
              $filter: {
                input: "$questions",
                as: "item",
                cond: {
                  $gt: [{ $size: "$$item.flag" }, 0],
                },
              },
            },
          },
        },
      ]);
    }

    if (findedQuestion1.length > 0) {
      findedQuestion = [...findedQuestion1[0].questions];
    }
    if (findedQuestion2.length > 0) {
      findedQuestion = [...findedQuestion, ...findedQuestion2[0].questions];
    }

    if (findedQuestion.length == 0) {
      return res.status(400).json({
        error: true,
        message: `No Questions present in ${name}`,
      });
    }

    let paginatedResults = pagination(page, limit, findedQuestion);
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
  const { id, type } = req.params;
  try {
    var findedQuestion;
    if (type == "long") {
      findedQuestion = await Practice.find(
        { questions: { $elemMatch: { _id: id } } },
        { "questions.$": 1, _id: 0 }
      );
    } else {
      findedQuestion = await Topic.find(
        { questions: { $elemMatch: { _id: id } } },
        { "questions.$": 1, _id: 0 }
      );
    }

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

const toggleDisabledStatus = async (req, res) => {
  const { id, type } = req.params;
  try {
    let topic, disabled;

    if (type == "long") {
      topic = await Practice.findOne({ "questions._id": id });
      disabled = topic.questions.find((q) => q._id == id).disabled;

      await Practice.updateOne(
        {
          "questions._id": id,
        },
        {
          $set: {
            "questions.$.disabled": !disabled,
          },
        }
      );
    } else {
      topic = await Topic.findOne({ "questions._id": id });
      disabled = topic.questions.find((q) => q._id == id).disabled;
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
    }

    res.status(200).json({
      error: false,
      message: "successful",
      data: { disabled: !disabled },
    });
  } catch (err) {
    res.status(400).json({ error: true, message: `${err}` });
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
  toggleDisabledStatus,
};
