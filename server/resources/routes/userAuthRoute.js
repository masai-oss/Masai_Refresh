const userAuthRoute = require("express").Router();
const passport = require("passport");
const {
  logoutController,
  isLoggedIn,
  successRedirect,
  getUser,
  loginFailure
} = require("../controller/authController");

userAuthRoute.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

userAuthRoute.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login/failed" }),
  successRedirect
);

userAuthRoute.get("/current_user", isLoggedIn, getUser);
userAuthRoute.get("/login/failed", loginFailure);
userAuthRoute.get("/logout", logoutController);

module.exports = userAuthRoute;
