const attemptRoute = require("express").Router();
const {
    createAttempt
} = require("../controller/attemptController");
const { authenticateToken } = require("../controller/authController");

attemptRoute.post('/create', authenticateToken, createAttempt);

module.exports = attemptRoute;
