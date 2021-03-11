import React from "react";
import {
  Route as PublicRoute,
  Switch,
  BrowserRouter as Router,
} from "react-router-dom";
import { PrivateRoute } from "./PrivateRoute";
import { AdminRoute } from "./AdminRoute";
import { Login } from "../Structure/Authentication";
import { Dashboard } from "../Structure/Dashboard";
import { Topics } from "../Structure/Topics";
import { CrudTopics, SearchByTopic } from "../Structure/Admin";

const Route = () => {
  return (
    <>
      <Router>
        <Switch>
          <PrivateRoute exact path="/">
            <Dashboard />
          </PrivateRoute>
          <PublicRoute path="/login">
            <Login />
          </PublicRoute>
          <PublicRoute exact path="/topics_user">
            <Topics />
          </PublicRoute>
          <AdminRoute exact path="/topics">
            <CrudTopics />
          </AdminRoute>
          <AdminRoute path="/topics/:id">
            <SearchByTopic />
          </AdminRoute>
          <PublicRoute path = "/result">
            <Result/>
          </PublicRoute>
          <PublicRoute>
            <div>Error 404</div>
          </PublicRoute>
        </Switch>
      </Router>
    </>
  );
};

export { Route };
