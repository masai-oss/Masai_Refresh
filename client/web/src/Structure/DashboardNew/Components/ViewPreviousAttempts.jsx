import React, { useEffect } from "react";
import styles from "../Styles/PreviousAttempts.module.css";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPreviousAttempts } from "../State/action";
import PreviousAttempts from "../../Results Display/Components/attempts/PreviousAttempts";

const ViewPreviousAttempts = () => {
  let params = useParams();
  let dispatch = useDispatch();
  let topicId = params.topicId;
  let topicName = params.topicName;
  console.log("Topic id : ", topicId);
  useEffect(() => {
    dispatch(getPreviousAttempts(topicId));
  }, []);

  const { previousAttempts } = useSelector(
    (state) => state.getPreviousAttempts
  );

  console.log("Previous attempts are : ", previousAttempts, topicName, topicId);
  return (
    <div className={styles.PreviousAttempts}>
      <PreviousAttempts
        topicID={topicId}
        prev_attempts={previousAttempts}
        className="abcd"
      />
    </div>
  );
};

export { ViewPreviousAttempts };
