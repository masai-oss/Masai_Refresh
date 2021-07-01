import React from "react";
import { AuthTemplate } from "./Components/AuthTemplate";
import styles from "./Styles/SignIn.module.css";
import { useHistory, Redirect } from "react-router-dom";
import { authActions } from "./state/action";
import { useDispatch, useSelector } from "react-redux";
import { Spinner } from "../Common";
import { getFromStorage } from "../../Utils/localStorageHelper";
import { storageEnums } from "../../Enums/storageEnums";
import { ErrorMessageText } from "./Components/ErrorMessageText";
const initData = {
  email: "",
  password: "",
};
const SignIn = () => {
  const [userData, setUserData] = React.useState(initData);
  const { email, password } = userData;
  const history = useHistory();
  const dispatch = useDispatch();
  let isAuth = getFromStorage(storageEnums.TOKEN, "");

  const { isLoading, isSignIn, errorMessageUserSignIn } = useSelector(
    (state) => state.authenticationNew
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };
  const handleSignIn = () => {
    const data = {
      email: email,
      password: password,
    };
    dispatch(authActions.userSigninProcess(data));
  };
  React.useEffect(() => {
    isSignIn && history.push("/");
  }, [isSignIn]);

  if (isLoading) {
    return <Spinner />;
  }
  const resendVerifOtp = () => {
    const data = {
      email: userData.email,
    };
    dispatch(authActions.resendOtpProcess(data));
    history.push("/verify-otp");
  };

  const renderErrorMessage = () => {
    if (
      errorMessageUserSignIn.toLowerCase() ===
      "User email hasn't been verified".toLowerCase()
    ) {
      return (
        <div>
          <ErrorMessageText message={errorMessageUserSignIn} />
          <button
            onClick={resendVerifOtp}
            className={styles.Signin__verifyNowButton}
          >
            Click to Verify email with OTP
          </button>
        </div>
      );
    }
    if (errorMessageUserSignIn !== "" && errorMessageUserSignIn) {
      return <ErrorMessageText message={errorMessageUserSignIn} />;
    }
  };
  const cardContent = (
    <div className={styles.SignIn}>
      <p className={styles.SignIn__header}>Sign In</p>
      <div className={styles.SignIn__form}>
        <input
          name="email"
          value={email}
          onChange={handleChange}
          type="text"
          placeholder="Email"
        />
        <input
          name="password"
          value={password}
          onChange={handleChange}
          type="password"
          placeholder="Password"
        />
        <button onClick={handleSignIn}>Sign In</button>
      </div>
      {renderErrorMessage()}

      <div className={styles.SignIn__footer}>
        <p onClick={() => history.push("/forgot-password")}>Forgot Password?</p>
        <p onClick={() => history.push("/sign-up")}>Sign Up</p>
      </div>
    </div>
  );
  return isAuth ? (
    <Redirect push to="/" />
  ) : (
    <AuthTemplate cardContent={cardContent} />
  );
};

export { SignIn };
