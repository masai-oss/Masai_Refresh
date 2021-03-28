import React from "react";
import zohoIcon from "../../../Resources/zohoIcon.svg";
import { LoginStyles } from "../Styles/LoginStyles"
import { Button } from "../Styles/ZohoLoginStyle";

const ZOHO_LOGIN_URL = process.env.REACT_APP_AUTH_ZOHO_LOGIN_URL;
const ZohoLogin = () => {
  const zohoLogin = () => {
    window.open(ZOHO_LOGIN_URL, "_self");
  };
  const classes = LoginStyles()
  return (
    <Button type="dark" tabindex="1" role="button"
      onClick={zohoLogin}
    >
      <img src={zohoIcon} alt={zohoIcon} />
      Sign in with ZOHO
    </Button>
  );
};

export { ZohoLogin };


