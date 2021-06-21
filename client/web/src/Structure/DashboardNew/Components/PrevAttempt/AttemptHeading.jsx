import React from "react";
import "../../Styles/AttemptHeading.css";

const AttemptHeading = () => {
  return (
    <div>
      <div className="attempt-headingCard">Previous Attempt</div>
      <div className="attempt-heading__dateCard">Date</div>
      <div className="attempt-heading__correctCard">Correct</div>
      <div className="attempt-heading__wrongCard">Incorrect</div>
      <div className="attempt-heading__skippedCard">Skipped</div>
    </div>
  );
};
export default AttemptHeading;
