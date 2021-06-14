import React from "react";
import StyleContainer from "../utils/StyleContainer";
import styles from "../../Styles/ReportChart.module.css";
import ReportGraph from "./ReportGraph";

const ReportChart = (props) => {
  return (
    <StyleContainer className={styles.reportchart__container}>
      <div className={styles.reportchart__totalquestion}>5</div>
      <div className={styles.reportchart__attempted}>Question Attempted</div>
      <hr className={styles.reporttotalquestion__hr} />
      <ReportGraph chart_value={props.chart_value} />
      <div className={styles.reportchart__testbutton}>
        <div className={styles.reportchart__testbutton_title}>
          Take a new test
        </div>
      </div>
    </StyleContainer>
  );
};

export default ReportChart;
