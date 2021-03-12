import React from "react";
import { Route, Redirect } from "react-router-dom";
import { Navbar } from "../Structure/Navbar";

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        localStorage.getItem("token") ? (
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
