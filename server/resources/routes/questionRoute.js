const questionRoute = require("express").Router();
const { authenticateToken } = require("../controller/authController");
const {
  addQuestion,
  getQuestionById,
  getQuestionByTopic,
  updateQuestion,
  getAllQuestion,
  deleteQuestion,
} = require("../controller/questionController");
const { checkAdmin } = require("../utils/validation/adminValidation");


questionRoute.post("/addQuestion/:topic", authenticateToken, checkAdmin, addQuestion);
questionRoute.get("/getQuestionById/:topic/:id", authenticateToken, checkAdmin, getQuestionById);
questionRoute.get("/getAllQuestionByTopic/:topic",authenticateToken, checkAdmin, getQuestionByTopic);
questionRoute.get("/getAllQuestions",authenticateToken, checkAdmin, getAllQuestion)
questionRoute.put("/updateQuestion/:topic/:id",authenticateToken, checkAdmin, updateQuestion);
questionRoute.delete("/deleteQuestion/:topic/:id",authenticateToken, checkAdmin, deleteQuestion)

module.exports = questionRoute;
