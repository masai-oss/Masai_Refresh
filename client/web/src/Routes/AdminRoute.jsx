import React from "react";
import { Route, Redirect } from "react-router-dom";
import { IsAdmin } from "../Structure/Common"

const AdminRoute = ({ children: Component, ...rest }) => {
  const isAdmin = IsAdmin()
  return (
    <Route
      {...rest}
      render={(props) =>
        isAdmin ? (
          <Component {...props} />
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

export { AdminRoute }