import React from "react";
import "../../Styles/ResultNavbar.css";
import { useHistory } from "react-router-dom";
const ResultNavabar = (props) => {
  let history = useHistory();
  const goBackToHome = () => {
    history.replace("quiz_topics");
  };
  return (
    <div className="resultNavbar__container">
      <div className="resultNavbar__backhome" onClick={goBackToHome}>
        Go Back to Homepage
      </div>
      <div className="resultNavbar__topic">{props.topic}</div>
    </div>
  );
};

export default ResultNavabar;
