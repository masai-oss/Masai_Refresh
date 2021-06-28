import React from "react";
import { AuthTemplate } from "./Components/AuthTemplate";
import styles from "./Styles/SignIn.module.css";
import { useHistory } from "react-router-dom";
const SignIn = () => {
  const history = useHistory();
  const cardContent = (
    <div className={styles.SignIn}>
      <p className={styles.SignIn__header}>Sign In</p>
      <div className={styles.SignIn__form}>
        <input type="text" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <button>Sign In</button>
      </div>
      <div className={styles.SignIn__footer}>
        <p onClick={() => history.push("/forgot-password")}>Forgot Password?</p>
        <p onClick={() => history.push("/sign-up")}>Sign Up</p>
      </div>
    </div>
  );
  return <AuthTemplate cardContent={cardContent} />;
};

export { SignIn };
