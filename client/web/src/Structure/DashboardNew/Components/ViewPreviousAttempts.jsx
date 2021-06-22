import React, { useEffect } from "react";
import styles from "../Styles/PreviousAttempts.module.css";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const ViewPreviousAttempts = () => {
  let params = useParams();

  let topicId = params.topicId;
  let topicName = params.topicName;

  return (
    <div className={styles.PreviousAttempts}>
      <h1>Topic id: {topicId}</h1>
      <h1>Topic name: {topicName}</h1>
    </div>
  );
};

export { ViewPreviousAttempts };
