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
import { Questions as AdminQuestions, QuestionForm, QuestionUpdate } from '../Structure/Admin'
import { Topics } from "../Structure/Topics";
import { CrudTopics, SearchByTopic } from "../Structure/Admin";
import { Questions } from "../Structure/Questions/Components/Questions";

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
          <AdminRoute exact path="/questions/add" >
            <QuestionForm />
          </AdminRoute>
          <AdminRoute exact path="/questions/edit/:topic/:id" >
            <QuestionUpdate />
          </AdminRoute>
          <PrivateRoute exact path="/topics_user">
            <Topics />
          </PrivateRoute>
          <PrivateRoute exact path="/questions">
            <Questions />
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
