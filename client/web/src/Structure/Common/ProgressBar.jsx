import React from "react";
import ProgressBar from "@ramonak/react-progress-bar";

const QuestionProgress = ({ completed }) => {
  return (
    <>
      <ProgressBar
        completed={completed}
        bgColor="#2B75CD"
        height="8px"
        baseBgColor="#E5E5E5"
        isLabelVisible={false}
      />
    </>
  );
};

export default QuestionProgress;
