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
import { Questions as AdminQuestions } from "../Structure/Admin";
import { Topics } from "../Structure/Topics";
import { CrudTopics, SearchByTopic } from "../Structure/Admin";
import { Questions } from "../Structure/Questions";

const Route = () => {
  return (
    <>
      <Router>
        <Switch>
          <PrivateRoute exact path="/" component={Dashboard} />
          <PublicRoute path="/login" component={Login} />
          <PrivateRoute exact path="/quiz_topics" component={Topics} />
          <PrivateRoute exact path="/quiz_questions" component={Questions} />
          <AdminRoute
            exact
            path="/questions_admin"
            component={AdminQuestions}
          />
          <AdminRoute exact path="/topics" component={CrudTopics} />
          <AdminRoute path="/topics/:id" component={SearchByTopic} />
          <PublicRoute>
            <div>Error 404</div>
          </PublicRoute>
        </Switch>
      </Router>
    </>
  );
};

export { Route };
