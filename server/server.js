const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const passport = require("passport");
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");
const cookieParser = require("cookie-parser");
require("./resources/services/passportSetup");

const userAuthRoute = require("./resources/routes/userAuthRoute");
const topicRoute = require("./resources/routes/topicRoute");
const questionRoute = require("./resources/routes/questionRoute");
const attemptRoute = require("./resources/routes/attemptRoute");
const submissionRoute = require("./resources/routes/submissionRoute");

dotenv.config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = process.env.PORT || 5050;
const MONGO_URI = process.env.MONGO_URI;
const COOKIE_KEY = process.env.COOKIE_KEY;
const CLIENT_HOME_PAGE_URL = process.env.CLIENT_HOME_PAGE_URL;

mongoose.connect(
  MONGO_URI,
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  },
  (err) => {
    if (err) {
      console.log(`Error : ${err}`);
    } else {
      console.log("The Database is connected");
    }
  }
);

app.use(
  cookieSession({
    name: "quizine",
    keys: [COOKIE_KEY],
    maxAge: 30 * 24 * 60 * 10 * 1000, //30 days
  })
);

app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

app.use(
  cors({
    origin: CLIENT_HOME_PAGE_URL,
    methods: ["GET,HEAD,PUT,PATCH,POST,DELETE"], 
    credentials: true,
  })
);


app.use("/api/auth", userAuthRoute);
app.use("/api/topic", topicRoute);
app.use("/api/question", questionRoute)
app.use("/api/attempt", attemptRoute)
app.use("/api/submission", submissionRoute)

app.listen(PORT, () => {
  console.log(`server is listening at ${PORT}`);
});
