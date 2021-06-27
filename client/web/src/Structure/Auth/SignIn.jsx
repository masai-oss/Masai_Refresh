import React from "react";
import { AuthTemplate } from "./Components/AuthTemplate";
import styles from "./Styles/SignIn.module.css";
import { useHistory, Redirect } from "react-router-dom";
import { authActions } from "./state/action";
import { useDispatch, useSelector } from "react-redux";
import { Spinner } from "../Common";
import { getFromStorage } from "../../Utils/localStorageHelper";
import { storageEnums } from "../../Enums/storageEnums";
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
  console.log("isAuth:", isAuth);

  const { isLoading, isSignIn, ErrorMessage } = useSelector(
    (state) => state.authenticationNew
  );
  console.log("ErrorMessage:", ErrorMessage);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };
  const handleSignIn = () => {
    console.log(userData);
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
      {ErrorMessage && <div style={{ color: "red" }}>{ErrorMessage}</div>}
      <div className={styles.SignIn__footer}>
        <p onClick={() => history.push("/forgot-password")}>Forgot Password?</p>
        <p onClick={() => history.push("/sign-up")}>Sign Up</p>
      </div>
    </div>
  );
  return <AuthTemplate cardContent={cardContent} />;
};

export { SignIn };
