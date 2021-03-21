const questionRoute = require("express").Router();
const { authenticateToken } = require("../controller/authController");
const {
  addQuestion,
  getQuestionById,
  getQuestionByTopic,
  updateQuestion,
  getAllQuestion,
  deleteQuestion,
  toggleVerification
} = require("../controller/questionController");
const { reportQuestion } = require("../controller/reportController")
const { checkAdmin } = require("../utils/validation/adminValidation");


questionRoute.post("/create/:topic", authenticateToken, checkAdmin, addQuestion);
questionRoute.get("/byId/:id", authenticateToken, checkAdmin, getQuestionById);
questionRoute.get("/byTopic/:topic",authenticateToken, checkAdmin, getQuestionByTopic);
questionRoute.get("/all",authenticateToken, checkAdmin, getAllQuestion)
questionRoute.put("/update/:topic/:id",authenticateToken, checkAdmin, updateQuestion);
questionRoute.delete("/delete/:topic/:id",authenticateToken, checkAdmin, deleteQuestion)
questionRoute.patch("/verify_toggle/:id", authenticateToken, checkAdmin, toggleVerification)
questionRoute.patch("/report/:id", authenticateToken, reportQuestion);

module.exports = questionRoute;
