import React from "react";
import "../../Styles/SingleAttempt.css";

const SingleAttemptComponent = ({
  ele: { date, correct, wrong, skipped },
  index,
  select,
  onClickDiv,
}) => {
  let classes =
    index === select
      ? "singleattempt__container select-attempt__container"
      : "singleattempt__container";

  return (
    <div className={classes} onClick={() => onClickDiv(index)}>
      <div className="singleattempt__container-date">{date}</div>
      <div className="singleattempt__container-correct singleattempt_typography">
        {correct}
      </div>
      <div className="singleattempt__container-wrong singleattempt_typography">
        {wrong}
      </div>
      <div className="singleattempt__container-skipped singleattempt_typography">
        {" "}
        {skipped}
      </div>
    </div>
  );
};

export default SingleAttemptComponent;
