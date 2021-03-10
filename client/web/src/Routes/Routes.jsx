import React from "react";
import {
  Route as PublicRoute,
  Switch,
  BrowserRouter as Router,
} from "react-router-dom";
import { PrivateRoute } from "./PrivateRoute";
import { AdminRoute } from "./AdminRoute";
import { Login } from "../Structure/Authentication"
import { Dashboard } from "../Structure/Dashboard"
import { CrudTopics } from "../Structure/Admin/Components/CrudTopics";
import { SearchByTopic } from "../Structure/Admin/Components/SearchByTopic";

const Route = () => {
  return (
    <>
      <Router>
        <Switch>
          <PrivateRoute exact path="/" >
            <Dashboard />
          </PrivateRoute>c
          <PublicRoute path="/login" >
            <Login />
          </PublicRoute>
          <PublicRoute path = "/topics" exact component = {CrudTopics} />
          <PublicRoute path = "/topics/:id" component = {SearchByTopic} />
          <PublicRoute>
            <div>Error 404</div>
          </PublicRoute>
        </Switch>
      </Router>
    </>
  );
};


export { Route }