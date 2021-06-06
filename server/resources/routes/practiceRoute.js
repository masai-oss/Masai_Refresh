const express = require("express")
const { authenticateToken } = require("../controller/authController")
const {
  createPracticeAttempt,
  getQuestion,
  bookmarking,
  liking,
  getAllTopics,
} = require("../controller/practiceController")
const practiceRoute = express.Router()

practiceRoute.get("/topics", authenticateToken, getAllTopics)
practiceRoute.post("/create", authenticateToken, createPracticeAttempt)
practiceRoute.get("/question", authenticateToken, getQuestion)
practiceRoute.post("/question_bookmark", authenticateToken, bookmarking)
practiceRoute.post("/question_like", authenticateToken, liking)

module.exports = practiceRoute
