const attemptRoute = require("express").Router();
const {
    createAttempt,
    nextAttempt,
    recordAttempt,
    markQuizComplete
} = require("../controller/attemptController");
const {
    getResults,
} = require("../controller/resultController");
const { authenticateToken } = require("../controller/authController");

attemptRoute.post('/create', authenticateToken, createAttempt);
attemptRoute.post('/next', authenticateToken, nextAttempt);
attemptRoute.patch('/record', authenticateToken, recordAttempt);
attemptRoute.get("/result/:attempt_id", authenticateToken, getResults);
attemptRoute.patch("/quiz_complete/:attempt_id", authenticateToken, markQuizComplete)

module.exports = attemptRoute;
