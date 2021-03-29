const dumpData = require("./dumpData.js");
const htmlData = require("./data/html/index.js");

const filter = { _id: process.env.htmlId };
const update = { questions: htmlData };

dumpData(filter, update);
