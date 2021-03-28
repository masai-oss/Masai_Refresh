import React from "react";
import GoogleButton from "react-google-button";

const GOOGLE_LOGIN_URL = process.env.REACT_APP_AUTH_GOOGLE_LOGIN_URL;
const GoogleLogin = () => {
  const loginUser = () => {
    window.open(GOOGLE_LOGIN_URL, "_self");
  };

  return (
    <GoogleButton
      type="dark" // can be light or dark
      onClick={loginUser}
      style={{marginLeft: 10}}
    />
  );
};

export { GoogleLogin };
