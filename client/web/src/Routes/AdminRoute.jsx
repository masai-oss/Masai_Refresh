import React from "react";
import { Route, Redirect } from "react-router-dom";
import jwt_decode from "jwt-decode";

const AdminRoute = ({ children, ...props }) => {
  let token = localStorage.getItem("token");
  const { admin: isAdmin } = jwt_decode(token);
  return isAdmin ? <Route {...props}> {children} </Route> : <Redirect to="/" />;
};

export { AdminRoute }