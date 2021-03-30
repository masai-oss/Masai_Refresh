import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Button } from "@material-ui/core";
import { ModalReport } from "./ModalReport";
import { IsLoading } from "../../Common";
import {DetailedReport} from "../"
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

const Results_display = () => {
  // const result = useSelector((state) => state.resultReducer.result);
  const isError = useSelector((state) => state.resultReducer.isError);
  const isLoading = useSelector((state) => state.resultReducer.isLoading);
  const result = [
    {
      statement : "First of the Questions",
      outcome : "correct",
      correct : "The answer is xyz",
      response : "Your response is xyz",
      explanation : "xyz are the last 3 characters of the English Alphabet"
    },
    {
      statement : "Second of the Questions",
      outcome : "wrong",
      correct : "The answer is abc",
      response : "Your response is xyz",
      explanation : "abc are the first 3 characters of the English Alphabet"
    },
    {
      statement : "Third of the Questions",
      outcome : "skipped",
      correct : "The answer is def",
      response : "You Skipped",
      explanation : "def are the second triplets or 3 characters of the English Alphabet"
    }
  ]

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
        {
        result && result.map((details,index) => {
        return <DetailedReport key={index} index={index} details ={details}/>
          })
        }
      </ResultWrapper>
    )
  );
};

export { Results_display };
