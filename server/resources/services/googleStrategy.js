const GoogleStrategy = require("passport-google-oauth20").Strategy
const dotenv = require("dotenv")
const User = require("../models/User")

dotenv.config()

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET
const CALLBACK_URL = process.env.CALLBACK_URL
const ADMIN_CONTROL_EMAIL = process.env.ADMIN_CONTROL_EMAIL

const googleStrategy = new GoogleStrategy(
  {
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: CALLBACK_URL,
    proxy: true,
  },
  async (accessToken, refreshToken, profile, done) => {
    // limiting only for masaischool.com domain
    let email = profile._json.email
    let domain = email.trim().split("@")[1].trim()
    // as android doesn't have zoho auth the domain limitation is still pending and hasn't been finalised (so true has been added)
    if (domain === "masaischool.com" || true) {
      try {
        const { id, displayName, emails, photos } = profile
        const crnAuth = "google"
        const oauth = { provider: crnAuth, identifier: id }
        const userPresentWithGmail = await User.findOne({
          email: emails[0].value,
        })
        if (!userPresentWithGmail) {
          const role =
            emails[0].value.split("@")[1] === ADMIN_CONTROL_EMAIL
              ? "admin"
              : "user"
          const currentUser = await User.findOne({
            oauth: { $elemMatch: { provider: crnAuth, identifier: id } },
          })
          if (!currentUser) {
            const newUser = await new User({
              name: displayName,
              email: emails[0].value,
              role: role,
              verified: true,
              profilePic: photos[0].value,
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
          userPresentWithGmail.oauth[0].provider === crnAuth
        ) {
          userPresentWithGmail._doc.crnAuth = crnAuth
          return done(null, userPresentWithGmail)
        } else {
          const modifiedUser = await User.findOneAndUpdate(
            { email: emails[0].value },
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

module.exports = googleStrategy
