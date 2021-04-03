import React from "react";
import ReportDialog from "../../Common/DialogBoxes/ReportDialog";
import ReactMarkdown from "react-markdown";
import { SyntaxHighlight } from "../../Common/SyntaxHighlighter";
import { modalStyles } from "../Styles/ModalStyles";
import {
  Wrapper,
  Para,
  MyResponse,
  CorrectResponse,
  Outcome,
  Response,
} from "../Styles/DetailedReportStyles";

const DetailedReport = ({ index, details }) => {
  const classes = modalStyles();

  const {
    statement,
    correct,
    response,
    explanation,
    question_id,
    source,
  } = details;

  const handleClickSource = () => {
    window.open(`${source}`, "_blank");
  };
  return (
    <Wrapper>
      <pre>
        <ReactMarkdown renderers={{ code: SyntaxHighlight }}>
          {`Question ${index + 1}) : ${statement}`}
        </ReactMarkdown>
      </pre>
      <Response>
        <div>
          <Para>Your Response</Para>
          <MyResponse
            correct={response !== "skipped" ? correct === response : "skipped"}
          >
            <p>{response}</p>
          </MyResponse>
        </div>
        <CorrectResponse>
          <Para>Correct Response</Para>
          <Para>{correct}</Para>
        </CorrectResponse>
        <Outcome>
          <Para>Outcome</Para>
          <Para>
            {response === "skipped" ? (
              <svg
                width="16"
                height="16"
                viewBox="0 0 41 25"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
              >
                <path
                  d="M39.9 12.9C39.1 12.2 37.9 12.2 37.1 12.9L32.4 17.6C31.6 9.6 25.7 2.7 17.4 1.1 11.3-0.1 5 1.8 0.6 6.1 -0.2 6.9-0.2 8.2 0.6 9 1.4 9.8 2.6 9.8 3.4 9 6.9 5.6 11.8 4.1 16.6 5 23.2 6.3 27.8 11.8 28.4 18.1L23.2 12.9C22.4 12.2 21.2 12.2 20.4 12.9 19.6 13.7 19.6 15 20.4 15.8L28.7 24.1C29.1 24.5 29.6 24.7 30.2 24.7 30.7 24.7 31.2 24.5 31.6 24.1L39.9 15.8C40.7 15 40.7 13.7 39.9 12.9Z"
                  fill="#EFAC00"
                />
              </svg>
            ) : correct === response ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 417.8 417"
              >
                <path
                  xmlns="http://www.w3.org/2000/svg"
                  d="m160 318.6c-4 4-9.4 6.3-15.1 6.3s-11.1-2.2-15.1-6.2l-120.4-120.5c-12.5-12.5-12.5-32.8 0-45.2l15.1-15.1c12.5-12.5 32.8-12.5 45.3 0l75.2 75.2 203.2-203.2c12.5-12.5 32.8-12.5 45.3 0l15.1 15.1c12.5 12.5 12.5 32.8 0 45.2zm0 0"
                  data-original="#000000"
                  fill="#04a91e"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                xmlnsSvgjs="http://svgjs.com/svgjs"
                width="16"
                height="16"
                viewBox="0 0 208.9 208.9"
                xmlSpace="preserve"
              >
                <path
                  xmlns="http://www.w3.org/2000/svg"
                  d="M0 170l65.6-65.6L0 38.9 38.9 0l65.6 65.6L170 0l38.9 38.9 -65.6 65.6L208.9 170 170 208.9l-65.6-65.6 -65.6 65.6L0 170z"
                  data-original="#000000"
                  fill="#da0909"
                />
              </svg>
            )}
          </Para>
        </Outcome>
      </Response>
      <Para>
        <b>Explanation</b>
      </Para>
      <Para>
        Question {index + 1} : {explanation}
      </Para>
      <ReportDialog question_id={question_id} customMargin="0" />
      <div className={classes.sourceURL} onClick={handleClickSource}>
        Source of the Question
      </div>
    </Wrapper>
  );
}

export { DetailedReport };
