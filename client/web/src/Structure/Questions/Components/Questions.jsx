import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuid } from "uuid";
import { getQuestions } from "../State/actions";
import MCQ from "./QuestionTypes/MCQ";
import ShortQuestion from "./QuestionTypes/ShortQuestion";
import TrueFalseQuestion from "./QuestionTypes/TrueFalseQuestion";

function Questions() {
  const dispatch = useDispatch();

  const getQuestionsReq = () => {
    dispatch(getQuestions());
  };

  const { questions } = useSelector((state) => state.practise);
  const [questionNo, setQuestionNo] = useState(1);
  let question = questions.find((item, index) => index === questionNo - 1);
  const incrementQue = () => {
    setQuestionNo((prev) => prev + 1);
  };
  const decrementQue = () => {
    setQuestionNo((prev) => prev - 1);
  };
  console.log(questions, "type");

  let index = questionNo - 1,
    pages = questions.length - 1;

  return (
    <div>
      <button onClick={getQuestionsReq}>Get Questions</button>
      {question !== "undefined" && question?.type == "SHORT" ? (
        <ShortQuestion data={question} key={uuid()} />
      ) : question?.type == "TF" ? (
        <TrueFalseQuestion data={question} key={uuid()} />
      ) : question?.type == "MCQ" ? (
        <MCQ data={question} key={uuid()} />
      ) : null}
      {question && (
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <button onClick={decrementQue} disabled={index === 0 ? true : false}>
            Prev
          </button>
          <button
            onClick={incrementQue}
            disabled={index === pages ? true : false}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export { Questions }