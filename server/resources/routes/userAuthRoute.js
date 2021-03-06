const userAuthRoute = require("express").Router();
const passport = require("passport");
const {
  logoutController,
  isLoggedIn,
  successRedirect,
  getUser,
  loginUser,
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

// Android will do authentication internally, 
// Android will send the info sent by google to backend will be stored and token will be sent as response
userAuthRoute.post("/login_user", loginUser)

module.exports = userAuthRoute;
