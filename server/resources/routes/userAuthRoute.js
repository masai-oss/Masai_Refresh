const userAuthRoute = require("express").Router();
const passport = require("passport");
const {
  signupUser,
  signinUser,
  verifyUser,
  resendEmailVerficationOTP,
  sendPasswordResetOTP,
  passwordReset,
  passwordResetOTPVerification,
} = require("../controller/ownAuthController");
const {
  logoutController,
  isLoggedIn,
  successRedirect,
  getUser,
  loginUser,
  loginFailure,
  zohoCrmLogout,
} = require("../controller/thirdPartyAuthController");
const {
  passwordAndOtpRouteLimiter,
  signupAndSigninRouteLimiter,
} = require("../middlewares/rateLimiter");

const CLIENT_LOGIN_PAGE = process.env.CLIENT_LOGIN_PAGE;

userAuthRoute.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

userAuthRoute.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: CLIENT_LOGIN_PAGE }),
  successRedirect
);

userAuthRoute.get("/zohocrm", passport.authenticate("zoho-crm"));

userAuthRoute.get(
  "/zohocrm/callback",
  passport.authenticate("zoho-crm", { failureRedirect: CLIENT_LOGIN_PAGE }),
  successRedirect
);

userAuthRoute.get("/current_user", isLoggedIn, getUser);
userAuthRoute.get("/login/failed", loginFailure);
userAuthRoute.get("/logout", logoutController);
userAuthRoute.get("/zoho-crm-logout", zohoCrmLogout);

// Android will send the info sent by google to backend will be verified, stored and token will be sent as response
userAuthRoute.post("/login_user", loginUser);

//----------------------------- App auth -----------------------------
userAuthRoute.post("/signup", signupAndSigninRouteLimiter, signupUser);
userAuthRoute.post("/verify_user", passwordAndOtpRouteLimiter, verifyUser);
userAuthRoute.post("/signin", signupAndSigninRouteLimiter, signinUser);
userAuthRoute.post(
  "/email_verification/resend_otp",
  passwordAndOtpRouteLimiter,
  resendEmailVerficationOTP
);
userAuthRoute.post(
  "/password_resst/send_otp",
  passwordAndOtpRouteLimiter,
  sendPasswordResetOTP
);

userAuthRoute.post(
  "/password_reset/verify_otp",
  passwordAndOtpRouteLimiter,
  passwordResetOTPVerification
);

userAuthRoute.post(
  "/password_reset",
  passwordAndOtpRouteLimiter,
  passwordReset
);

module.exports = userAuthRoute;
