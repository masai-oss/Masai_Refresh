import React from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { getParam } from "../../Utils/paramHelper";
import { MCQ } from "./Components/MCQType";
import { QuestionStyles } from "./Styles/QuestionStyles";
import { Spinner, PageNotFound } from "../Common";

const Questions = () => {
  const { question, isLoading, isError } = useSelector(
    (state) => state.questions,
    shallowEqual
  );
  const classes = QuestionStyles();
  let search = window.location.search;
  const attempt_id = getParam("attempt_id", undefined, search);
  const submission_id = getParam("submission_id", undefined, search);
  const question_id = getParam("question_id", undefined, search);
  const topic = getParam("topic", undefined, search);

  let props = {
    attempt_id,
    submission_id,
    question_id,
    topic,
  };

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : isError ? (
        <PageNotFound
          errorNum="400"
          message="Something went wrong"
          des=" Brace Yourself till we get the error fixed"
        />
      ) : question !== null ? (
        <div className={classes.main}>
          <div>
            {question.type === "MCQ" ? <MCQ {...props} /> : "Questions"}
          </div>
        </div>
      ) : (
        <Redirect to="/quiz_topics" />
      )}
    </>
  );
};

export { Questions };
