const passport = require("passport");
const User = require("../models/User");
const googleStratergy = require("./googleStrategy");
const zohoCrmStrategy = require("./zohoStrategy");

// done is a callback
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  const { _id: id, crnAuth } = user;
  User.findById(id, { __v: 0, oauth: 0 })
    .then((user) => {
      user._doc.crnAuth = crnAuth
      done(null, user);
    })
    .catch((err) => {
      done(new Error(`Failed to deserialize an user ${err}`));
    });
});

passport.use("google", googleStratergy);
passport.use("zoho-crm", zohoCrmStrategy);