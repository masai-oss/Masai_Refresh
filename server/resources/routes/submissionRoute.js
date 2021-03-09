const submissionRoute = require("express").Router();
const {
    createSubmission
} = require("../controller/submissionController");

submissionRoute.get('/create/:topic_id', createSubmission);

module.exports = submissionRoute;