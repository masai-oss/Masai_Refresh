import React from "react";
import { authActions } from "../Authentication";
import { useDispatch } from "react-redux";

const REACT_APP_AUTH_GOOGLE_LOGOUT_URL =
  process.env.REACT_APP_AUTH_GOOGLE_LOGOUT_URL;

const Dashboard = () => {
  const dispatch = useDispatch();
  const logout = () => {
    window.open(REACT_APP_AUTH_GOOGLE_LOGOUT_URL, "_self");
    dispatch(authActions.logoutProcess());
  };
  return (
    <>
      <p>You are LoggedIn</p>
      <button onClick={logout}>Logout</button>
    </>
  );
};

export { Dashboard };
