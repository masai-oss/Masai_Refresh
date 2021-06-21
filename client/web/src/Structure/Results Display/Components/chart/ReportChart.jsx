import React from "react";
import StyleContainer from "../utils/StyleContainer";
import styles from "../../Styles/ReportChart.module.css";
import ReportGraph from "./ReportGraph";
import { useHistory } from "react-router-dom";

const ReportChart = (props) => {
  let history = useHistory();
  const goBackToHome = () => {
    history.replace("quiz_topics");
  };
  return (
    <StyleContainer className={styles.reportchart__container}>
      <div className={styles.reportchart__totalquestion}>5</div>
      <div className={styles.reportchart__attempted}>Question Attempted</div>
      <hr className={styles.reporttotalquestion__hr} />
      <ReportGraph chart_value={props.chart_value} />
      <div className={styles.reportchart__testbutton}>
        <div
          className={styles.reportchart__testbutton_title}
          onClick={goBackToHome}
        >
          Take a new test
        </div>
      </div>
    </StyleContainer>
  );
};

export default ReportChart;
