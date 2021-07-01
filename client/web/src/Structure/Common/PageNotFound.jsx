import React from "react";
import { useHistory } from "react-router-dom";
import styles from "./Styles/pageNotFound.module.css";
import { Button } from "../Results Display";

const PageNotFound = ({ errorNum, message, des }) => {
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
          <h1>{errorNum}</h1>
          <h2>
            Oops!
            <br /> {message}
          </h2>
          <p>{des}</p>
          <Button onClick={goToHome}>Go To Home Page</Button>{" "}
        </div>
      </div>
    </>
  );
};

export { PageNotFound };
