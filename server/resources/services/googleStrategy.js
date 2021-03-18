const GoogleStrategy = require("passport-google-oauth20").Strategy;
const dotenv = require("dotenv");
const User = require("../models/User");

dotenv.config();

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const CALLBACK_URL = process.env.CALLBACK_URL;
const ADMIN_CONTROL_EMAIL = process.env.ADMIN_CONTROL_EMAIL;

const googleStrategy = new GoogleStrategy(
  {
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: CALLBACK_URL,
    proxy: true,
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      const { id, displayName, emails, photos } = profile;
      let role =
        emails[0].value.split("@")[1] === ADMIN_CONTROL_EMAIL
          ? "admin"
          : "user";
      const currentUser = await User.findOne({
        oauth: { $elemMatch: { provider: "google", identifier: id } },
      });
      if (!currentUser) {
        const newUser = await new User({
          name: displayName,
          email: emails[0].value,
          role: role,
          profilePic: photos[0].value,
          oauth: [
            {
              provider: "google",
              identifier: id,
            },
          ],
        }).save();
        if (newUser) {
          return done(null, newUser);
        }
      }
      done(null, currentUser);
    } catch (err) {
      done(new Error(`Failed ${err}`));
    }
  }
);

module.exports = googleStrategy;
