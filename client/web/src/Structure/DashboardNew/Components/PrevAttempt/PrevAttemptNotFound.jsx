import React from "react";
import { useHistory } from "react-router-dom";
import styles from "../../../Common/Styles/pageNotFound.module.css";
// import { Button } from "../Results Display";
import { Button } from "../../../Results Display";

const PrevAttemptNotFound = () => {
  let history = useHistory();

  const goToHome = () => {
    history.location.pathname = "/quiz_topics";
    history.push(history.location.pathname);
  };
  return (
    <>
      <div className={styles.main}>
        <div className={styles.notfound}>
          <div className={styles.notfound404}></div>
          <h2>
            Oops!
            <br /> Previous Attempts for this topic does not exist
          </h2>
          <Button onClick={goToHome}>Go To Home Page</Button>{" "}
        </div>
      </div>
    </>
  );
};

export { PrevAttemptNotFound };
