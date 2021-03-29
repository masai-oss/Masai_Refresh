const ZohoCRMStrategy = require("passport-zoho-crm").Strategy;
const dotenv = require("dotenv");
const User = require("../models/User");

dotenv.config();

const ZOHO_CLIENT_ID = process.env.ZOHO_CLIENT_ID;
const ZOHO_CLIENT_SECRET = process.env.ZOHO_CLIENT_SECRET;
const ZOHO_CALLBACK_URL = process.env.ZOHO_CALLBACK_URL;
const ZOHO_SCOPE = process.env.ZOHO_SCOPE;
const ZOHO_RESPONSE_TYPE = process.env.ZOHO_RESPONSE_TYPE;
const ZOHO_ACCESS_TYPE = process.env.ZOHO_ACCESS_TYPE;
const ADMIN_CONTROL_EMAIL = process.env.ADMIN_CONTROL_EMAIL;

const zohoCrmStrategy = new ZohoCRMStrategy(
  {
    clientID: ZOHO_CLIENT_ID,
    clientSecret: ZOHO_CLIENT_SECRET,
    callbackURL: ZOHO_CALLBACK_URL,
    scope: ZOHO_SCOPE,
    response_type: ZOHO_RESPONSE_TYPE,
    access_type: ZOHO_ACCESS_TYPE,
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      const {
        id,
        displayName,
        provider,
        _json: { Email },
      } = profile;
      const oauth = { provider: provider, identifier: id };
      const userPresentWithGmail = await User.findOne({
        email: Email,
      });
      if (!userPresentWithGmail) {
        const currentUser = await User.findOne({
          oauth: { $elemMatch: oauth },
        });
        const role =
          Email.split("@")[1] === ADMIN_CONTROL_EMAIL ? "admin" : "user";
        if (!currentUser) {
          const newUser = await new User({
            name: displayName,
            email: Email,
            role: role,
            oauth: [oauth],
          }).save();
          if (newUser) {
            return done(null, newUser);
          }
        }
        return done(null, currentUser);
      } else if (
        userPresentWithGmail.oauth.length === 2 ||
        userPresentWithGmail.oauth[0].provider === provider
      ) {
        return done(null, userPresentWithGmail);
      } else {
        const modifiedUser = await User.findOneAndUpdate(
          { email: Email },
          { $push: { oauth: oauth } },
          { returnOriginal: false }
        );
        return done(null, modifiedUser);
      }
    } catch (err) {
      done(new Error(`Failed ${err}`));
    }
  }
);

module.exports = zohoCrmStrategy;
