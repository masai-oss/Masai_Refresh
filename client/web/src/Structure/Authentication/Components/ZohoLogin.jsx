import React from "react";
import { Button } from "@material-ui/core";
import zohoIcon from "./zohoIcon.svg";
import { LoginStyles } from "../Styles/LoginStyles"

const ZOHO_LOGIN_URL = process.env.REACT_APP_AUTH_ZOHO_LOGIN_URL;
const ZohoLogin = () => {
  const zohoLogin = () => {
    window.open(ZOHO_LOGIN_URL, "_self");
  };
  const classes = LoginStyles()
  return (
    <Button
      variant="contained"
      color="primary"
      onClick={zohoLogin}
      style={{ marginLeft: 10 }}
    >
      <img src={zohoIcon} alt={zohoIcon} className={classes.zohoButtonStyle} />{" "}
      Sign in with ZOHO
    </Button>
  );
};

export { ZohoLogin };
