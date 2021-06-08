import React, { useEffect } from "react";
import { PracticeTopicCard } from "./Components/PracticeTopicCard";
import { useDispatch } from "react-redux";
import styles from "./Styles/Card.module.css";
import { practiceTopicActions } from "./State/action";

const Practice = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(practiceTopicActions.getPracticeTopics());
  }, []);
  return (
    <div className={styles.Cards}>
      <PracticeTopicCard />
    </div>
  );
};

export { Practice };
