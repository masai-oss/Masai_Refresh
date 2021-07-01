import React from "react";
import styles from "../Styles/Completed.module.css";
import star from "../../../Assets/completed.svg";
import boy from "../../../Assets/vectorrr.svg";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { Spinner } from "../../Common/Loader";
import { getFromStorage } from "../../../Utils/localStorageHelper";
import { storageEnums } from "../../../Enums/storageEnums";
import {
  saveToStorage,
  removeFromStorage,
} from "../../../Utils/localStorageHelper";
const Completed = () => {
  const history = useHistory();
  const { isLoading } = useSelector((state) => state.practice_topics);

  const goToPractice = () => {
    history.push("/practice_topics");
  };
  return isLoading ? (
    <Spinner />
  ) : (
    <>
      <div className={styles.outer}>
        <div className={styles.stars}>
          <img src={star} alt="star" />
        </div>
        <div className={styles.message}>
          You’ve completed{" "}
          {getFromStorage(storageEnums.LONG_TYPE_NAV_TOPIC, "")} Practice
        </div>
        <div>
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
