const jwt = require("jsonwebtoken");
const User = require("../models/User");
const dotenv = require("dotenv");
dotenv.config();

const CLIENT_HOME_PAGE_URL = process.env.CLIENT_HOME_PAGE_URL;
const SECRET_KEY_TO_ACCESS = process.env.SECRET_KEY_TO_ACCESS;
const ADMIN_CONTROL_EMAIL = process.env.ADMIN_CONTROL_EMAIL;

const createToken = (user) => {
  let { email, _id } = user;
  const isAdmin = email.split("@")[1] === ADMIN_CONTROL_EMAIL;
  const tokenInfo = {
    email: email,
    id: _id,
    admin: isAdmin,
  };
  const token = jwt.sign(tokenInfo, SECRET_KEY_TO_ACCESS, {
    expiresIn: "710h",
  });
  return token;
};

const getUser = (req, res) => {
  if (req.user) {
    const token = createToken(req.user);
    res.status(200).set('Cache-Control', 'no-store').json({
      error: false,
      message: "user has been successfully authenticated",
      user: req.user,
      token: token,
    });
  } else {
    res.status(400).json({
      error: false,
      message: "user has not been authenticated",
    });
  }
};

const successRedirect = (req, res) => {
  res.redirect(CLIENT_HOME_PAGE_URL);
};

const loginFailure = (req, res) => {
  res.status(400).json({
    error: true,
    message: "user failed to authenticate.",
  });
};

const logoutController = (req, res) => {
  req.logout();
  req.session = null;
  res.redirect(CLIENT_HOME_PAGE_URL);
};

const isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    res.status(401).json({
      error:true,
      authenticated: false,
      message: "user has not been authenticated",
    });
  } else {
    next();
  }
};

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.status(400).json({
      error: true,
      message: "Authentication token not present",
    });
  }
  jwt.verify(token, SECRET_KEY_TO_ACCESS, async (err, user) => {
    const { email, id } = user;
    if (err) {
      return res.status(403).json({
        error: true,
        message: "token not able to authenticate",
      });
    }
    try {
      req.id = id;
      const isAdmin = email.split("@")[1] === ADMIN_CONTROL_EMAIL;
      const currentUser = await User.find({ _id: id });
      if (!currentUser) {
        return res.status(401).json({
          error: true,
          message: "User was not present",
        });
      }
      req.isAdmin = isAdmin;
      next();
    } catch (error) {
      res.status(400).json({
        error: true,
        message: err,
      });
    }
  });
};

module.exports = {
  logoutController,
  isLoggedIn,
  successRedirect,
  getUser,
  loginFailure,
  authenticateToken,
};
