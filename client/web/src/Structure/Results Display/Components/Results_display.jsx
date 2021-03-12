import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from 'react-router-dom'
import ReactMarkdown from "react-markdown";


const Results_display = () => {
  const { result, isError } = useSelector((state) => state.resultReducer);
  let history = useHistory()

  useEffect(() => {
    if(isError){
      history.push('/topics_user')
    }
  }, [])

  return (
    result &&
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
