import React from "react";
import styles from "./Card.module.css";
import vector from "./vector.svg";
const Card = () => {
  return (
    <div className={styles.Card}>
      <div className={styles.svgLogo}>
        <img src={vector} alt="Logo not found" />
        <p>HTML</p>
      </div>
      <div className={styles.startQuiz}>
        <h3>Start Quiz</h3>
      </div>
    </div>
  );
};

export default Card;
