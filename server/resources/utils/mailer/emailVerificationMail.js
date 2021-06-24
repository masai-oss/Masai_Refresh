const { transporter } = require("./config/mailerConfig")

const send_email_verification_mail = (name, email, otp) => {
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

  return transporter.sendMail(mailOptions)
}

module.exports = {
  send_email_verification_mail,
}
