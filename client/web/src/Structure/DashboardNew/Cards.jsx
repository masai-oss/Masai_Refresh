import React, { useEffect } from "react";
import styles from "./Cards.module.css";
import Card from "./Card";
import { topicActions } from "../Topics/State/action";
import { BlurModal } from "../Common/DialogBoxes/BlurModal";
import { useDispatch, useSelector } from "react-redux";
import { BlurModalContext } from "../../ContextProviders/BlurModalContextProvider";
const Cards = () => {
  const { isOpen, setIsOpen } = React.useContext(BlurModalContext);
  const [quizTitle, setQuizTitle] = React.useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    console.log("Dispatching...");
    dispatch(topicActions.getQuizTopics());
    console.log("Dispatching done...");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // const isLoading = useSelector((state) => state.topics.isLoading);
  // const isError = useSelector((state) => state.topics.isError);
  const quizTopicsData = useSelector((state) => state.topics.quizTopicsData);
  console.log(quizTopicsData);
  const modalContent = (
    <div className={styles.modalContent}>
      <p>
        You are about to start a Quiz on <span>{quizTitle}</span>
      </p>
      <p>Are you sure you want to go ahead ?</p>
      <div className={styles.modalContent__buttons}>
        <button onClick={() => setIsOpen(false)}>No</button>
        <button>Yes</button>
      </div>
    </div>
  );

  const renderTopicCards = () => {
    console.log("hello");
    return quizTopicsData.map((topic) => {
      const cardContent = (
        <div className={styles.startQuiz}>
          <h3>START {topic.name} QUIZ</h3>
        </div>
      );
      return (
        <Card
          name={topic.name}
          cardContent={cardContent}
          onClick={() => {
            setIsOpen(true);
            setQuizTitle(topic.name);
          }}
        />
      );
    });
  };
  return (
    <div className={styles.Cards}>
      {quizTopicsData ? renderTopicCards() : <h1>Loading...</h1>}
      <BlurModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        modalContent={modalContent}
      />
    </div>
  );
};

export default Cards;
