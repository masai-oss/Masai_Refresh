import React from "react";
import styles from "../Styles/Card.module.css";
import { useDispatch, useSelector } from "react-redux";
import { practiceTopicActions } from "../State/action";

const PracticeTopicCard = ({ data }) => {
  const { name, icon, _id, size } = data;
  const dispatch = useDispatch();
  const { practiceTopicsData } = useSelector((state) => state.practice_topics);
  console.log(practiceTopicsData, "_data");
  const topicId = practiceTopicsData.find((item) => item._id == _id);
  console.log(topicId, "here");
  const startAttempt = () => {
    const payload = {
      _id: topicId._id,
      size: size,
    };
    // console.log(_id, "id");
    dispatch(practiceTopicActions.startPractice(payload));
  };
  return (
    <div className={styles.Card} >
      <div className={styles.svgLogo}>
        <img src={icon} alt="Logo not found" />
        <p>{name}</p>
      </div>
      <div className={styles.startQuiz}>
        <button onClick={startAttempt}>Start Practice</button>
      </div>
    </div>
  );
};

export { PracticeTopicCard };
