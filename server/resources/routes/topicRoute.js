const topicRoute = require("express").Router();
const {
  getAllTopics,
  getTopicById,
  getTopicByName,
  addTopic,
  deleteTopic,
  editTopic,
} = require("../controller/topicController");
const { getTopicsSummary } = require("../controller/proficiencyController");
const { authenticateToken } = require("../controller/authController");
const { checkAdmin } = require("../utils/validation/adminValidation");
const { upload } = require("../helper/uploader")

topicRoute.get("/", authenticateToken, checkAdmin, getAllTopics);
topicRoute.get("/id/:id", authenticateToken, checkAdmin, getTopicById);
topicRoute.get("/name/:name", authenticateToken, checkAdmin, getTopicByName);
topicRoute.get("/summary", authenticateToken, getTopicsSummary);
topicRoute.post(
  "/create",
  authenticateToken,
  checkAdmin,
  upload.single("icon"),
  addTopic
);
topicRoute.delete("/:id", authenticateToken, checkAdmin, deleteTopic);
topicRoute.patch(
  "/:id",
  authenticateToken,
  checkAdmin,
  upload.single("icon"),
  editTopic
);

module.exports = topicRoute;
