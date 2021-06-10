import React from "react";
import styles from "../Styles/Completed.module.css";
import star from "../../../Assets/completed.svg";
import boy from "../../../Assets/vectorrr.svg";
import { useHistory } from "react-router-dom";
const Completed = () => {
  const history = useHistory();

  const goToPractice = () => {
    history.push("/practice_topics");
  };
  return (
    <>
      <div className={styles.outer}>
        <div className={styles.stars}>
          <img src={star} alt="star" />
        </div>
        <div className={styles.message}>You’ve completed HTML Practice</div>
        <div>
          {" "}
          <button onClick={goToPractice} className={styles.btn}>
            Practice again
          </button>
        </div>
        <div className={styles.vector}>
          <img src={boy} alt="boy" />
        </div>
      </div>
    </>
  );
};

export default Completed;
