const { Question } = require("../models/Question");
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
  try {
    let findReport = await Question.find(
      {
        _id: _id,
        flag: { $elemMatch: { user_id } },
      },
      { "flag.$": 1, _id: 0 }
    );
    if (findReport.length) {
      return res.status(400).json({
        error: true,
        message: "You already reported the question",
      });
    }
    let addReport = await Question.updateOne(
      { _id },
      { $push: { flag: { ...req.body, user_id } } }
    );
    const { n: finded, nModified: modified } = addReport;
    if (finded > 0 && modified > 0) {
      return res.status(200).json({
        error: false,
        message: "Question reported successfully",
      });
    } else {
      return res.status(400).json({
        error: true,
        message: "Question not present",
      });
    }
  } catch (err) {
    return res.status(400).json({
      error: true,
      message: `${err}`,
    });
  }
};

const getAllReport = async (req, res) => {
  try {
    let allReports = await Question.aggregate([
      {
        $match: {
          flag: { $gt: [{ $size: "$flag" }, 0] },
        },
      },
      {
        $project: {
          reports: "$flag",
          _id: 0,
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
    return res.status(200).json({
      error: false,
      data: allReports,
    });
  } catch (err) {
    return res.status(400).json({
      error: true,
      message: `${err}`,
    });
  }
};

const getReportedQuestion = async (req, res) => {
  const { id } = req.params;
  try {
    let findedQuestion = await Question.find(
      { flag: { $elemMatch: { _id: id } } },
      {
        flag: 0,
        _id: 0,
      }
    );
    if (!findedQuestion.length) {
      return res.status(400).json({
        error: true,
        message: "Report not present",
      });
    }
    return res.status(200).json({
      error: false,
      question: findedQuestion[0],
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
    // the new status for the report
    let status = {
      solved: true,
      by: user_id,
      description: description,
      time: new Date().toISOString(),
    };
    let reportSolved = await Question.updateOne(
      { flag: { $elemMatch: { _id } } },
      { $set: { "flag.$.status": status } }
    );
    const { n: finded, nModified: modified } = reportSolved;
    if (finded > 0 && modified > 0) {
      return res.status(200).json({
        error: false,
        message: "Report solved successfully",
      });
    } else {
      return res.status(400).json({
        error: true,
        message: "Report not present",
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
  getAllReport,
  getReportedQuestion,
  solveReport,
};
