import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { IsLoading } from "../Common/IsLoading";
import { MCQ } from "./Components/MCQ";

const Questions = () => {
  const question = useSelector((state) => state.questions.question);
  const questionIds = useSelector((state) => state.topics.questionIds);
  const isLoading = useSelector((state) => state.questions.isLoading);
  const isError = useSelector((state) => state.questions.isError);
  const lastQuestion =
    questionIds !== null && questionIds[questionIds.length - 1];
  return (
    <>
      {isLoading ? (
        <IsLoading />
      ) : isError ? (
        <div>...something went wrong</div>
      ) : question !== null ? (
        <div>
          {question.type === "MCQ" ? (
            <MCQ data={question} lastQuestion={lastQuestion} />
          ) : (
            "Questions"
          )}
        </div>
      ) : (
        <Redirect to="/quiz_topics" />
      )}
    </>
  );
};

export { Questions };
