const Topics = require("../models/Topic");
const {
  reportQuestionValidation,
  solveReportValidation,
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
    }).then(async ([{ questions }]) => {
      try {
        let [{ flag }] = questions;
        if (!flag.length) {
          return await Topics.updateOne(filterQuery, pushQuery);
        }
        crnQueFlag = flag;
        return "Continue operation";
      } catch (err) {
        return res.status(400).json({
          error: true,
          message: `${err}`,
        });
      }
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
    let addReport = await Topics.updateOne(filterQuery, pushQuery);
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

const getAllReports = async (req, res) => {
  try {
    let allReport = await Topics.aggregate([
      {
        $match: {
          "questions.flag": { $gt: [{ $size: "$questions.flag" }, 0] },
        },
      },
      {
        $addFields: {
          "questions.flag.name": "$name",
        },
      },
      {
        $project: {
          reports: "$questions.flag",
          _id: 0,
        },
      },
      {
        $unwind: {
          path: "$reports",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $match: {
          reports: { $gt: [{ $size: "$reports" }, 0] },
        },
      },
      {
        $unwind: {
          path: "$reports",
          preserveNullAndEmptyArrays: true,
        },
      },
      { $replaceRoot: { newRoot: "$reports" } },
      { $sort: { time: -1 } },
    ]);
    if (!allReport.length) {
      return res.status(200).json({
        error: false,
        message: "There are no reports",
      });
    }
    return res.status(200).json({
      error: false,
      data: allReport,
    });
  } catch (err) {
    return res.status(400).json({
      error: true,
      message: `${err}`,
    });
  }
};

const getQuestionReportedById = async (req, res) => {
  const { id } = req.params;
  try {
    let findedQuestion = await Topics.find(
      { "questions.flag": { $elemMatch: { _id: id } } },
      {
        "questions.$": 1,
        _id: 0,
      }
    );
    if (!findedQuestion.length) {
      return res.status(400).json({
        error: true,
        message: "Report not present",
      });
    }
    const [{ questions }] = findedQuestion;
    return res.status(200).json({
      error: false,
      question: questions[0],
    });
  } catch (err) {
    return res.status(400).json({
      error: true,
      reason: `${err}`,
    });
  }
};

const solveReport = async (req, res) => {
  const { id: user_id } = req;
  const { error } = solveReportValidation(req.body);
  if (error) {
    return res.status(400).json({
      error: true,
      message: error.details[0].message,
    });
  }
  const { id: _id } = req.params;
  const { description } = req.body;
  try {
    let status = {
      solved: true,
      by: user_id,
      description: description,
      time: new Date().toISOString(),
    };
    let filterQuery = { "questions.flag": { $elemMatch: { _id: _id } } };
    let reportQue = await Topics.find(filterQuery, {
      "questions.$": 1,
      _id: 0,
    }).then(async ([{ questions }]) => {
      try {
        let [{ flag }] = questions;
        let index = flag.findIndex((indiv) => indiv._id == _id);
        let indivFlag = `questions.$.flag.${index}.status`;
        let updateQuery = { $set: { [indivFlag]: status } };
        return await Topics.updateOne(filterQuery, updateQuery);
      } catch (err) {
        return res.status(400).json({
          error: true,
          reason: `${err}`,
        });
      }
    });
    const { n: finded, nModified: modified } = reportQue;
    if (finded > 0 && modified > 0) {
      return res.status(200).json({
        error: false,
        message: "Report solved successfully"
      });
    }
  } catch (err) {
    return res.status(400).json({
      error: true,
      reason: `${err}`,
    });
  }
};

module.exports = {
  reportQuestion,
  getAllReports,
  getQuestionReportedById,
  solveReport,
};
