import React from "react";
import styles from "../Styles/Card.module.css";
import { useDispatch, useSelector } from "react-redux";
import { practiceTopicActions } from "../State/action";
import { BlurModal } from "../../Common/Modal/BlurModal";
import { BlurModalContext } from "../../../ContextProviders/BlurModalContextProvider";
const PracticeTopicCard = ({ data }) => {
  const { name, icon, _id, size } = data;
  const dispatch = useDispatch();
  const { practiceTopicsData } = useSelector((state) => state.practice_topics);
  const topicId = practiceTopicsData.find((item) => item._id == _id);
  const { practiceQuestionID } = useSelector((state) => state.practice_topics);
  const firstQue = practiceQuestionID[0];

  const { isOpen, setIsOpen } = React.useContext(BlurModalContext);

  const startAttempt = () => {
    const payload = {
      _id: topicId._id,
      size: size,
    };
    const questionPayload = {
      topic_id: topicId._id,
      question_id: firstQue,
    };
    dispatch(practiceTopicActions.startPractice(payload));
  };

  const openModalBox = () => {
    setIsOpen(true);
  };

  const modalContent = (
    <div className={styles.modalContent}>
      <p>
        You are about to start a Quiz on <span>Title</span>
      </p>
      <p>Are you sure you want to go ahead ?</p>
      <div className={styles.modalContent__buttons}>
        <button onClick={() => setIsOpen(false)}>No</button>
        <button onClick={() => startAttempt()}>Yes</button>
      </div>
    </div>
  );
  return (
    <>
      <div onClick={openModalBox} className={styles.Card}>
        <div className={styles.svgLogo}>
          <img src={icon} alt="Logo not found" />
          <p>{name}</p>
        </div>
        <div className={styles.startQuiz}>
          <h4>Start Practice</h4>
        </div>
      </div>
      <BlurModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        modalContent={modalContent}
      />
    </>
  );
};

export { PracticeTopicCard };
