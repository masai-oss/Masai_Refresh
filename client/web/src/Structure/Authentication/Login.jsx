import React, { useEffect } from "react";
import GoogleButton from "react-google-button";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "./state/action";
import { Redirect } from "react-router-dom";

const REACT_APP_AUTH_GOOGLE_LOGIN_URL = process.env.REACT_APP_AUTH_GOOGLE_LOGIN_URL;

const Login = () => {
  const dispatch = useDispatch();
  const loginUser = () => {
    window.open(REACT_APP_AUTH_GOOGLE_LOGIN_URL, "_self");
  };
  const isLoggingIn = useSelector((state) => state.authentication.isLoggingIn);
  useEffect(() => {
    dispatch(authActions.userLoginProcess());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return localStorage.getItem("token") ? (
    <Redirect push to="/" />
  ) : isLoggingIn ? (
    <p>Is loading</p>
  ) : (
    <>
      <GoogleButton
        type="dark" // can be light or dark
        onClick={loginUser}
      />
    </>
  );
};

export { Login };
