const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
    },
    password: {
      type: String,
    },
    password_reset_status: {
      type: Boolean,
      default: false,
    },
    profilePic: String,
    oauth: [
      {
        _id: false,
        provider: String,
        identifier: String,
      },
    ],
    verified: {
      type: Boolean,
      required: true,
      default: false,
    },
    likes: Schema.Types.Mixed,
    bookmarks: Schema.Types.Mixed,
  },
  {
    versionKey: false,
  }
);

// before saving hash password
userSchema.pre("save", function (next) {
  // check if user changed password
  if (!this.isModified("password")) {
    return next();
  }

  // if changed
  bcrypt.hash(this.password, 10, (error, hashed) => {
    if (error) {
      return next(error);
    } else {
      this.password = hashed;
      return next();
    }
  });
});

// add method to schema that can be used check password match
userSchema.methods.password_checker = function (password) {
  // get password from user document
  const hashed_password = this.password;

  // check if matches
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, hashed_password, (error, same) => {
      if (error) {
        return reject(error);
      } else {
        return resolve(same);
      }
    });
  });
};

module.exports = mongoose.model("users", userSchema);
