import React from "react";
import { useSelector } from "react-redux";
import { nextQuestion } from "../State/action";
import { MCQ } from "./MCQ";

const Questions = () => {
  const { question } = useSelector((state) => state.questions);
  const { questions } = useSelector((state) => state.topics);
  const lastQuestion = questions[questions.length-1]
  return (
    <div>{question.type === "MCQ" ? <MCQ data={question} lastQuestion={lastQuestion} /> : "Questions"}</div>
  );
};

export { Questions };
