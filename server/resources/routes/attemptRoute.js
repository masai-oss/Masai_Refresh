const attemptRoute = require("express").Router();
const {
    createAttempt,
    getAttemptQuestion,
    recordAttempt
} = require("../controller/attemptController");
const {
    getResults,
} = require("../controller/resultController");
const { authenticateToken } = require("../controller/authController");

attemptRoute.post('/create', authenticateToken, createAttempt);
attemptRoute.get('/question', authenticateToken, getAttemptQuestion);
attemptRoute.patch('/record', authenticateToken, recordAttempt);
attemptRoute.get("/result/:attempt_id", authenticateToken, getResults);

module.exports = attemptRoute;
