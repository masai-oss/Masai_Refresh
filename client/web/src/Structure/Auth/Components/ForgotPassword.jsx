import React from "react";
import { AuthTemplate } from "./AuthTemplate";
import styles from "../Styles/ForgotPassword.module.css";
import { useHistory } from "react-router-dom";
const ForgotPassword = () => {
  const history = useHistory();

  let cardContent = (
    <div className={styles.ForgotPassword}>
      <p>Please enter your email to recover password</p>
      <input type="text" placeholder="Email" />
      <button>Send OTP</button>
    </div>
  );
  return <AuthTemplate cardContent={cardContent} />;
};

export { ForgotPassword };
