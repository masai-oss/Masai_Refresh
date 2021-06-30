import React from "react";
import styles from "../Styles/SuccessMessageText.module.css";
const SuccessMessageText = ({ message }) => {
  return <div className={styles.SuccessMessageText}>{message}</div>;
};

export { SuccessMessageText };
