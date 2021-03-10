const attemptRoute = require("express").Router();
const {
    createAttempt,
    nextAttempt
} = require("../controller/attemptController");
const { authenticateToken } = require("../controller/authController");

attemptRoute.post('/create', authenticateToken, createAttempt);
attemptRoute.post('/next', authenticateToken, nextAttempt);

module.exports = attemptRoute;
