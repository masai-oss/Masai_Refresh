import React from "react";
import "../../Styles/DetailedReport.css";
import StyleContainer from "../utils/StyleContainer";
import DetailBodySection from "./DetailBodySection";

const DetailedReport = (props) => {
  return (
    <>
      <StyleContainer className="detail-section__container">
        <div className="detail-head--section">
          <div className="detail-head__typography">Detailed Report</div>
        </div>
        <div className="detail-body-section__scroll">
          {props.result.map((ele, index) => (
            <DetailBodySection ele={ele} key={index} index={index} />
          ))}
        </div>
      </StyleContainer>
    </>
  );
};

export default DetailedReport;
