const jwt = require("jsonwebtoken")
const OTPGenerator = require("otp-generator")
const emailValidator = require("email-validator")
const dotenv = require("dotenv")
dotenv.config()
const User = require("../models/User")
const Token = require("../models/Token")
const {
  signupFormValidation,
} = require("../utils/validation/signupFormValidation")
const {
  send_email_verification_mail,
} = require("../utils/mailer/emailVerificationMail")
const {
  signinFormValidation,
} = require("../utils/validation/signinFormValidation")
const {
  send_password_reset_mail,
} = require("../utils/mailer/passowrdResetMail")
const {
  resetPasswordFormValidation,
} = require("../utils/validation/resetPasswordFormValidation")

const createToken = (user) => {
  // encryption key
  const SECRET_KEY_TO_ACCESS = process.env.SECRET_KEY_TO_ACCESS

  // decide whether admin or not
  const isAdmin = user.role === "admin" ? true : false

  // form the data to be encrypted and generate token
  const user_data = {
    email: user.email,
    id: user._id,
    isAdmin: isAdmin,
  }
  const token = jwt.sign(user_data, SECRET_KEY_TO_ACCESS, {
    expiresIn: "710h",
  })

  return token
}

const createOTP = () => {
  const otp = OTPGenerator.generate(6, {
    specialChars: false,
    upperCase: false,
    alphabets: false,
  })

  return otp
}

const signupUser = async (req, res) => {
  // validate form
  const { error } = signupFormValidation(req.body)
  if (error) {
    return res.status(400).json({
      error: true,
      message: error.details[0].message,
    })
  }

  let { name, email, password } = req.body
  password = password.trim()

  // validate email
  if (!emailValidator.validate(email)) {
    return res.status(400).json({
      error: true,
      message: "Invaild email credentials",
    })
  }

  // limit to specific domain
  const admin_domain = process.env.ADMIN_CONTROL_EMAIL.trim()
  const user_domain = process.env.USER_CONTROL_EMAIL.trim()
  let domain = email.trim().split("@")[1]
  if (domain !== admin_domain && domain !== user_domain) {
    return res.status(400).json({
      error: true,
      message: "Invalid domain",
    })
  }

  try {
    // check whether user already exists
    const check_User = await User.find({ email: email }).lean().exec()

    //if user already exists
    if (check_User.length > 0) {
      return res.status(400).json({
        error: true,
        message: "User Already exists",
      })
    }

    // assign roles based on domain
    let role = domain === admin_domain ? "admin" : "user"
    const to_add = {
      name,
      email,
      password,
      role,
    }

    // add user to database
    const user = await User.create(to_add)

    // create OTP
    const OTP = createOTP()
    // store generated otp in token model
    const token_data = {
      user_id: user._id,
      token: String(OTP),
    }
    await Token.create(token_data)

    // send verification mail
    await send_email_verification_mail(name, email, OTP)

    return res.status(200).json({
      error: false,
      message: "Registration Successful",
    })
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: "Something went wrong",
      reason: `${error}`,
    })
  }
}

const verifyUser = async (req, res) => {
  let { email, OTP } = req.body

  // check for OTP and email in request
  if (!email || !OTP) {
    return res.status(400).json({
      error: true,
      message: "Send both email and otp",
    })
  }

  try {
    // check if user exists
    const user = await User.findOne({ email: email }).lean().exec()

    // if no such user
    if (!user) {
      return res.status(400).json({
        error: true,
        message: "Invalid email",
      })
    }

    // If user registered using OAuth
    if (!user.password && user.oauth) {
      return res.status(400).json({
        error: true,
        message: "User signed up using OAuth",
      })
    }

    // get user id
    const user_id = user._id

    const token = await Token.findOne({ user_id: user_id }).lean().exec()

    // if no token
    if (!token) {
      return res.status(400).json({
        error: true,
        message: "No OTP generated or OTP expired",
      })
    }

    // if otp doesn't match
    OTP = String(OTP).trim()
    if (token.token !== OTP) {
      return res.status(400).json({
        error: true,
        message: "Invalid OTP",
      })
    }

    // if Otp matches update verified flag in user collection
    await User.updateOne(
      {
        _id: user_id,
      },
      {
        $set: {
          verified: true,
        },
      }
    )

    return res.status(200).json({
      error: false,
      message: "User verified successfully",
    })
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: "Something went wrong",
      reason: `${error}`,
    })
  }
}

const resendEmailVerficationOTP = async (req, res) => {
  const { email } = req.body

  // check for email in request
  if (!email) {
    return res.status(400).json({
      error: true,
      message: "Send the user email",
    })
  }

  try {
    const user = await User.findOne({ email: email }).lean().exec()

    // if no user
    if (!user) {
      return res.status(400).json({
        error: true,
        message: "Invalid email",
      })
    }

    // If user registered using OAuth
    if (!user.password && user.oauth) {
      return res.status(400).json({
        error: true,
        message: "User signed up using OAuth",
      })
    }

    // if user already verified
    if (user.verified) {
      return res.status(400).json({
        error: true,
        message: "Email already verified",
      })
    }

    // get user id and name
    const user_id = user._id
    const name = user.name

    // check for previous OTP, if any
    const token = await Token.findOne({ user_id: user_id }).lean().exec()

    // if already exists delete that
    if (token) {
      await Token.deleteOne({ _id: token._id })
    }

    // create OTP
    const OTP = createOTP()
    // store generated otp in token model
    const token_data = {
      user_id: user._id,
      token: String(OTP),
    }
    await Token.create(token_data)

    // send verification mail
    await send_email_verification_mail(name, email, OTP)

    return res.status(200).json({
      error: false,
      message: "OTP sent successfully",
    })
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: "Something went wrong",
      reason: `${error}`,
    })
  }
}

const signinUser = async (req, res) => {
  // validate form
  const { error } = signinFormValidation(req.body)
  if (error) {
    return res.status(400).json({
      error: true,
      message: error.details[0].message,
    })
  }

  let { email, password } = req.body
  password = password.trim()

  try {
    // get user (removed lean as for the usage of methods in mongo object)
    const user = await User.findOne({ email: email }).exec()

    // if no user
    if (!user) {
      return res.status(400).json({
        error: true,
        message: "Invalid Email",
      })
    }

    // If user registered using OAuth
    if (!user.password && user.oauth) {
      return res.status(400).json({
        error: true,
        message: "User has only OAuth signin option",
      })
    }

    // If user not verified
    if (!user.verified) {
      return res.status(400).json({
        error: true,
        message: "User email hasn't been verified",
      })
    }

    // check password match
    const match = await user.password_checker(password)

    // if password doesn't match
    if (!match) {
      return res.status(400).json({
        error: false,
        message: "Invalid Password",
      })
    }

    // generate token for the user
    const token = createToken(user)

    // form data to be sent as response
    const user_data = {
      _id: user._id,
      name: user.name,
      email: user.email,
      profilePic: user.profilePic === undefined ? null : user.profilePic,
    }
    return res.status(200).json({
      error: false,
      message: "user has been successfully authenticated",
      user: user_data,
      token: token,
    })
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: "Something went wrong",
      reason: `${error}`,
    })
  }
}

const sendPasswordResetOTP = async (req, res) => {
  const { email } = req.body

  // check for email in body
  if (!email) {
    return res.statu(400).json({
      error: true,
      message: "Send the user email",
    })
  }

  try {
    // get the user
    const user = await User.findOne({ email: email }).lean().exec()

    // if no such user
    if (!user) {
      return res.status(400).json({
        error: true,
        message: "Invalid email",
      })
    }

    // If user registered using OAuth
    if (!user.password && user.oauth) {
      return res.status(400).json({
        error: true,
        message: "User signed up using OAuth",
      })
    }

    // get user id and name
    const user_id = user._id
    const name = user.name

    // check for previous OTP, if any
    const token = await Token.findOne({ user_id: user_id }).lean().exec()

    // if already exists delete that
    if (token) {
      await Token.deleteOne({ _id: token._id })
    }

    // create OTP
    const OTP = createOTP()
    // store generated otp in token model
    const token_data = {
      user_id: user._id,
      token: String(OTP),
    }
    await Token.create(token_data)

    // send verification mail
    await send_password_reset_mail(name, email, OTP)

    return res.status(200).json({
      error: false,
      message: "OTP sent successfully",
    })
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: "Something went wrong",
      reason: `${error}`,
    })
  }
}

const passwordReset = async (req, res) => {
  // validate form
  const { error } = resetPasswordFormValidation(req.body)
  if (error) {
    return res.status(400).json({
      error: true,
      message: error.details[0].message,
    })
  }

  let { email, new_password, OTP } = req.body
  new_password = new_password.trim()

  try {
    // get user (removed lean as for the usage of methods in mongo object)
    const user = await User.findOne({ email: email }).exec()

    // if no user
    if (!user) {
      return res.status(400).json({
        error: true,
        message: "Invalid Email",
      })
    }

    // If user registered using OAuth
    if (!user.password && user.oauth) {
      return res.status(400).json({
        error: true,
        message: "User signed up using OAuth",
      })
    }

    // get user id
    const user_id = user._id

    // get otp
    const token = await Token.findOne({ user_id: user_id }).lean().exec()

    // if no otp
    if (!token) {
      return res.status(400).json({
        error: true,
        message: "No OTP generated or OTP expired",
      })
    }

    // if otp doesn't match
    OTP = String(OTP).trim()
    if (token.token !== OTP) {
      return res.status(400).json({
        error: true,
        message: "Invalid OTP",
      })
    }

    // if Otp matches update new password in user collection
    user.password = new_password
    await user.save()

    // after reset delete the token/otp
    await Token.deleteOne({ _id: token._id })

    return res.status(200).json({
      error: false,
      message: "Password changed successfully",
    })
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: "Something went wrong",
      reason: `${error}`,
    })
  }
}

module.exports = {
  signupUser,
  verifyUser,
  resendEmailVerficationOTP,
  signinUser,
  sendPasswordResetOTP,
  passwordReset,
}
