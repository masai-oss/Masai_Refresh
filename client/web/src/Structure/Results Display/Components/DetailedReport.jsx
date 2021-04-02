import { green } from "@material-ui/core/colors";
import React from "react";
import styled from "styled-components";
import ReportDialog from "../../Common/DialogBoxes/ReportDialog";
// import ReactMarkdown from "react-markdown";
import ReactMarkdown from 'react-markdown'
import { SyntaxHighlight } from "../../Common/SyntaxHighlighter";

const Wrapper = styled.section`
  padding: 2em;
  border: 1px solid grey;
  margin: 2em 0;
  text-align: left;
  background: #ffffff;
  box-shadow: 0px 0px 1px 1px rgba(0, 0, 0, 0.25);
  border-radius: 2px;

  & pre{
    white-space: pre-wrap;
    height: 100%;
    width: 100%;
    word-wrap: break-word
  }
`;

const Para = styled.p`
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 150%;
`;

const MyResponse = styled.div`
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 150%;
  display: flex;
  align-items: center;

  & p{
    color: ${props => props.correct ? 'green' : 'red'};
    padding-left: 5px;
  }
`;

const Response = styled.div`
  display: flex;
  padding-right: 2em;
  justify-content: flex-start;

  @media (max-width: 530px) {
    flex-direction: column;
  }

  & > div > p:nth-child(1) {
    font-weight: bold;
  }

  & > div {
    margin-right: 2em;
  }
`;

function DetailedReport({ index, details }) {
  const { statement, correct, response, explanation, question_id } = details;
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
        <MyResponse correct={ correct === response }>
        { correct === response ? <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 417.8 417"><path xmlns="http://www.w3.org/2000/svg" d="m160 318.6c-4 4-9.4 6.3-15.1 6.3s-11.1-2.2-15.1-6.2l-120.4-120.5c-12.5-12.5-12.5-32.8 0-45.2l15.1-15.1c12.5-12.5 32.8-12.5 45.3 0l75.2 75.2 203.2-203.2c12.5-12.5 32.8-12.5 45.3 0l15.1 15.1c12.5 12.5 12.5 32.8 0 45.2zm0 0" data-original="#000000" fill="#04a91e"/></svg> :
            <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" xmlnsSvgjs="http://svgjs.com/svgjs" width="16" height="16" viewBox="0 0 208.9 208.9" xmlSpace="preserve">
            <path xmlns="http://www.w3.org/2000/svg" d="M0 170l65.6-65.6L0 38.9 38.9 0l65.6 65.6L170 0l38.9 38.9 -65.6 65.6L208.9 170 170 208.9l-65.6-65.6 -65.6 65.6L0 170z" data-original="#000000" fill="#da0909"/>
        </svg> }
          <p>{response}</p>
        </MyResponse>
      </div>
      <div>
        <Para>Correct Response</Para>
        <Para >{correct}</Para>
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