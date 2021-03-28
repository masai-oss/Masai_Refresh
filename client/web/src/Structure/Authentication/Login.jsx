import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "./state/action";
import { Redirect } from "react-router-dom";
import { getFromStorage } from "../../Utils/localStorageHelper";
import { storageEnums } from "../../Enums/storageEnums";
import { GoogleLogin } from "./Components/GoogleLogin";
import { ZohoLogin } from "./Components/ZohoLogin";
import { Grid, Card, CardContent } from "@material-ui/core";
import { LoginStyles } from "./Styles/LoginStyles";
import { Navbar } from "../Navbar";

const Login = () => {
  const dispatch = useDispatch();
  const isLoggingIn = useSelector((state) => state.authentication.isLoggingIn);
  let isAuth = getFromStorage(storageEnums.TOKEN);
  const classes = LoginStyles();
  useEffect(() => {
    dispatch(authActions.userLoginProcess());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return isAuth ? (
    <Redirect push to="/" />
  ) : isLoggingIn ? (
    <p>...loading</p>
  ) : (
    <Navbar>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: "85vh" }}
      >
        <Card>
          <CardContent style={{ backgroundColor: "#6C8D9E" }}>
            <Grid
              container
              direction="row"
              justify="space-between"
              alignItems="center"
            >
              <GoogleLogin />
              <div className={classes.content} />
              <ZohoLogin />
              <div className={classes.lastCont} />
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Navbar>
  );
};

export { Login };
