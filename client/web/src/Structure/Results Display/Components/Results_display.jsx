import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Button } from "@material-ui/core";
import {
  OutcomeTag,
  QuestionLine,
  QuestionMain,
  QuestionWrapper,
  ResultWrapper,
  Score,
  Result,
  ButtonWrapper,
  QuestionContent,
  Span,
} from "../Styles/ResultsPageStyle";
import { IsLoading } from "../../Common";

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

  const [toggleSol, setToggleSol] = useState(false);
  const [toggleExplanation, setToggleExplanation] = useState(false);

  const correctSol =
    result && result.filter((answer) => answer.outcome === "CORRECT").length;
  const wrongSol =
    result && result.filter((answer) => answer.outcome === "WRONG").length;
  const skippedSol =
    result && result.filter((answer) => answer.outcome === "SKIPPED").length;

  const explainToggle = (index) => {
    setToggleExplanation((prev) =>
      Boolean(!prev[index])
        ? { ...prev, [index]: true }
        : { ...prev, [index]: false }
    );
  };

  return isLoading ? (
    <IsLoading />
  ) : isError ? (
    <div>Something went wrong</div>
  ) : (
    result && (
      <ResultWrapper>
        <Score>
          {correctSol}/{result.length}
        </Score>
        <Result>
          <h3>SUMMARY</h3>
          <table>
            <tbody>
              <tr className="correct">
                <td>Correct</td>
                <td>: {correctSol}</td>
              </tr>
              <tr className="wrong">
                <td>Wrong</td>
                <td>: {wrongSol}</td>
              </tr>
              <tr className="skipped">
                <td>Skipped</td>
                <td>: {skippedSol}</td>
              </tr>
            </tbody>
          </table>
        </Result>
        <ButtonWrapper>
          <Button
            onClick={() => setToggleSol((prev) => !prev)}
            variant="contained"
            color="secondary"
            style={{ justifyContent: "center" }}
          >
            {toggleSol ? "Hide Detailed Report" : "Show Detailed Report"}
          </Button>
        </ButtonWrapper>
        {toggleSol
          ? result.map((question, index) => (
              <QuestionWrapper key={index}>
                <QuestionMain>
                  <QuestionLine />
                  <QuestionContent>
                    {index + 1 + ". " + question.statement}
                  </QuestionContent>
                </QuestionMain>
                <div>
                  <Span>Your response:</Span>{" "}
                  <p>
                    {question.response === "skipped"
                      ? "-- DID NOT ATTEMPT --"
                      : question.response}
                  </p>
                </div>
                <div>
                  <Span>Correct Answer:</Span>
                  <p>{question.correct}</p>
                </div>
                <p>
                  <Span>Outcome:</Span>
                  <OutcomeTag outcome={question.outcome}>
                    {question.outcome}
                  </OutcomeTag>
                </p>
                <ButtonWrapper>
                  <Button
                    onClick={() => explainToggle(index)}
                    variant="contained"
                    color="primary"
                  >
                    {toggleExplanation[index]
                      ? "Hide Explanation"
                      : "Show Explanation"}
                  </Button>
                </ButtonWrapper>
                {toggleExplanation[index] ? (
                  <p>{question.explanation}</p>
                ) : null}
              </QuestionWrapper>
            ))
          : null}
      </ResultWrapper>
    )
  );
};

export { Results_display };
