import React from "react";
import logo from "../../../Assets/logo.svg";
import styles from "../Styles/AuthTemplate.module.css";
import { useHistory, Redirect } from "react-router-dom";

const AuthTemplate = ({ cardContent }) => {
  const history = useHistory();
  return (
    <div className={styles.Auth}>
      <div className={styles.Auth__logo}>
        <img src={logo} alt="masai logo" onClick={() => history.push("/")} />
      </div>
      <div className={styles.Auth__content}>
        <img src="/logos/AuthLearning.svg" alt="learning logo" />
        <div className={styles.Auth__content__card}>{cardContent}</div>
      </div>
    </div>
  );
};

export { AuthTemplate };
