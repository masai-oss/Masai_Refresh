import React, { useEffect } from "react";
import GoogleButton from "react-google-button";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "./state/action";
import { Redirect } from "react-router-dom";
import { getFromStorage } from "../../Utils/localStorageHelper";
import { storageEnums } from "../../Enums/storageEnums";

const GOOGLE_LOGIN_URL = process.env.REACT_APP_AUTH_GOOGLE_LOGIN_URL;
const ZOHO_LOGIN_URL = process.env.REACT_APP_AUTH_ZOHO_LOGIN_URL;
const Login = () => {
  const dispatch = useDispatch();
  const isLoggingIn = useSelector((state) => state.authentication.isLoggingIn);
  let isAuth = getFromStorage(storageEnums.TOKEN);

  const loginUser = () => {
    window.open(GOOGLE_LOGIN_URL, "_self");
  };
  const zohoLogin = () => {
    window.open(ZOHO_LOGIN_URL, "_self");
  };
  useEffect(() => {
    dispatch(authActions.userLoginProcess());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return isAuth ? (
    <Redirect push to="/" />
  ) : isLoggingIn ? (
    <p>...loading</p>
  ) : (
    <>
      <GoogleButton
        type="dark" // can be light or dark
        onClick={loginUser}
      />
      <button onClick={zohoLogin}>Zoho</button>
    </>
  );
};

export { Login };
