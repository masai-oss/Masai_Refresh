import React from "react";
import "../../Styles/DetailBodySection.css";
import { SyntaxHighlight } from "../../../Common/SyntaxHighlighter";
import { ReportDialogLong } from "../../../Common/DialogBoxes/ReportModalLong";
import { a11yLight } from "react-syntax-highlighter/dist/esm/styles/hljs";
import ReactMarkdown from "react-markdown";
const DetailBodySection = ({ ele, index }) => {
  const handleClickSource = () => {
    window.open(`${ele.source}`, "_blank");
  };

  const cleanText = (text) => {
    let cleanedText = "";
    for (let i = 0; i < text.length; ) {
      if (text.charCodeAt(i) == 10 && text.charCodeAt(i + 1) == 10) {
        cleanedText += text[i] + text[i + 1] + "\t";
        i += 2;
      } else if (text.charCodeAt(i) == 10) {
        cleanedText += text[i] + "\t";
        i++;
      } else {
        cleanedText += text[i];
        i++;
      }
    }

    return cleanedText;
  };
  return (
    <div className="detail-bodysection__container">
      <div className="detailBodySectionNew">
        <ReactMarkdown renderers={{ code: SyntaxHighlight }}>
          {`${`Q${index + 1}. ` + cleanText(ele.statement)}`}
        </ReactMarkdown>
        {/* <SyntaxHighlight value={ele.statement} style={a11yLight} /> */}
      </div>
      <div className="detail-section__youranswer">
        <p className="detail-section__highlighter">Your Answer</p>
        <p className="detail-section_myans  detail-section__style">
          {/* my answer */}
          {ele.response !== "skipped"
            ? `${ele.response}`
            : "You Skipped this Question"}
        </p>
      </div>
      <div className="correct-answer__report">
        <p className="detail-section__highlighter">Correct Answer</p>
        <p className="detail-section_myans  detail-section__style">
          {ele.correct}
        </p>
      </div>
      <h4 className="detailed-report__h4">Explanation</h4>
      <div className="detailed-report__explain  detail-section__style">
        {ele.explanation !== "" ? `${ele.explanation}` : "N/A"}
      </div>
      <div
        className="detail-section__source"
        onClick={handleClickSource}
      >{`Source : ${ele.source.slice(8)}`}</div>
      <div className="detail-section__reportsvgbox">
        <ReportDialogLong question_id={ele.question_id} statement={0} />
      </div>
      <hr className="detail-section__hr" />
    </div>
  );
};

export default DetailBodySection;
