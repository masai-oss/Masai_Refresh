const { dumpData } = require("./dumpData.js");
const jsData = require("./data/javascript/index.js");

const filter = { _id: process.env.jsId };
const update = { questions: jsData };

dumpData(filter, update);
