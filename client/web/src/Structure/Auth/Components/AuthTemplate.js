import React from "react";
import styles from "../Styles/AuthTemplate.module.css";
import logo from "../../../Assets/logo.svg";
const AuthTemplate = ({ cardContent }) => {
  return (
    <div className={styles.Auth}>
      <div className={styles.Auth__logo}>
        <img src={logo} alt="masai logo" />
      </div>
      <div className={styles.Auth__content}>
        <img src="/logos/AuthLearning.svg" alt="learning logo" />
        <div className={styles.Auth__content__card}>{cardContent}</div>
      </div>
    </div>
  );
};

export { AuthTemplate };
