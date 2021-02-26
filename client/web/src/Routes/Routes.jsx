import React from "react";
import {
  Route as PublicRoute,
  Switch,
  BrowserRouter as Router,
} from "react-router-dom";
import { PrivateRoute } from "./PrivateRoute";
import { Login } from "../Structure/Authentication"
import { Dashboard } from "../Structure/Dashboard"

const Route = () => {
  return (
    <>
      <Router>
        <Switch>
          <PrivateRoute exact path="/" component={Dashboard}/>
          <PublicRoute path="/login" component={Login}/>
          <PublicRoute render={() => <div>Error 404</div>} />
        </Switch>
      </Router>
    </>
  );
};


export { Route }