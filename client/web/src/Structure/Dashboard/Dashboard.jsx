import React from "react";
import { authActions } from "../Authentication";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";

const REACT_APP_AUTH_GOOGLE_LOGOUT_URL =
  process.env.REACT_APP_AUTH_GOOGLE_LOGOUT_URL;

const Dashboard = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const logout = () => {
    window.open(REACT_APP_AUTH_GOOGLE_LOGOUT_URL, "_self");
    dispatch(authActions.logoutProcess());
  };
  const goTo = () => {
    history.push("/topics_user");
  }
  return (
    <>
      <p>You are LoggedIn</p>
      <button onClick={logout}>Logout</button>
      <button onClick={goTo}>Topics</button>
    </>
  );
};

export { Dashboard };
