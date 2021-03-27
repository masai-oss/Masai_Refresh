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
      const currentUser = await User.findOne({
        oauth: { $elemMatch: { provider: "zoho-crm", identifier: id } },
      });
      if (!currentUser) {
        const newUser = await new User({
          name: displayName,
          email: Email,
          role: "user",
          oauth: [
            {
              provider: provider,
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

module.exports = zohoCrmStrategy;