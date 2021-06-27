import React from "react";
import "../../Styles/ResultNavbar.css";
import { useHistory } from "react-router-dom";
const ResultNavabar = (props) => {
  let history = useHistory();
  const goBackToHome = () => {
    history.replace("/quiz_topics");
  };
  const logoPath = `/logoForNav/${props.topic.toLowerCase()}/${props.topic.toLowerCase()}_logo.svg`;
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
      <div className="resultNavbar__topic">
        <img
          src={logoPath}
          // className="resultNavbarsvg_greaterthan"
          alt="Logo not found"
        />
        <span>{props.topic}</span>
      </div>
    </div>
  );
};

export default ResultNavabar;
