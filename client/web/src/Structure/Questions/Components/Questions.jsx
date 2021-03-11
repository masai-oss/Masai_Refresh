import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { nextQuestion } from "../State/action";
import { MCQ } from "./MCQ";

const Questions=()=> {
    const dispatch = useDispatch()
  const { question } = useSelector((state) => state.questions);
    const { attemptId, submissionId } = useSelector(state => state.topics)
    
    const getNextQuestion = () => {
    dispatch(nextQuestion({attemptId,submissionId}))
}
  return (
    <div>
      {question.type === "MCQ" ? <MCQ data={question} /> : "Questions"}
      <button onClick={getNextQuestion}>Next</button>
    </div>
  );
}

export { Questions }
