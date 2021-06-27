import React from "react";
import { Route, Redirect } from "react-router-dom";
import { IsAdmin } from "../Structure/Common";
import { useSelector } from "react-redux"

const PrivateRoute = ({ component: Component, ...rest }) => {
  let isAuth = useSelector((state) => state.authenticationNew.token);
  const isAdmin = IsAdmin();
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
