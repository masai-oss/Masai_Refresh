import React from "react";
import "../../Styles/DetailedReport.css";
import StyleContainer from "../utils/StyleContainer";
import DetailBodySection from "./DetailBodySection";

const DetailedReport = () => {
  return (
    <>
      <StyleContainer className="detail-section__container">
        <div className="detail-head--section">
          <div className="detail-head__typography">Detailed Report</div>
        </div>
        <DetailBodySection />
      </StyleContainer>
    </>
  );
};

export default DetailedReport;
