import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuid } from "uuid";
import { getQuestions } from "./State/actions";
import MCQ from "./QuestionTypes/MCQ";
import ShortQuestion from "./QuestionTypes/ShortQuestion";
import TrueFalseQuestion from "./QuestionTypes/TrueFalseQuestion";

function Questions() {
  const dispatch = useDispatch();
  let payload = {
    questionNo: 1,
    topic: "javascript",
    topicId: "1232",
  };

  const getQuestionsReq = () => {
    dispatch(getQuestions(payload));
  };

  const [answerSubmitted, setAnswerSubmitted] = useState("");

  const { question } = useSelector((state) => state.practise);
  const [questionNo, setQuestionNo] = useState(1);

  const incrementQue = () => {
    setQuestionNo((prev) => prev + 1);
    payload.questionNo = questionNo + 1;
    payload.answer = answerSubmitted;
    payload.questionId = question.id;
    payload.quizId = "werfg34567";
    payload.type = question.type;
    dispatch(getNextQuestion(payload));
  };

  let index = questionNo - 1,
    pages = 4;

  const givenAnswer = (e) => {
    setAnswerSubmitted(e.target.value);
  };

  return (
    <div>
      <button onClick={getQuestionsReq}>Get Questions</button>
      {question !== "undefined" && question?.type == "SHORT" ? (
        <ShortQuestion
          data={question}
          key={uuid()}
          answering={givenAnswer}
          answer={answerSubmitted}
        />
      ) : question?.type == "TF" ? (
        <TrueFalseQuestion
          data={question}
          key={uuid()}
          answering={givenAnswer}
          answer={answerSubmitted}
        />
      ) : question?.type == "MCQ" ? (
        <MCQ
          data={question}
          key={uuid()}
          answering={givenAnswer}
          answer={answerSubmitted}
        />
      ) : null}
      {question && (
        <button
          onClick={incrementQue}
          disabled={index === pages ? true : false}
        >
          Next
        </button>
      )}
    </div>
  );
}

export default Questions;