import React from "react";
import styles from "../Styles/Card.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { practiceTopicActions } from "../State/action";
import { BlurModal } from "../../Common/Modal/BlurModal";
import { BlurModalContext } from "../../../ContextProviders/BlurModalContextProvider";
const PracticeTopicCard = ({ data, title }) => {
  console.log('title:', title)
  const { name, icon, _id, size } = data;

  console.log("name:", name);

  const dispatch = useDispatch();
  const history = useHistory();

  const { practiceQuestionID, topicId, practiceTopicsData } = useSelector(
    (state) => state.practice_topics
  );



  const { isOpen, setIsOpen } = React.useContext(BlurModalContext);
  const startAttempt = () => {
    setIsOpen(false);

    history.push(`/practice_topics/individual_question/${topicId}/1`);
  };
  const openModalBox = (id) => {
    const payload = {
      _id: id,
      size: size,
    };
    setIsOpen(true);
    dispatch(practiceTopicActions.startPractice(payload));
  };

  const modalContent = (
    <div className={styles.modalContent}>
      <p>
        You are about to start a Quiz on <span>{title}</span>
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
      <div onClick={() => openModalBox(_id)} className={styles.Card}>
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
