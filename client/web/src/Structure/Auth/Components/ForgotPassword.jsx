import React from "react";
import { AuthTemplate } from "./AuthTemplate";
import styles from "../Styles/ForgotPassword.module.css";
import { useHistory } from "react-router-dom";
import { authActions } from "../state/action";
import { useDispatch } from "react-redux";
const ForgotPassword = () => {
  const [email, setEmail] = React.useState("");
  const dispatch = useDispatch();
  const resendOtp = () => {
    const data = { email: email };
    console.log(email);
  };
  let cardContent = (
    <div className={styles.ForgotPassword}>
      <p>Please enter your email to recover password</p>
      <input
        type="text"
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />

      <button>Send OTP</button>
    </div>
  );
  return <AuthTemplate cardContent={cardContent} />;
};

export { ForgotPassword };
