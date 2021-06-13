import React, { useEffect } from "react";
import { PracticeTopicCard } from "./Components/PracticeTopicCard";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Styles/Card.module.css";
import { practiceTopicActions } from "./State/action";

const Practice = () => {
  const { practiceTopicsData, isLoading } = useSelector(
    (state) => state.practice_topics
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(practiceTopicActions.getPracticeTopics());
  }, []);
  return (
    <>
      {practiceTopicsData?.map((item) => (
        <div key={item._id} className={styles.card}>
          <PracticeTopicCard data={item} title={item.name} />
        </div>
      ))}
    </>
  );
};

export { Practice };
