const { createNewTopicDocument } = require("./dumpData.js");
const sqlData = require("./data/sql/index.js");

createNewTopicDocument("SQL", sqlData);
