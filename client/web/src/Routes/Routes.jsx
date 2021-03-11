import React from "react";
import {
  Route as PublicRoute,
  Switch,
  BrowserRouter as Router,
} from "react-router-dom";
import { PrivateRoute } from "./PrivateRoute";
import { Login } from "../Structure/Authentication";
import { Dashboard } from "../Structure/Dashboard";
import { CrudTopics, SearchByTopic } from "../Structure/Admin";
import { AdminRoute } from "./AdminRoute"
import {Result} from "../Structure/Result/Components/Result"

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
