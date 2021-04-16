const attemptRoute = require("express").Router();
const { authenticateToken } = require("../controller/authController");
const { getResult } = require("../controller/resultController");

attemptRoute.get("/result/:attempt_id", authenticateToken, getResults);
module.exports = { attemptRoute };