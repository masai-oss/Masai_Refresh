import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "./state/action";
import { Redirect } from "react-router-dom";
import { getFromStorage } from "../../Utils/localStorageHelper";
import { storageEnums } from "../../Enums/storageEnums";
import { GoogleLogin } from "./Components/GoogleLogin";
import { ZohoLogin } from "./Components/ZohoLogin";
import { Grid, Card, CardContent, Box } from "@material-ui/core";
import Loader from "react-loader-spinner";

const Login = () => {
  const dispatch = useDispatch();
  const isLoggingIn = useSelector((state) => state.authentication.isLoggingIn);
  let isAuth = getFromStorage(storageEnums.TOKEN, "");
  useEffect(() => {
    dispatch(authActions.userLoginProcess());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return isAuth ? (
    <Redirect push to="/" />
  ) : isLoggingIn ? (
    <Loader />
  ) : (
    <>
      <Card
        style={{
          position: "absolute",
          top: "0",
          bottom: "0",
          left: "0",
          right: "0",
          display: "grid",
          placeItems: "center",
        }}
      >
        <CardContent
          style={{
            backgroundColor: "#84a8b3",
            width: "400px",
            borderRadius: "2px",
            padding: "30px 0",
          }}
        >
          <Grid
            container
            direction="column"
            justify="space-between"
            alignItems="center"
          >
            <Box m={2}>
              <GoogleLogin />
            </Box>
            <Box m={2}>
              <ZohoLogin />
            </Box>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
};

export { Login };
