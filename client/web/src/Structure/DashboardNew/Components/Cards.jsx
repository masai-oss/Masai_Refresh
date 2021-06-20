import React, { useEffect } from "react";
import styles from "../Styles/Cards.module.css";
import { Card } from "../../Common/Card/Card";
import { topicActions } from "../../Topics/State/action";
import { BlurModal } from "../../Common/DialogBoxes/BlurModal";
import { useDispatch, useSelector } from "react-redux";
import { BlurModalContext } from "../../../ContextProviders/BlurModalContextProvider";
import { questionActions } from "../../Questions";
import { useHistory } from "react-router";
import { getPreviousAttempts } from "../State/action";
import { resultAction } from "../../Results Display";

const Cards = () => {
  const { isOpen, setIsOpen } = React.useContext(BlurModalContext);
  const [quizTitle, setQuizTitle] = React.useState({});
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    console.log("Dispatching...");

    dispatch(topicActions.getQuizTopics());
    console.log("Dispatching done...");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // const isLoading = useSelector((state) => state.topics.isLoading);
  // const isError = useSelector((state) => state.topics.isError);

  const previousAttempts = useSelector(
    (state) => state.getPreviousAttempts.previousAttempts
  );
  const viewAllAttempts = (topic) => {
    console.log("ViewAllAttempts: ", topic);
  };
  const quizTopicsData = useSelector((state) => state.topics.quizTopicsData);
  console.log(quizTopicsData);
  const modalContent = (
    <div className={styles.modalContent}>
      <p>
        You are about to start a Quiz on <span>{quizTitle.name}</span>
      </p>
      <p>Are you sure you want to go ahead ?</p>
      <div className={styles.modalContent__buttons}>
        <button onClick={() => setIsOpen(false)}>No</button>
        <button onClick={() => startQuiz(quizTitle)}>Yes</button>
      </div>
    </div>
  );

  const startQuiz = async (quizTitle) => {
    let res = await dispatch(
      questionActions.attemptQuiz({
        topic_id: quizTitle._id,
        topic: quizTitle.name,
      })
    );
    if (res.output) {
      let state = res.state;
      console.log("Questions data : ", state);
      let { attempt_id, submission_id } = state;
      let question_id = state.questions[0];
      let payload = { attempt_id, submission_id, question_id };
      await dispatch(questionActions.getQuizQuestion(payload));
      console.log("Topic id Cards: ", quizTitle, quizTitle._id);
      history.replace(
        `/quiz_questions?attempt_id=${attempt_id}&submission_id=${submission_id}&question_id=${question_id}&topic=${quizTitle.name}&topicId=${quizTitle._id}`
      );
      setIsOpen(false);
    } else {
      alert("Unable to start Quiz try later");
    }
  };

  const renderTopicCards = () => {
    console.log("hello");

    return quizTopicsData.map((topic, index) => {
      // console.log("Last attempt : ", topic.lastAttempt);
      const lastAttemptPercent = topic.lastAttempt
        ? (topic.lastAttempt.correct / topic.lastAttempt.alloted) * 100
        : NaN;
      // console.log("Last Attemppt %age: ", lastAttemptPercent);
      const cardContent = (
        <div className={styles.startQuiz}>
          <p>
            Last Attempt (
            {isNaN(lastAttemptPercent) ? "NA" : lastAttemptPercent + "%"})
          </p>
          <button onClick={() => viewAllAttempts(topic)}>
            View All Attempts
          </button>
          <button
            onClick={() => {
              setIsOpen(true);
              setQuizTitle(topic);
            }}
          >
            Start Quiz
          </button>
        </div>
      );
      return (
        <Card
          key={index}
          name={topic.name}
          cardContent={cardContent}
          onClick={() => {}}
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
