import React from "react";
import { useHistory } from "react-router-dom";
import styles from "./Styles/pageNotFound.module.css";
import image from "../../Assets/emoji.png";

const PageNotFound = ({ errorNum = "", message = "Page not found", des }) => {
  let history = useHistory();

  const goToHome = () => {
    history.location.pathname = "/quiz_topics";
    history.push(history.location.pathname);
  };
  return (
    <div className={styles.outer_container}>
      <div className={styles.container}>
        <div className={styles.not_found}>
          <img className={styles.not_found_image} src={image} alt='Emoji' />
          <div className={styles.not_found_text}>
            <h2>
              Oops! {" "} {errorNum}
              <br />
              {message}
            </h2>
          </div>
        </div>
        <button className={styles.back_button} onClick={goToHome}>
          Go To Home Page
        </button>
      </div>
    </div>
  );
};

export { PageNotFound };
