const { transporter } = require("./mailerConfig")

const send_verification_mail = (name, email, otp) => {
  const mailOptions = {
    from: process.env.MAILER_EMAIL,
    to: email,
    subject: "Verification OTP",
    html: `<div>
    <h3>Account Verification</h3>
    <h4>Hi ${name}!</h4>
    <p>Your One Time Password is <strong>${otp}</strong> . It will be valid for 5 minutes.</p>
    </div>`,
  }

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error)
    }
  })
}

module.exports = {
  send_verification_mail,
}
