const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: String,
    email: String,
    role: String,
    profilePic: String,
    oauth: [
      {
        _id: false,
        provider: String,
        identifier: String,
      },
    ],
  },
  {
    versionKey: false,
    timestamps: true
  }
);

module.exports = mongoose.model("users", userSchema);
