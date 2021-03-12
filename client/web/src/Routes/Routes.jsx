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
import { Questions as AdminQuestions } from '../Structure/Admin'
import { Topics } from "../Structure/Topics";
import { CrudTopics, SearchByTopic } from "../Structure/Admin";
import { Questions } from "../Structure/Questions/Components/Questions";
import { Results_display } from "../Structure/Results Display";

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
          <AdminRoute exact path="/questions_admin" >
            <AdminQuestions />
          </AdminRoute>
          <PrivateRoute exact path="/topics_user">
            <Topics />
          </PrivateRoute>
          <PrivateRoute exact path="/questions">
            <Questions />
          </PrivateRoute>
          <PrivateRoute exact path="/results_display">
            <Results_display />
          </PrivateRoute>
          <AdminRoute exact path="/topics">
            <CrudTopics />
          </AdminRoute>
          <AdminRoute path="/topics/:id">
            <SearchByTopic />
          </AdminRoute>
          <PublicRoute>
            <div>Error 404</div>
          </PublicRoute>
        </Switch>
      </Router>
    </>
  );
};

export { Route };
