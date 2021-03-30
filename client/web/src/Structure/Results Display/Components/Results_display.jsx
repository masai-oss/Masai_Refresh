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
        <QuestionNavbar topicDisplay={"provide topic"} type={"provide type"} />
        <Result>
          <h3 className="bigText correct">
            Quiz Completed
          </h3>
          <p className="normalText">
            Total Questions Attempted: {result.length}
          </p>
          <div className="attempts">
            <div className="attemptsItem">
              <p className="bigText correct">Correct</p>
              <p>{correctSol}</p>
            </div>
            <div className="attemptsItem">
              <p className="bigText wrong">Wrong</p>
              <p>{wrongSol}</p>
            </div>
            <div className="attemptsItem">
              <p className="bigText skipped">Skipped</p>
              <p>{skippedSol}</p>
            </div>
          </div>
          {
          result && result.map((details,index) => {
          return <DetailedReport key={index} index={index} details ={details}/>
            })
          }
        </Result>
      </ResultWrapper>
    )
  );
};

export { Results_display };
