const questionRoute = require("express").Router();
const { authenticateToken } = require("../controller/authController");

const { checkAdmin } = require("../utils/validation/adminValidation");

module.exports = questionRoute;
