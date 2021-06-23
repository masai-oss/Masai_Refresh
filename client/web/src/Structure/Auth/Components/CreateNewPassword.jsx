import React from "react";
import { AuthTemplate } from "./AuthTemplate";
import styles from "../Styles/CreateNewPassword.module.css";
import { useHistory } from "react-router-dom";
const CreateNewPassword = () => {
  const history = useHistory();
  let cardContent = (
    <div className={styles.CreateNewPassword}>
      <p>Create a new password</p>
      <input type="password" placeholder="New Password" />
      <button>Change Password</button>
    </div>
  );
  return <AuthTemplate cardContent={cardContent} />;
};

export { CreateNewPassword };
