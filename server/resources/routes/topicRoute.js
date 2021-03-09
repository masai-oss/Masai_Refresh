const topicRoute = require("express").Router();
const {
  getAllTopics,
  getTopicById,
  getTopicByName,
  addTopic,
  deleteTopic,
  editTopic,
  replaceTopic,
} = require("../controller/topicController");

topicRoute.get("/", getAllTopics);
topicRoute.get("/id/:id", getTopicById);
topicRoute.get("/name/:name", getTopicByName);
topicRoute.post("/create", addTopic);
topicRoute.delete("/:id", deleteTopic);
topicRoute.patch("/:id", editTopic);
topicRoute.put("/:id", replaceTopic);

module.exports = topicRoute;
