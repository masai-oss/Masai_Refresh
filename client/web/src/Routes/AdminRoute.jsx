import React from "react";
import { Route, Redirect } from "react-router-dom";
import { getFromStorage } from "../Utils/localStorageHelper";
import { storageEnums } from "../Enums/storageEnums";
import { IsAdmin } from '../Structure/Common'


const AdminRoute = ({ component: Component, ...rest }) => {
  let token = getFromStorage(storageEnums.TOKEN, "");
  const isAdmin = IsAdmin();
  let path = rest.path
  return (
    <Route
      {...rest}
      render={(props) =>
        token ? (
          isAdmin ? (
            <Component {...props} />
          ) : (
            <Redirect to="/quiz_topics" />
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

export { AdminRoute };
