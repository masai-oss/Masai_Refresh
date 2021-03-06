const jwt = require("jsonwebtoken");
const User = require("../models/User");
const dotenv = require("dotenv");
const userInfoValidation = require("../utils/validation/authValidation");
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
    if (err) {
      return res.status(403).json({
        error: true,
        message: "token not able to authenticate",
      });
    }
    const { email, id } = user;
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

const loginUser = async (req, res) => {
  const { name, email, profilePic, googleId } = req.body;
  const { error } = userInfoValidation(req.body);
  if (error) {
    return res.status(400).json({
      error: true,
      message: error.details[0].message,
    });
  }
  let domain = email.split("@")[1]
  let check = (domain === ADMIN_CONTROL_EMAIL) || (domain === "gmail.com")
  if (!check) {
    return res.status(200).json({
      error: "true",
      message: "Domain can only be Admin type or gmail"
    })
  }
  try {
    const currentUser = await User.findOne({
      oauth: { $elemMatch: { provider: "google", identifier: googleId } },
    }, { __v: 0, oauth:0 });
    if (!currentUser) {
      let role = domain === ADMIN_CONTROL_EMAIL ? "admin" : "user";
      const newUser = await new User({
        name: name,
        email: email,
        role: role,
        profilePic: profilePic,
        oauth: [
          {
            provider: "google",
            identifier: googleId,
          },
        ],
      }, {oauth:0}).save();
      const createdToken = createToken(newUser);
      const { _id } = newUser
      return res.status(200).set("Cache-Control", "no-store").json({
        error: false,
        message: "user has been successfully authenticated",
        user: { _id, role },
        token: createdToken,
      });
    }
    const createdToken = createToken(currentUser);
    const { _id, role } = currentUser
    return res.status(200).set("Cache-Control", "no-store").json({
        error: false,
        message: "user has been successfully authenticated",
        user: {_id, role},
        token: createdToken,
      });
  } catch (err) {
    res.status(400).json({
      error: true,
      message: err,
    });
  }
};

module.exports = {
  logoutController,
  isLoggedIn,
  successRedirect,
  getUser,
  loginFailure,
  loginUser,
  authenticateToken,
};
