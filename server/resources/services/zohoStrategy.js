const ZohoCRMStrategy = require("passport-zoho-crm").Strategy
const dotenv = require("dotenv")
const User = require("../models/User")

dotenv.config()

const ZOHO_CLIENT_ID = process.env.ZOHO_CLIENT_ID
const ZOHO_CLIENT_SECRET = process.env.ZOHO_CLIENT_SECRET
const ZOHO_CALLBACK_URL = process.env.ZOHO_CALLBACK_URL
const ZOHO_SCOPE = process.env.ZOHO_SCOPE
const ZOHO_RESPONSE_TYPE = process.env.ZOHO_RESPONSE_TYPE
const ZOHO_ACCESS_TYPE = process.env.ZOHO_ACCESS_TYPE
const ADMIN_CONTROL_EMAIL = process.env.ADMIN_CONTROL_EMAIL

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
    // limiting only for masai.school domain
    let email = profile._json.Email
    let domain = email.trim().split("@")[1].trim()
    // as android doesn't have zoho auth the domain limitation is still pending and hasn't been finalised (so true has been added)
    if (domain === "masai.school" || true) {
      try {
        const {
          id,
          displayName,
          provider,
          _json: { Email },
        } = profile
        const crnAuth = "zoho-crm"
        const oauth = { provider: provider, identifier: id }
        const userPresentWithGmail = await User.findOne({
          email: Email,
        })
        if (!userPresentWithGmail) {
          const currentUser = await User.findOne({
            oauth: { $elemMatch: oauth },
          })
          const role =
            Email.split("@")[1] === ADMIN_CONTROL_EMAIL ? "admin" : "user"
          if (!currentUser) {
            const newUser = await new User({
              name: displayName,
              email: Email,
              role: role,
              oauth: [oauth],
            }).save()
            if (newUser) {
              newUser._doc.crnAuth = crnAuth
              return done(null, newUser)
            }
          }
          currentUser._doc.crnAuth = crnAuth
          return done(null, currentUser)
        } else if (
          userPresentWithGmail.oauth.length === 2 ||
          userPresentWithGmail.oauth[0].provider === provider
        ) {
          userPresentWithGmail._doc.crnAuth = crnAuth
          return done(null, userPresentWithGmail)
        } else {
          const modifiedUser = await User.findOneAndUpdate(
            { email: Email },
            { $push: { oauth: oauth } },
            { returnOriginal: false }
          )
          modifiedUser._doc.crnAuth = crnAuth
          return done(null, modifiedUser)
        }
      } catch (err) {
        done(new Error(`Failed ${err}`))
      }
    } else {
      done(null, false, { message: "Not allow access!" })
    }
  }
)

module.exports = zohoCrmStrategy
