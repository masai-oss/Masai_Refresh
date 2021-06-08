import React, { useEffect } from "react";
import { PracticeTopicCard } from "./Components/PracticeTopicCard";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Styles/Card.module.css";
import { practiceTopicActions } from "./State/action";

const Practice = () => {
  const { practiceTopicsData } = useSelector((state) => state.practice_topics);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(practiceTopicActions.getPracticeTopics());
  }, []);
  return (
    <>
      {practiceTopicsData?.map((item) => (
        <div className={styles.card}>
          <PracticeTopicCard data={item} />
        </div>
      ))}
    </>
  );
};

export { Practice };
