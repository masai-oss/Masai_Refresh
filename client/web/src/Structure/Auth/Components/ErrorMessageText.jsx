import React from "react";
import styles from "../Styles/ErrorMessageText.module.css";
const ErrorMessageText = ({ message }) => {
  return <div className={styles.ErrorMessageText}>{message}</div>;
};

export { ErrorMessageText };
