const mongoose = require("mongoose");
require("dotenv").config();

const htmlData = require("./html/index.js");

const Topic = require("../resources/models/Topic.js");

const htmlId = "6047279073ec24bb3b12ebfe";

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));

async function dumpData(filter, update) {
  try {
    const doc = await Topic.findOneAndUpdate(filter, update, {
      returnOriginal: false,
    });
  } catch (err) {
    console.log(`Error ${err}`);
  }
}

dumpData({ _id: htmlId }, { questions: htmlData });
