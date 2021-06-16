import React from "react";
import "../../Styles/ResultNavbar.css";

const ResultNavabar = (props) => {
  return (
    <div className="resultNavbar__container">
      <div className="resultNavbar__backhome">Go Back to Homepage</div>
      <div className="resultNavbar__topic">{props.topic}</div>
    </div>
  );
};

export default ResultNavabar;
