const statsRoute = require("express").Router();
const { getResultsTopicwise } = require("../controller/resultController");
const { authenticateToken } = require("../controller/authController");

statsRoute.get("/topic_attempts_stats/:topic_id", authenticateToken, getResultsTopicwise)

module.exports = statsRoute