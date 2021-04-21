const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const passport = require("passport");
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const MemoryStore = require("memorystore")(session);
const fs = require("fs")
require("./resources/services/passportSetup");

const userAuthRoute = require("./resources/routes/userAuthRoute");
const topicRoute = require("./resources/routes/topicRoute");
const questionRoute = require("./resources/routes/questionRoute");
const attemptRoute = require("./resources/routes/attemptRoute");
const scraperRoute = require('./resources/routes/scraperRoute')

dotenv.config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = process.env.PORT || 5050;
const MONGO_URI = process.env.MONGO_URI;
const COOKIE_KEY = process.env.COOKIE_KEY;
const CLIENT_HOME_PAGE_URL = process.env.CLIENT_HOME_PAGE_URL;
const ENVIRONMENT = process.env.NODE_ENV;


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

app.set("trust proxy", 1);

app.use(
  session({
    name: "quizine",
    secret: COOKIE_KEY,
    resave: true,
    saveUninitialized: false,
    ttl: 30 * 24 * 60 * 10 * 1000, //30 days
    cookie: {
      sameSite: ENVIRONMENT === "production" ? "none" : "lax", // must be 'none' to enable cross-site delivery
      secure: ENVIRONMENT === "production", // must be true if sameSite='none'
      maxAge: 30 * 24 * 60 * 10 * 1000, //30 days
    },
    store: new MemoryStore({
      checkPeriod: 30 * 24 * 60 * 10 * 1000, // prune expired entries every 30 days
    }),
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(
  cors({
    origin: CLIENT_HOME_PAGE_URL,
    methods: ["GET,HEAD,PUT,PATCH,POST,DELETE"],
    credentials: true,
  })
);
const uploadDir = "./uploads"
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}
app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use("/api/auth", userAuthRoute);
app.use("/api/topic", topicRoute);
app.use("/api/question", questionRoute);
app.use("/api/attempt", attemptRoute);
app.use("/api/scraper", scraperRoute);

app.listen(PORT, () => {
  console.log(`server is listening at ${PORT}`);
});
