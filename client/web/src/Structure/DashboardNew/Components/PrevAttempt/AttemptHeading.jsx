import React from "react";
import styles from "../../Styles/AttemptHeadingCard.module.css";

const AttemptHeadingCard = () => {
  return (
    <div>
      <div className={styles.heading__attempt__card}>Previous Attempt</div>
      <div className={styles.heading__attempt__cardDate}>Date</div>
      <div className={styles.heading__attempt__cardCorrect}>Correct</div>
      <div className={styles.heading__attempt__cardWrong}>Incorrect</div>
      <div className={styles.heading__attempt__cardSkipped}>Skipped</div>
    </div>
  );
};
export default AttemptHeadingCard;
