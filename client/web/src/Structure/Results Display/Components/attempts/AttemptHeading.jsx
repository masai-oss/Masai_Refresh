import React from "react";
import "../../Styles/AttemptHeading.css";

const AttemptHeading = () => {
  return (
    <div>
      <div className="attempt-heading">Previous Attempt</div>
      <div className="attempt-heading__date">Date</div>
      <div className="attempt-heading__correct">Correct</div>
      <div className="attempt-heading__wrong">Incorrect</div>
      <div className="attempt-heading__skipped">Skipped</div>
    </div>
  );
};

export default AttemptHeading;
