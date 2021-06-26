import React from "react";
import { AuthTemplate } from "./AuthTemplate";
import styles from "../Styles/CreateNewPassword.module.css";
import { useHistory } from "react-router-dom";
const CreateNewPassword = () => {
  const [password,setPassword]=React.useState("")
  const history = useHistory();
   const newPassword =()=>{
     const data = {
    
  }
  }
  let cardContent = (
    <div className={styles.CreateNewPassword}>
      <p>Create a new password</p>
      <input onChange={(e)=>setPassword(e.target.value)} type="password" placeholder="New Password" />
      <button onClick={newPassword}>Change Password</button>
    </div>
  );
  return <AuthTemplate cardContent={cardContent} />;
};

export { CreateNewPassword };
