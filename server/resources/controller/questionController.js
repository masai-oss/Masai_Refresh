const Topic = require("../models/Topic");
const Practice = require("../models/Practice");

const {
  questionAddValidate,
  idTopicValidation,
  topicValidation,
  statsValidate,
  toggleVerificationValidation,
} = require("../utils/validation/questionValidation");

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
  const type = req.query.type;

  let collection = type === undefined ? "Topic" : "Practice";
  try {
    if (page < 1) {
      return res.status(400).json({
        error: true,
        message: "The Page No must be greater than 0",
      });
    }

    let questions;
    if (disabledFilter != "true" && reportedFilter != "true") {
      questions = await eval(collection).aggregate([
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
      questions = await eval(collection).aggregate([
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
      questions = await eval(collection).aggregate([
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

      if (questions[0].allQuestions.length > 0) {
        questions[0].allQuestions = questions[0].allQuestions.map(
          (topicQue) => {
            if (topicQue?.length > 0) {
              topicQue = topicQue?.filter((item) => {
                return item?.flag?.some((flag) => flag.status.solved === false);
              });
            }
            return topicQue;
          }
        );
      }
    }

    let allQuestions = [];
    if (questions[0].allQuestions.length > 0) {
      questions[0].allQuestions.forEach((topicQue) => {
        if (topicQue.length !== undefined) {
          allQuestions.push(...topicQue);
        }
      });
    }

    if (allQuestions.length == 0) {
      return res.status(200).json({
        error: false,
        message: "Successfully got Questions",
        questions: {
          current: [],
        },
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
  const type = req.query.type;
  const { topic: name } = req.params;
  const { error } = topicValidation(req.params);
  if (error) {
    return res.status(400).json({
      error: true,
      message: "Getting question failed",
      reason: error.details[0].message,
    });
  }

  let collection = type === undefined ? "Topic" : "Practice";
  try {
    if (page < 1) {
      return res.status(400).json({
        error: true,
        message: "The Page No must be greater than 0",
      });
    }

    let questions;
    if (disabledFilter != "true" && reportedFilter != "true") {
      questions = await eval(collection).find(
        {
          name: name,
        },
        { icon: 0, name: 0 }
      );
    } else if (disabledFilter == "true") {
      questions = await eval(collection).aggregate([
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
      questions = await eval(collection).aggregate([
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

      if (questions[0].questions.length > 0) {
        questions[0].questions = questions[0].questions.filter((item) => {
          return item?.flag?.some((flag) => flag.status.solved === false);
        });
      }
    }

    let allQuestions = [];
    if (questions.length > 0) {
      allQuestions = [...questions[0].questions];
    }

    if (allQuestions.length == 0) {
      return res.status(200).json({
        error: false,
        message: "Successfully got Questions",
        questions: {
          current: [],
        },
      });
    }

    let paginatedResults = pagination(page, limit, allQuestions);
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
  const type = req.query.type;

  let collection = type === undefined ? "Topic" : "Practice";
  try {
    let findedQuestion = await eval(collection).find(
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

const addQuestion = async (req, res) => {
  const { topic: name } = req.params;
  const question = req.body;
  const type = req.query.type;
  const { error } = questionAddValidate({ ...question, name, source: "N/A" });
  if (error) {
    return res.status(400).json({
      error: true,
      message: "Adding question failed",
      reason: error.details[0].message,
    });
  }

  let collection = type === undefined ? "Topic" : "Practice";
  try {
    let findTopic = await eval(collection).find({ name: name }, { name: 1 });
    if (!findTopic.length) {
      return res
        .status(400)
        .json({ error: true, message: "Add topic before adding question" });
    }
    await eval(collection).updateOne(
      { name: name },
      {
        $push: {
          questions: { ...question, source: "N/A" },
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

const updateQuestion = async (req, res) => {
  const { topic: name, id: _id } = req.params;
  const questionData = req.body;
  const type = req.query.type;

  const { stats, flag, verified, disabled, ...question } = questionData;
  if (!type) {
    const { error: statsError } = statsValidate(stats);
    if (statsError) {
      return res.status(400).json({
        error: true,
        message: "Updating question failed check Stats",
        reason: statsError.details[0].message,
      });
    }
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

  let collection = type === undefined ? "Topic" : "Practice";
  try {
    let updatedQuestion = await eval(collection).updateOne(
      {
        name: name,
        "questions._id": _id,
      },
      {
        $set: {
          "questions.$": { ...questionData, _id: _id },
        },
      }
    );

    if (updatedQuestion.n === 0 || updateQuestion.nModified === 0) {
      return res.status(400).json({
        error: true,
        message: `${name} question unable to update`,
      });
    }
    return res.status(200).json({
      error: false,
      message: `${name} question updated successfully`,
      question: {
        topic: name,
        _id: _id,
        ...questionData,
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

// ---------------- delete not in use (deleting practice questions not included) --------------------
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

const toggleVerification = async (req, res) => {
  const { id } = req.params;
  const type = req.query.type;

  let collection = type === undefined ? "Topic" : "Practice";
  try {
    let topic = await eval(collection).findOne(
      { "questions._id": id },
      { "questions.$": 1 }
    );
    let verified = topic.questions[0].verified;
    await eval(collection).updateOne(
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
      error: false,
      message: "successful",
      data: { verified: !verified },
    });
  } catch (err) {
    res.status(400).json({ error: true, message: `${err}` });
  }
};

const toggleDisabledStatus = async (req, res) => {
  const { id } = req.params;
  const type = req.query.type;

  let collection = type === undefined ? "Topic" : "Practice";
  try {
    let topic = await eval(collection).findOne(
      { "questions._id": id },
      { "questions.$": 1 }
    );
    let disabled = topic.questions[0].disabled;
    await eval(collection).updateOne(
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
