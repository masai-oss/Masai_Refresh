const rateLimit = require("express-rate-limit")

const signupAndSigninRouteLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 10,
  message: {
    error: true,
    message: "Too many attempts. Please after sometime.",
  },
})

const passwordAndOtpRouteLimiter = rateLimit({
  // 5mins
  windowMs: 5 * 60 * 1000,
  max: 6,
  message: {
    error: true,
    message: "Too many attempts. Please after sometime.",
  },
})

module.exports = {
  signupAndSigninRouteLimiter,
  passwordAndOtpRouteLimiter,
}
