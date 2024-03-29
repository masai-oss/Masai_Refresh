import React from "react";
import { Route as PublicRoute, Switch } from "react-router-dom";
import { PrivateRoute } from "./PrivateRoute";
import { AdminRoute } from "./AdminRoute";
import { Login } from "../Structure/Authentication";
import { Dashboard } from "../Structure/Dashboard";
import { DashboardNew } from "../Structure/DashboardNew/DashboardNew";
import {
  Questions as QuizQuestions,
  PracticeQuestions,
  QuestionForm,
  QuestionUpdate,
} from "../Structure/Admin";
import { Topics } from "../Structure/Topics";
import { CrudTopics } from "../Structure/Admin";
import { Questions } from "../Structure/Questions";
import { Results_display } from "../Structure/Results Display";
import { PageNotFound } from "../Structure/Common/PageNotFound";
import { Practice } from "../Structure/Practice";

import LongType from "../Structure/Practice/Components/LongType";
import Completed from "../Structure/Practice/Components/Completed";
import { ViewPreviousAttempts } from "../Structure/DashboardNew/Components/ViewPreviousAttempts";
import { SingleQuestionBookmarkQuestion } from "../Structure/Practice/Components/SingleBookmarkQuestion";
import { SignIn } from "../Structure/Auth";
import { SignUp } from "../Structure/Auth/Components/SignUp";
import { OTPScreen } from "../Structure/Auth/Components/OTPScreen";
import { ResendOtp } from "../Structure/Auth/Components/ResendOtp";
import { ForgotPassword } from "../Structure/Auth/Components/ForgotPassword";
import { RecoverPasswordOtp } from "../Structure/Auth/Components/RecoverPasswordOtp";
import { CreateNewPassword } from "../Structure/Auth/Components/CreateNewPassword";

const Routes = () => {
  return (
    <>
      <Switch>
        {/* all private routes here */}
        <PrivateRoute exact path="/" component={Dashboard} />

        <PrivateRoute exact path="/old-dashboard" component={Topics} />
        <PrivateRoute exact path="/quiz_topics" component={DashboardNew} />

        <PrivateRoute exact path="/practice_topics" component={DashboardNew} />
        <PrivateRoute exact path="/my_bookmarks" component={DashboardNew} />
        <PrivateRoute
          exact
          path="/bookmarks/:topicId"
          component={DashboardNew}
        />
        <PrivateRoute
          exact
          path="/bookmarks/:topicID/:questionId"
          component={SingleQuestionBookmarkQuestion}
        />
        <PrivateRoute exact path="/quiz_questions" component={Questions} />

        <PrivateRoute
          exact
          path="/results_display"
          component={Results_display}
        />
        <PrivateRoute exact path="/practice_topics" component={Practice} />

        <PrivateRoute
          exact
          path="/practice_topics/individual_question/:topicID/:index"
          component={LongType}
        />
        <PrivateRoute
          exact
          path="/previous-attempts/:topicId/:topicName"
          component={ViewPreviousAttempts}
        />

        <PrivateRoute
          exact
          path="/practice_topics/completed"
          component={Completed}
        />

        {/* all admin routes here */}
        <AdminRoute
          exact
          path="/admin/questions/add"
          component={QuestionForm}
        />
        <AdminRoute
          exact
          path="/admin/questions/edit/:topic/:type/:id"
          component={QuestionUpdate}
        />
        <AdminRoute
          exact
          path="/admin/questions/:topic"
          component={QuizQuestions}
        />
        <AdminRoute
          exact
          path="/admin/practice_questions/:topic"
          component={PracticeQuestions}
        />
        <AdminRoute exact path="/admin/topics" component={CrudTopics} />

        {/* all public routes here */}
        <PublicRoute path="/login" component={SignIn} />

        <PublicRoute exact path="/sign-in" component={SignIn} />
        <PublicRoute exact path="/sign-up" component={SignUp} />
        <PublicRoute exact path="/verify-otp" component={OTPScreen} />
        <PublicRoute exact path="/resend-otp" component={ResendOtp} />

        <PublicRoute
          exact
          path="/recover-password"
          component={RecoverPasswordOtp}
        />

        <PublicRoute exact path="/forgot-password" component={ForgotPassword} />
        <PublicRoute
          exact
          path="/create-new-password"
          component={CreateNewPassword}
        />
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
