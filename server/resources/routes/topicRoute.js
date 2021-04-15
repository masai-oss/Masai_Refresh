const topicRoute = require("express").Router();
const { authenticateToken } = require("../controller/authController");
const { checkAdmin } = require("../utils/validation/adminValidation");
const { upload } = require("../utils/helper/uploader");



module.exports = topicRoute;
