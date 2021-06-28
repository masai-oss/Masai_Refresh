import React from "react";
import "../../Styles/SingleAttempt.css";

const SingleAttemptComponent = ({
  ele: { date, correct, incorrect, skipped, attempt_id },
  select,
  onClickDiv,
}) => {
  let classes =
    attempt_id === select
      ? "singleattempt__container select-attempt__container"
      : "singleattempt__container";

  return (
    <div className={classes} onClick={() => onClickDiv(attempt_id)}>
      <div className="singleattempt__container-date">{date.slice(0, 10)}</div>
      <div className="singleattempt__container-correct singleattempt_typography">
        {correct}
      </div>
      <div className="singleattempt__container-wrong singleattempt_typography">
        {incorrect}
      </div>
      <div className="singleattempt__container-skipped singleattempt_typography">
        {" "}
        {skipped}
      </div>
    </div>
  );
};

export default SingleAttemptComponent;
