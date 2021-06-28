import React from "react";
import { Route, Redirect } from "react-router-dom";
import { IsAdmin } from "../Structure/Common";
import { useSelector } from "react-redux";

const AdminRoute = ({ component: Component, ...rest }) => {
  let isAuth = useSelector((state) => state.authenticationNew.token);
  const isAdmin = IsAdmin();
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuth ? (
          isAdmin ? (
            <Component {...props} />
          ) : (
            <Redirect to="/quiz_topics" />
          )
        ) : (
          <Redirect
            to={{
              // pathname: "/login",
              pathname: "/sign-in",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

export { AdminRoute };
