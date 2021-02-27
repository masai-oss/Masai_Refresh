import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ children, ...props }) => {

  let isAuth = localStorage.getItem("token")

  return isAuth ? <Route {...props} > {children} </Route> : <Redirect to='/login' />
};

export { PrivateRoute };
