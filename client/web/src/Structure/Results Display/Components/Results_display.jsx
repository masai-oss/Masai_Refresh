import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { SyntaxHighlight } from "../../Common/SyntaxHighlighter";
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
  Div,
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
  // eslint-disable-next-line eqeqeq
  const correctSol = result.filter((answer) => answer.outcome == "CORRECT").length;
  // eslint-disable-next-line eqeqeq
  const wrongSol = result.filter((answer) => answer.outcome == "WRONG").length;
  // eslint-disable-next-line eqeqeq
  const skippedSol = result.filter((answer) => answer.outcome == "SKIPPED").length;

  return (
    result && (
      <ResultWrapper>
        <Score>
          {correctSol}/{result.length}
        </Score>
        <Result>
          <Correct>Correct : {correctSol}</Correct>
          <Wrong>Wrong : {wrongSol}</Wrong>
          <Skipped>Skipped : {skippedSol}</Skipped>
        </Result>
        <Div>
          <Button
            onClick={() => setToggleSol((prev) => !prev)}
            variant="contained"
            color="secondary"
            style={{ justifyContent: "center" }}
          >
            {toggleSol ? "Hide Detailed Report" : "Show Detailed Report"}
          </Button>
        </Div>
        {toggleSol
          ? result.map((question, index) => (
              <QuestionWrapper key={index}>
                <QuestionMain>
                  <QuestionLine />
                  <ReactMarkdown renderers={{ code: SyntaxHighlight }}>
                    {index + 1 + ". " + question.statement}
                  </ReactMarkdown>
                </QuestionMain>
                <p>
                  Your response:{" "}
                  <ReactMarkdown>
                    {question.response === "skipped"
                      ? "-- DID NOT ATTEMPT --"
                      : question.response}
                  </ReactMarkdown>
                </p>
                <p>
                  Correct Answer:{" "}
                  <ReactMarkdown>{question.correct}</ReactMarkdown>
                </p>
                <p>
                  Outcome:{" "}
                  <OutcomeTag outcome={question.outcome}>
                    {question.outcome}
                  </OutcomeTag>
                </p>
              </QuestionWrapper>
            ))
          : null}
      </ResultWrapper>
    )
  );
};

export { Results_display };
