const topicRoute = require("express").Router();
const {
  getAllTopics,
  getTopicById,
  getTopicByName,
  addTopic,
  updateIcon,
  deleteTopic,
} = require("../controller/topicController");
const { getTopicsSummary } = require("../controller/proficiencyController");
const { authenticateToken } = require("../controller/authController");
const { checkAdmin } = require("../utils/validation/adminValidation");
const { upload } = require("../utils/helper/uploader");

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
topicRoute.patch(
  "/icon/:id",
  authenticateToken,
  checkAdmin,
  upload.single("icon"),
  updateIcon
);
topicRoute.delete("/:id", authenticateToken, checkAdmin, deleteTopic);

module.exports = topicRoute;
