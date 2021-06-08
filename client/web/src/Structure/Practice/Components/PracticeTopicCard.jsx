import React from "react";
import styles from "../Styles/Card.module.css";
import vector from "../../../Assets/vector.svg";
const PracticeTopicCard = () => {
  return (
    <div className={styles.Card}>
      <div className={styles.svgLogo}>
        <img src={vector} alt="Logo not found" />
        <p>HTML</p>
      </div>
      <div className={styles.startQuiz}>
        <button>Start Practice</button>
      </div>
    </div>
  );
};

export { PracticeTopicCard };
