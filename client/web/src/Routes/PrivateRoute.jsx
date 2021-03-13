import React from "react";
import { Route, Redirect } from "react-router-dom";
import { Navbar } from "../Structure/Navbar";
import { getFromStorage } from "../Utils/localStorageHelper"
import { storageEnums } from "../Enums/storageEnums"

const PrivateRoute = ({ component: Component, ...rest }) => {
  let token = getFromStorage(storageEnums.TOKEN, "")
  return (
    <Route
      {...rest}
      render={(props) =>
        token ? (
          <Navbar>
            <Component {...props} />
          </Navbar>
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
