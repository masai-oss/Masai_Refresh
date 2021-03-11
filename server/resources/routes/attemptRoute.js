const attemptRoute = require("express").Router();
const {
    createAttempt,
    nextAttempt,
    recordAttempt
} = require("../controller/attemptController");
const { authenticateToken } = require("../controller/authController");

attemptRoute.post('/create', authenticateToken, createAttempt);
attemptRoute.post('/next', authenticateToken, nextAttempt);
attemptRoute.patch('/record', authenticateToken, recordAttempt);

module.exports = attemptRoute;
