const questionRoute = require("express").Router();
const { authenticateToken } = require("../controller/authController");
const { checkAdmin } = require("../utils/validation/adminValidation");
const {
  createQuestion,
  getQuestionById,
  getQuestionsByTopic,
  getAllQuestions,
  updateQuestion,
  deleteQuestion,
  verifyQuestion,
} = require("../controller/questionController");

const {
  reportQuestion,
  getAllReport,
  getReportedQuestion,
  solveReport,
} = require("../controller/reportController");

const { paginatedResults } = require("../utils/pagination/pagination");
const { Question } = require("../models/Question");

// Create a new question
questionRoute.post("/create/:topic", createQuestion);

// Get question by ID
questionRoute.get("/byId/:id", getQuestionById);

// Get Question by Topic
questionRoute.get("/byTopic/:topic", getQuestionsByTopic);

// Get All Questions
questionRoute.get("/all", paginatedResults(Question, "stats"), getAllQuestions);

// Update question by ID
questionRoute.put("/update/:topic/:id", updateQuestion);

// Delete question by ID
questionRoute.delete("/delete/:topic/:id", deleteQuestion);

// Verify question by ID
questionRoute.patch("/verify_toggle/:id", verifyQuestion);

// Report question by ID
questionRoute.patch("/report/:id", reportQuestion);

// Get all reports
questionRoute.get("/report", getAllReport);

// Get reported question by ID
questionRoute.get("/reportedQuestion/:id", getReportedQuestion);

// Solve the report raised by user
questionRoute.patch("/solveReport/:id", solveReport);

module.exports = { questionRoute };
