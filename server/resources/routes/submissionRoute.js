const submissionRoute = require("express").Router();
const {
  createSubmission,
  getResults,
} = require("../controller/submissionController");
const { authenticateToken } = require("../controller/authController")

submissionRoute.get("/create/:topic_id", createSubmission);
submissionRoute.get("/result/:quizId", authenticateToken, getResults);

module.exports = submissionRoute;
