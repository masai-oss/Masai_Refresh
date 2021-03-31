import React from "react";
import styled from "styled-components";
import ReportDialog from "../../Common/DialogBoxes/ReportDialog";

const Wrapper = styled.section`
  padding: 2em;
  border: 1px solid grey;
  margin: 2em 0;
  text-align: left;
  background: #ffffff;
  box-shadow: 0px 0px 1px 1px rgba(0, 0, 0, 0.25);
  border-radius: 2px;
`;

const Para = styled.p`
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 150%; ;
`;

const Response = styled.div`
  display: flex;
  padding-right: 2em;
  justify-content: flex-start;

  & > div > p:nth-child(1) {
    font-weight: bold;
  }

  & > div {
    margin-right: 2em;
  }
`;

// const Link = styled.a`
//   font-style: normal;
//   font-weight: normal;
//   font-size: 16px;
//   line-height: 150%;
//   text-decoration-line: underline;
//   color: #6c8d9e;
// `;

function DetailedReport({ index, details }) {
  const { statement, correct, response, explanation, question_id } = details;
  return (
    <Wrapper>
      <Para>
        <b>Question {index + 1}</b> : {statement}
      </Para>
      <Response>
        <div>
          <Para>Your Response</Para>
          <Para>{response}</Para>
        </div>
        <div>
          <Para>Correct Response</Para>
          <Para>{correct}</Para>
        </div>
      </Response>
      <Para>
        <b>Explanation</b>
      </Para>
      <Para>
        Question {index + 1} : {explanation}
      </Para>
      <ReportDialog question_id={question_id} customMargin="0" />
    </Wrapper>
  );
}

export { DetailedReport };
