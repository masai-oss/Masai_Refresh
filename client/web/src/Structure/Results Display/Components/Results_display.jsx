import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { IsLoading } from "../../Common";
import {DetailedReport} from "../"
import {
  ResultWrapper,
  Result,
} from "../Styles/ResultsPageStyle";
import { QuestionNavbar } from '../../Common/QuestionNavbar'

const Results_display = () => {
  const result = useSelector((state) => state.resultReducer.result);
  const isError = useSelector((state) => state.resultReducer.isError);
  const isLoading = useSelector((state) => state.resultReducer.isLoading);
  const question = useSelector((state) => state.questions.question);
  const topic = useSelector((state) => state.questions.topic);
  const type = useSelector((state) => state.questions.type);
  let history = useHistory();

  useEffect(() => {
    if (isError) {
      history.push("/quiz_topics");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const correctSol =
    result && result.filter((answer) => answer.outcome === "CORRECT").length;
  const wrongSol =
    result && result.filter((answer) => answer.outcome === "WRONG").length;
  const skippedSol =
    result && result.filter((answer) => answer.outcome === "SKIPPED").length;

  return isLoading ? (
    <IsLoading />
  ) : isError ? (
    <div>Something went wrong</div>
  ) : (
    result && (
      <ResultWrapper>
        <QuestionNavbar topicDisplay={topic} type={question.type} />
        <Result>
          <h3 className="bigText correct">
            Quiz Completed
          </h3>
          <p className="normalText">
            Total Questions: <b>{result.length}</b>
          </p>
          <div className="attempts">
            <div className="attemptsItem">
              <p className="bigText correct">Correct</p>
              <b>{correctSol}</b>
            </div>
            <div className="attemptsItem">
              <p className="bigText wrong">Wrong</p>
              <b>{wrongSol}</b>
            </div>
            <div className="attemptsItem">
              <p className="bigText skipped">Skipped</p>
              <b>{skippedSol}</b>
            </div>
          </div>
          <h3 style={{marginTop: '50px'}}>Detailed Report</h3>
          { result && result.map((details,index) =>  <DetailedReport key={index} index={index} details={details} /> )}
        </Result>
      </ResultWrapper>
    )
  );
};

export { Results_display };
