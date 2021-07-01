import React from "react";
import { AuthTemplate } from "./AuthTemplate";
import styles from "../Styles/SignUp.module.css";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../state/action";
import { Spinner } from "../../Common/Loader";
import { ErrorMessageText } from "./ErrorMessageText";
import { storageEnums } from "../../../Enums/storageEnums";
import { Redirect } from "react-router-dom";
import { getFromStorage } from "../../../Utils/localStorageHelper";

import {
  saveToStorage,
  removeFromStorage,
} from "../../../Utils/localStorageHelper";
const initData = {
  name: "",
  email: "",
  password: "",
};

const SignUp = () => {
  const dispatch = useDispatch();
  const [userData, setUserData] = React.useState(initData);
  const { isLoading, errorMessageSignUp, isSignUp } = useSelector(
    (state) => state.authenticationNew
  );
  let isAuth = getFromStorage(storageEnums.TOKEN, "");
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };
  const sendOtp = () => {
    dispatch(authActions.userSignUpProcess(userData));
  };
  const history = useHistory();
  React.useEffect(() => {
    saveToStorage(storageEnums.SIGN_UP_EMAIL, userData.email);
    isSignUp && history.push("/verify-otp");
  }, [isSignUp]);

  const { name, email, password } = userData;

  if (isLoading) {
    return <Spinner />;
  }

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
      <div className={styles.SignUp__footer}>
        <p onClick={() => history.push("/forgot-password")}>Forgot Password?</p>
        <p onClick={() => history.push("/sign-in")}>Sign In</p>
      </div>
      {errorMessageSignUp !== "" && errorMessageSignUp && (
        <ErrorMessageText message={errorMessageSignUp} />
      )}
      {/* {ErrorMessage && <div style={{ color: "red" }}>{ErrorMessage}</div>} */}
    </div>
  );
  return isAuth ? (
    <Redirect push to="/" />
  ) : (
    <AuthTemplate cardContent={cardContent} />
  );
};

export { SignUp };
