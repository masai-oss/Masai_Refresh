import React from "react";
import { useSelector } from "react-redux";
import ReactMarkdown from "react-markdown";


const Results_display = () => {
  const { result } = useSelector((state) => state.resultReducer);
  console.log(result);

  return (
    <div>
      {result.map((question, index) => (
        <div key={index}>
          <h4>
            {index + 1})<ReactMarkdown >{question.statement}</ReactMarkdown> 
          </h4>
          <h4>Your response: {question.response}</h4>
          <h4>Correct Answer: {question.correct}</h4>
          <h4>Outcome: {question.outcome}</h4>
        </div>
      ))}
    </div>
  );
};

export { Results_display };
