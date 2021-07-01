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
  let name = getFromStorage(storageEnums.LONG_TYPE_NAV_TOPIC, "");
  const logoPath = `/logos/${name.toLowerCase()}/${name.toLowerCase()}_logo.svg`;
  return isLoading ? (
    <Spinner />
  ) : (
    <>
      <div className={styles.completed__Outer}>
        <div className={styles.bookmarkNavbar}>
          <div>
            <img src="/logos/WhiteLessThanIcon.svg" alt="close icon" />
            <p
              onClick={() => {
                history.push("/");
              }}
            >
              Go Back To Homepage
            </p>
          </div>
          <div className={styles.boomarkNavbarLogo}>
            <img src={logoPath} alt="close icon" />
            <p
              onClick={() => {
                // history.push(`/bookmarks/${topic_ID}`);
              }}
            >
              {name}
            </p>
          </div>
        </div>
        <div className={styles.completed__Parent}>
          <div className={styles.completed__Star}>
            <img src={star} alt="star" />
          </div>
          <div className={styles.completed__Message}>
            You’ve completed{" "}
            {getFromStorage(storageEnums.LONG_TYPE_NAV_TOPIC, "")} Practice
          </div>
          <div>
            <button onClick={goToPractice} className={styles.completed__Button}>
              Practice again
            </button>
          </div>
          <div className={styles.completed__Vector}>
            <img src={boy} alt="boy" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Completed;
