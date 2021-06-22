import React from "react";
import "../../Styles/ResultNavbar.css";
import { useHistory } from "react-router-dom";
const ResultNavabar = (props) => {
  let history = useHistory();
  const goBackToHome = () => {
    history.replace("/quiz_topics");
  };
  return (
    <div className="resultNavbar__container">
      <div className="resultNavbar__backhome" onClick={goBackToHome}>
        <img
          src="/logos/GreaterThanIcon.svg"
          className="resultNavbarsvg_greaterthan"
          alt="back icon"
        />
        <span>Go Back to Homepage</span>
      </div>
      <div className="resultNavbar__topic">{props.topic}</div>
    </div>
  );
};

export default ResultNavabar;
