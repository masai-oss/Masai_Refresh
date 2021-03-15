import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { Redirect } from "react-router-dom";
import { IsLoading } from "../Common/IsLoading";
import { TopicChip } from "../Common/TopicChip";
import { MCQ } from "./Components/MCQ";
import Card from "@material-ui/core/Card";
import { QuestionStyles } from "../Questions/Styles/QuestionStyles";
import CircularProgress from "@material-ui/core/CircularProgress";

const Questions = () => {
  const question = useSelector((state) => state.questions.question);
  const questionIds = useSelector((state) => state.topics.questionIds);
  const isLoading = useSelector((state) => state.questions.isLoading);
  const params = useParams();
  const topicDisplay = params.topic;
  const isError = useSelector((state) => state.questions.isError);
  const lastQuestion =
    questionIds !== null && questionIds[questionIds.length - 1];
  const classes = QuestionStyles();
  let queIndex = questionIds.indexOf(question.id);
  console.log(queIndex);

  return (
    <>
      {isLoading ? (
        <IsLoading />
      ) : isError ? (
        <div>...something went wrong</div>
      ) : question !== null ? (
        <Card className={classes.cardShadow}>
          <div className={classes.main}>
            <TopicChip
              topicDisplay={`${queIndex + 1} / ${questionIds.length}`}
            />
            <TopicChip topicDisplay={topicDisplay} />
            <TopicChip topicDisplay={question.type} />
          </div>
          {question.type === "MCQ" ? (
            <MCQ data={question} lastQuestion={lastQuestion} />
          ) : (
            "Questions"
          )}
        </Card>
      ) : (
        <Redirect to="/quiz_topics" />
      )}
    </>
  );
};

export { Questions };
