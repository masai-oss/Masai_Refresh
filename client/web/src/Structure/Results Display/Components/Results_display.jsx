import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from 'react-router-dom'
import ReactMarkdown from "react-markdown";
import { SyntaxHighlight } from "../../Common/SyntaxHighlighter";
import { OutcomeTag, QuestionLine, QuestionMain, QuestionWrapper, ResultWrapper } from '../Styles/ResultsPageStyle'


const Results_display = () => {
  const { result, isError } = useSelector((state) => state.resultReducer);
  let history = useHistory()

  useEffect(() => {
    if(isError){
      history.push("/quiz_topics");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    result &&
    <ResultWrapper>
      {result.map((question, index) => (
        <QuestionWrapper key={index}>
          <QuestionMain>
            <QuestionLine />
            <ReactMarkdown renderers={{ code: SyntaxHighlight }}>
              {index + 1 + '. ' + question.statement}
            </ReactMarkdown> 
          </QuestionMain>
          <p>Your response: <ReactMarkdown>{question.response === 'skipped' ? '-- DID NOT ATTEMPT --' : question.response}</ReactMarkdown></p>
          <p>Correct Answer: <ReactMarkdown>{question.correct}</ReactMarkdown></p>
          <p>Outcome: <OutcomeTag outcome={question.outcome}>{question.outcome}</OutcomeTag></p>
        </QuestionWrapper>
      ))}
    </ResultWrapper>
  );
};

export { Results_display };
