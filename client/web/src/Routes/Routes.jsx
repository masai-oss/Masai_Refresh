import React from "react";
import { Route as PublicRoute, Switch } from "react-router-dom";
import { PrivateRoute } from "./PrivateRoute";
import { AdminRoute } from "./AdminRoute";
import { Login } from "../Structure/Authentication";
import { Dashboard } from "../Structure/Dashboard";
import { DashboardNew } from "../Structure/DashboardNew/DashboardNew";
import {
  Questions as AdminQuestions,
  QuestionForm,
  QuestionUpdate,
} from "../Structure/Admin";
import { Topics } from "../Structure/Topics";
import { CrudTopics } from "../Structure/Admin";
import { Questions } from "../Structure/Questions";
import { Results_display } from "../Structure/Results Display";
import { PageNotFound } from "../Structure/Common/PageNotFound";

const Routes = () => {
  return (
    <>
      <Switch>
        {/* all private routes here */}
        <PrivateRoute exact path="/" component={Dashboard} />
        <PrivateRoute exact path="/new-dashboard" component={DashboardNew} />
        <PrivateRoute exact path="/quiz_topics" component={Topics} />
        <PrivateRoute exact path="/quiz_questions" component={Questions} />

        <PrivateRoute
          exact
          path="/results_display"
          component={Results_display}
        />

        {/* all admin routes here */}
        <AdminRoute
          exact
          path="/admin/questions/:topic"
          component={AdminQuestions}
        />
        <AdminRoute
          exact
          path="/admin/questions/add"
          component={QuestionForm}
        />
        <AdminRoute
          exact
          path="/admin/questions/edit/:topic/:id"
          component={QuestionUpdate}
        />
        <AdminRoute exact path="/admin/topics" component={CrudTopics} />

        {/* all public routes here */}
        <PublicRoute path="/login" component={Login} />
        <PublicRoute>
          <PageNotFound
            errorNum="404"
            message="Page Not Found"
            des="Sorry but the page you are looking for does not exist"
          />
        </PublicRoute>
      </Switch>
    </>
  );
};

export { Routes };
