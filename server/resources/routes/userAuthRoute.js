const userAuthRoute = require("express").Router();
const passport = require("passport");
const {
  logoutController,
  isLoggedIn,
  successRedirect,
  getUser,
  loginUser,
  loginFailure,
  zohoCrmLogout,
} = require("../controller/authController");

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

module.exports = { userAuthRoute };
