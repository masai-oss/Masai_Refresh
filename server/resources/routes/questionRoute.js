const questionRoute = require("express").Router();
const { authenticateToken } = require("../middlewares/authentication");
const {
  addQuestion,
  getQuestionById,
  getQuestionByTopic,
  updateQuestion,
  getAllQuestion,
  deleteQuestion,
  toggleVerification,
  toggleDisabledStatus,
} = require("../controller/questionController");
const {
  reportQuestion,
  getAllReports,
  getQuestionReportedById,
  solveReport,
} = require("../controller/reportController");

const { checkAdmin } = require("../utils/validation/adminValidation");

// Add a question
questionRoute.post(
  "/create/:topic",
  authenticateToken,
  checkAdmin,
  addQuestion
);

// Get All Questions
questionRoute.get("/all", authenticateToken, checkAdmin, getAllQuestion);

// Get Question by Topic
questionRoute.get(
  "/byTopic/:topic",
  authenticateToken,
  checkAdmin,
  getQuestionByTopic
);

// Get question by ID
questionRoute.get("/byId/:id", authenticateToken, checkAdmin, getQuestionById);

// Update question by ID
questionRoute.put(
  "/update/:topic/:id",
  authenticateToken,
  checkAdmin,
  updateQuestion
);

// Delete question by ID
questionRoute.delete(
  "/delete/:topic/:id",
  authenticateToken,
  checkAdmin,
  deleteQuestion
);

// Verify question by ID
questionRoute.patch(
  "/toggleVerify/:id",
  authenticateToken,
  checkAdmin,
  toggleVerification
);

// Report question by ID
questionRoute.patch("/report/:id", authenticateToken, reportQuestion);

// Get all reports
questionRoute.get("/report", authenticateToken, checkAdmin, getAllReports);

// Get reported question by ID
questionRoute.get(
  "/reportedQuestion/:id",
  authenticateToken,
  checkAdmin,
  getQuestionReportedById
);

// Solve the report raised by user
questionRoute.patch(
  "/solveReport/:question_id/:report_id",
  authenticateToken,
  checkAdmin,
  solveReport
);

//Toggle Disabled status of a question.
questionRoute.patch(
  "/toggleDisable/:id",
  authenticateToken,
  checkAdmin,
  toggleDisabledStatus
);

module.exports = questionRoute;
