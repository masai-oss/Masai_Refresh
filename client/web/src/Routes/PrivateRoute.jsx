import React from "react";
import { Route, Redirect } from "react-router-dom";
import { IsAdmin } from "../Structure/Common";
// import { useSelector } from "react-redux";
import { getFromStorage } from "../Utils/localStorageHelper";
import { storageEnums } from "../Enums/storageEnums";

const PrivateRoute = ({ component: Component, ...rest }) => {
  // let isAuth = useSelector((state) => state.authenticationNew.token);
  const isAdmin = IsAdmin();
  let isAuth = getFromStorage(storageEnums.TOKEN, "");

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuth ? (
          isAdmin ? (
            <Redirect to="/admin/topics" />
          ) : (
            <Component {...props} />
          )
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

export { PrivateRoute };
