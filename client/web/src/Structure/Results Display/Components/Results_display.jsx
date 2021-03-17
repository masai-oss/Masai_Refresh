import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import {
  OutcomeTag,
  QuestionLine,
  QuestionMain,
  QuestionWrapper,
  ResultWrapper,
  Score,
  Result,
  Correct,
  Wrong,
  Skipped,
  ButtonWrapper,
  QuestionContent,
  Span,
} from "../Styles/ResultsPageStyle";

const Results_display = () => {
  const { result, isError } = useSelector((state) => state.resultReducer);
  let history = useHistory();

  useEffect(() => {
    if (isError) {
      history.push("/quiz_topics");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [toggleSol, setToggleSol] = useState(false);
  const [toggleExplanation, setToggleExplanation] = useState(false);
  
  const correctSol = result.filter((answer) => answer.outcome == "CORRECT").length;
  const wrongSol = result.filter((answer) => answer.outcome == "WRONG").length;
  const skippedSol = result.filter((answer) => answer.outcome == "SKIPPED").length;

  const explainToggle = (index) => {
    setToggleExplanation((prev) =>
      Boolean(!prev[index])
        ? { ...prev, [index]: true }
        : { ...prev, [index]: false }
    );
  };

  return (
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
                      {index + 1 + '. ' + question.statement}
                  </QuestionContent>
                </QuestionMain>
                <p>
                  <Span>Your response:</Span>{" "}
                  <p>
                    {question.response === "skipped"
                      ? "-- DID NOT ATTEMPT --"
                      : question.response}
                  </p>
                </p>
                <p>
                  <Span>Correct Answer:</Span>
                  <p>{question.correct}</p>
                </p>
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
