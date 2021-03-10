const attemptRoute = require("express").Router();
const {
    createAttempt,
    startAttempt
} = require("../controller/attemptController");
const { authenticateToken } = require("../controller/authController");

attemptRoute.post('/create', authenticateToken, createAttempt);
attemptRoute.post('/start', authenticateToken, startAttempt);

module.exports = attemptRoute;
