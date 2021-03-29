const dumpData = require("./dumpData.js");
const cssData = require("./data/css/index.js");

const filter = { _id: process.env.cssId };
const update = { questions: cssData };

dumpData(filter, update);
