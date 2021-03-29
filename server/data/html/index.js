let sanfoundry = require("./sanfoundry.json").questions;
let freeTimeLearning = require("./freeTimeLearning.json").questions;

freeTimeLearning = freeTimeLearning.map((question) => ({
  ...question,
  source: "https://www.freetimelearning.com",
}));

module.exports = freeTimeLearning.concat(sanfoundry);
