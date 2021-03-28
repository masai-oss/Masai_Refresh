import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { Redirect } from "react-router-dom";
import { IsLoading } from "../Common";
import { QuestionNavbar } from "../Common/QuestionNavbar";
import { MCQ } from "./Components/MCQ";
import Card from "@material-ui/core/Card";
import { QuestionStyles } from "../Questions/Styles/QuestionStyles";

const Questions = () => {
  // const question = useSelector((state) => state.questions.question);
  const question = { type: "MCQ", id: 0, statement: "My statement", options:[{text: "first"},{text: "second"}, {text: "third"}, {text: "fourth"}] }
  const questionIds = useSelector((state) => state.topics.questionIds);
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
      ) : !isError ? (
        <div>...something went wrong</div>
      ) : question !== null ? (
        <div className={classes.main}>
            <div className={classes.cardShadow}>
              <QuestionNavbar type={question.type} questionIds={questionIds} topicDisplay={topicDisplay} queIndex={queIndex} />
              {question.type === "MCQ" ? (
                <MCQ data={question} lastQuestion={lastQuestion} />
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
