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
import { Questions } from "../Structure/Questions";
import { Results_display } from "../Structure/Results Display";

const Route = () => {
  return (
    <>
      <Router>
        <Switch>
          <PrivateRoute exact path="/" component={Dashboard} />
          <PrivateRoute exact path="/quiz_topics" component={Topics} />
          <PrivateRoute exact path="/quiz_questions/:topic" component={Questions} />
          <PrivateRoute exact path="/results_display" component={Results_display} />
          <AdminRoute exact path="/questions_admin" component={AdminQuestions} />
          <AdminRoute exact path="/questions/add" component={QuestionForm} />
          <AdminRoute exact path="/questions/edit/:topic/:id" component={QuestionUpdate} />
          <AdminRoute exact path="/topics" component={CrudTopics} />
          <AdminRoute exact path="/topics/:id" component={SearchByTopic} />
          <PublicRoute path="/login" component={Login} />
          <PublicRoute>
            <div>Error 404</div>
          </PublicRoute>
        </Switch>
      </Router>
    </>
  );
};

export { Route };
