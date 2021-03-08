const jwt = require("jsonwebtoken");
const User = require("../models/User");
const dotenv = require("dotenv");
const { OAuth2Client } = require("google-auth-library");
dotenv.config();

const CLIENT_HOME_PAGE_URL = process.env.CLIENT_HOME_PAGE_URL;
const SECRET_KEY_TO_ACCESS = process.env.SECRET_KEY_TO_ACCESS;
const ADMIN_CONTROL_EMAIL = process.env.ADMIN_CONTROL_EMAIL;
const GOOGLE_ANDROID_CLIENT_ID = process.env.GOOGLE_ANDROID_CLIENT_ID;

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
    res.status(200).set("Cache-Control", "no-store").json({
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
      error: true,
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

const getUserInfoToken = (user) => {
  const {
    _doc: { oauth, ...userInfo },
  } = user;
  const { _id, email } = userInfo;
  const token = createToken({ _id, email });
  return { userInfo, token };
};

const loginUser = async (req, res) => {
  const { googleToken } = req.body;
  if (googleToken === undefined) {
    return res.status(400).json({
      error: true,
      message: "Google Token must be present",
    });
  }
  try {
    const client = new OAuth2Client(GOOGLE_ANDROID_CLIENT_ID);
    const ticket = await client.verifyIdToken({
      idToken: googleToken,
      audience: GOOGLE_ANDROID_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const { sub: id, email, name, picture } = payload;
    const currentUser = await User.findOne({
      oauth: { $elemMatch: { provider: "google", identifier: id } },
    });
    if (!currentUser) {
      const role =
        email.split("@")[1] === ADMIN_CONTROL_EMAIL ? "admin" : "user";
      const newUser = await new User({
        name: name,
        email: email,
        role: role,
        profilePic: picture,
        oauth: [
          {
            provider: "google",
            identifier: id,
          },
        ],
      }).save();
      const { userInfo, token } = getUserInfoToken(newUser);
      res.status(200).set("Cache-Control", "no-store").json({
        error: false,
        message: "user has been successfully authenticated",
        user: userInfo,
        token: token,
      });
    }
    const { userInfo, token } = getUserInfoToken(currentUser);
    res.status(200).set("Cache-Control", "no-store").json({
      error: false,
      message: "user has been successfully authenticated",
      user: userInfo,
      token: token,
    });
  } catch (err) {
    res.status(401).json({
      authenticated: false,
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
