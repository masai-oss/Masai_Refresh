const express = require("express")
const { authenticateToken } = require("../controller/authController")
const {
  getBookmarksDetailsTopicwise,
  getAllBookmarks,
} = require("../controller/userProfileController")
const userProfileRoute = express.Router()

userProfileRoute.get("/all_bookmarks", authenticateToken, getAllBookmarks)
userProfileRoute.post(
  "/topicwise_bookmarks",
  authenticateToken,
  getBookmarksDetailsTopicwise
)

module.exports = userProfileRoute