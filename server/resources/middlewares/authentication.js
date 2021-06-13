const jwt = require("jsonwebtoken")
const User = require("../models/User")
const dotenv = require("dotenv")
dotenv.config()

const SECRET_KEY_TO_ACCESS = process.env.SECRET_KEY_TO_ACCESS
const ADMIN_CONTROL_EMAIL = process.env.ADMIN_CONTROL_EMAIL

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"]
  const token = authHeader && authHeader.split(" ")[1]
  if (!token || token === "null") {
    return res.status(400).json({
      error: true,
      message: "Authentication token not present",
    })
  }
  jwt.verify(token, SECRET_KEY_TO_ACCESS, async (err, user) => {
    if (err) {
      return res.status(403).json({
        error: true,
        message: "token not able to authenticate",
        err: `${err}`,
      })
    }
    const { email, id } = user
    try {
      req.id = id
      const isAdmin = email.split("@")[1] === ADMIN_CONTROL_EMAIL
      const currentUser = await User.find({ _id: id })
      if (!currentUser.length) {
        return res.status(401).json({
          error: true,
          message: "User was not present",
        })
      }
      req.isAdmin = isAdmin
      next()
    } catch (err) {
      res.status(400).json({
        error: true,
        message: `${err}`,
      })
    }
  })
}

module.exports = {
  authenticateToken,
}
