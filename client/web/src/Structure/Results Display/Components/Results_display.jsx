import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { DetailedReport } from "../";
import { ResultWrapper, Result, Button } from "../Styles/ResultsPageStyle";
import {
  Spinner,
  PageNotFound,
  QuestionNavbar,
  DotsDis,
} from "../../Common";

const Results_display = () => {
  const result = useSelector((state) => state.resultReducer.result);
  const isError = useSelector((state) => state.resultReducer.isError);
  const isLoading = useSelector((state) => state.resultReducer.isLoading);
  const question = useSelector((state) => state.questions.question);
  const topic = useSelector((state) => state.questions.topic);
  // const type = useSelector((state) => state.questions.type);
  let history = useHistory();

  const goBackToHome = () => {
    history.replace("quiz_topics");
  };

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
    <Spinner />
  ) : isError ? (
      <PageNotFound errorNum="400" message="Something went wrong" />
    ) : (
    result && (
      <>
        <Button onClick={goBackToHome}>Go To Home Page</Button>
        <ResultWrapper>
          <QuestionNavbar topicDisplay={topic} type={question.type} />
          <Result>
            <h3 className="bigText correct">Quiz Completed</h3>
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
            <h3 style={{ marginTop: "50px" }}>Detailed Report</h3>
            {result &&
              result.map((details, index) => (
                <DetailedReport key={index} index={index} details={details} />
              ))}
          </Result>
        </ResultWrapper>
        <DotsDis />
      </>
    )
  );
};

export { Results_display };
