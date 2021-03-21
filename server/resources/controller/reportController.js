const Topic = require("../models/Topic");
const Topics = require("../models/Topic");
const {
  reportQuestionValidation,
} = require("../utils/validation/reportValidation");

const reportQuestion = async (req, res) => {
  const { error } = reportQuestionValidation(req.body);
  if (error) {
    return res.status(400).json({
      error: true,
      message: error.details[0].message,
    });
  }
  const { id: _id } = req.params;
  const { id: user_id } = req;
  // filters the question
  let filterQuery = {
    questions: { $elemMatch: { _id: _id } },
  };
  // pushes report to the question
  let pushQuery = {
    $push: { "questions.$.flag": { ...req.body, user_id } },
  };
  let crnQueFlag = [];
  try {
    // Find and push report to question if empty
    let reportQue = await Topics.find(filterQuery, {
      "questions.$": 1,
      _id: 0,
    }).then(([{ questions }]) => {
      let [{ flag }] = questions;
      if (!flag.length) {
        return Topic.updateOne(filterQuery, pushQuery);
      }
      crnQueFlag = flag;
      return "Continue operation";
    });
    // final message to user non-error
    const message = {
      error: false,
      message: "Question reported successfully",
    };
    const { n: finded, nModified: modified } = reportQue;
    if (finded > 0 && modified > 0) {
      return res.status(200).json(message);
    }
    let present = crnQueFlag.some(({ user_id: id }) => id == user_id);
    if (present) {
      return res.status(208).json({
        error: true,
        message: "You already reported the question",
      });
    }
    let addReport = await Topic.updateOne(filterQuery, pushQuery);
    const { n, nModified } = addReport;
    if (n > 0 && nModified > 0) {
      return res.status(200).json(message);
    }
  } catch (err) {
    return res.status(400).json({
      error: true,
      message: `${err}`,
    });
  }
};


module.exports = { reportQuestion };
