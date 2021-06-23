import React from "react";
import { AuthTemplate } from "./AuthTemplate";
import styles from "../Styles/SignUp.module.css";
import { history, useHistory } from "react-router-dom";
const SignUp = () => {
  const history = useHistory();
  const sendOtp = () => {
    history.push("/verify-otp");
  };
  let cardContent = (
    <div className={styles.SignUp}>
      <p className={styles.SignUp__header}>Sign Up</p>
      <div className={styles.SignUp__form}>
        <input type="text" placeholder="Name" />
        <input type="text" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <button onClick={sendOtp}>Sign Up</button>
      </div>
      <div className={styles.SignUp__footer}>
        <p onClick={() => history.push("/forgot-password")}>Forgot Password?</p>
        <p onClick={() => history.push("/sign-in")}>Sign In</p>
      </div>
    </div>
  );
  return <AuthTemplate cardContent={cardContent} />;
};

export { SignUp };
