import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { Redirect } from "react-router-dom";
import { IsLoading } from "../Common";
import { MCQ } from "./Components/MCQ";
import { QuestionStyles } from "../Questions/Styles/QuestionStyles";

const Questions = () => {
  const question = useSelector((state) => state.questions.question);
  const questionIds = useSelector((state) => state.questions.questionIds);
  const isLoading = useSelector((state) => state.questions.isLoading);
  const params = useParams();
  const topicDisplay = params.topic;
  const isError = useSelector((state) => state.questions.isError);
  const lastQuestion = questionIds !== null && questionIds[questionIds.length - 1];
  const classes = QuestionStyles();
  let queIndex = questionIds.indexOf(question?.id);

  return (
    <>
      {isLoading ? (
        <IsLoading />
      ) : isError ? (
        <div>...something went wrong</div>
      ) : question !== null ? (
        <div className={classes.main}>
            <div>
              {question.type === "MCQ" ? (
                <MCQ data={question} queIndex={queIndex} questionIds={questionIds} topicDisplay={topicDisplay} lastQuestion={lastQuestion} />
              ) : (
                "Questions"
              )}
            </div>
        </div>
      ) : (
        <Redirect to="/quiz_topics" />
      )}
    </>
  );
};

export { Questions };
