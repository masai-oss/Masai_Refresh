const passport = require("passport");
const User = require("../models/User");
const googleStratergy = require("./googleStrategy");

// done is a callback
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  const { _id: id } = user;
  User.findById(id, { __v: 0, oauth:0 })
    .then((user) => {
      done(null, user);
    })
    .catch((err) => {
      done(new Error(`Failed to deserialize an user ${err}`));
    });
});

passport.use("google", googleStratergy);
