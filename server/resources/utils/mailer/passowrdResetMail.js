const { transporter } = require("./config/mailerConfig")

const send_password_reset_mail = (name, email, otp) => {
  const mailOptions = {
    from: process.env.MAILER_EMAIL,
    to: email,
    subject: "Password Reset OTP",
    html: `<div>
    <h3>Password Reset</h3>
    <h4>Hi ${name}!</h4>
    <p>Your One Time Password is <strong>${otp}</strong> . It will be valid for 5 minutes.</p>
    </div>`,
  }

  return transporter.sendMail(mailOptions)
}

module.exports = {
  send_password_reset_mail,
}
