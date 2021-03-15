import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { Redirect } from "react-router-dom";
import { IsLoading } from "../Common/IsLoading";
import { TopicChip } from "../Common/TopicChip";
import { MCQ } from "./Components/MCQ";

const Questions = () => {
  const question = useSelector((state) => state.questions.question);
  const questionIds = useSelector((state) => state.topics.questionIds);
  const isLoading = useSelector((state) => state.questions.isLoading);
  const params = useParams();
  const topicDisplay = params.topic;
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
          <div style={{ display: "flex", justifyContent: "center" }}>
            <TopicChip topicDisplay={topicDisplay} />
          </div>
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
