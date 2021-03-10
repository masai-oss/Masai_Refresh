const topicRoute = require("express").Router();
const {
    getAllTopics,
    getTopicById,
    getTopicByName,
    addTopic,
    deleteTopic,
    editTopic,
    replaceTopic,
    getTopicsSummary
} = require("../controller/topicController");
const { authenticateToken } = require("../controller/authController");
const { checkAdmin } = require("../utils/validation/adminValidation");


topicRoute.get('/', authenticateToken, checkAdmin, getAllTopics);
topicRoute.get("/id/:id", authenticateToken, checkAdmin, getTopicById);
topicRoute.get("/name/:name", authenticateToken, checkAdmin, getTopicByName);
topicRoute.get("/summary", authenticateToken, getTopicsSummary);
topicRoute.post("/create", authenticateToken, checkAdmin, addTopic);
topicRoute.delete("/:id", authenticateToken, checkAdmin, deleteTopic);
topicRoute.patch("/:id", authenticateToken, checkAdmin, editTopic);
topicRoute.put("/:id", authenticateToken, checkAdmin, replaceTopic);

module.exports = topicRoute;
