import React from "react";
import { AuthTemplate } from "./AuthTemplate";
import styles from "../Styles/SignUp.module.css";
import { history, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../state/action";
const initData = {
  name: "",
  email: "",
  password: "",
};

const SignUp = () => {
  const dispatch = useDispatch();
  const [userData, setUserData] = React.useState(initData);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };
  const sendOtp = (e) => {
    e.preventDefault();
    console.log(userData);
    history.push("/verify-otp");
    dispatch(authActions.userSignUpProcess(userData));
  };
  const { name, email, password } = userData;
  const history = useHistory();
  let cardContent = (
    <div className={styles.SignUp}>
      <p className={styles.SignUp__header}>Sign Up</p>
      <div className={styles.SignUp__form}>
        <input
          placeholder="Name "
          name="name"
          value={name}
          onChange={handleChange}
          type="text"
        />
        <input
          placeholder="Email "
          name="email"
          value={email}
          onChange={handleChange}
          type="text"
        />
        <input
          placeholder="Password "
          name="password"
          type="password"
          value={password}
          onChange={handleChange}
        />
        <button onClick={sendOtp}>Sign Up</button>
      </div>
      <div className={styles.SignUp__footer}></div>
    </div>
  );
  return <AuthTemplate cardContent={cardContent} />;
};

export { SignUp };
