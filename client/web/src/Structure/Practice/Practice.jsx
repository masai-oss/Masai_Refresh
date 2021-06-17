import React, { useEffect } from "react";
import { PracticeTopicCard } from "./Components/PracticeTopicCard";
import { useDispatch, useSelector } from "react-redux";
// import styles from "./Styles/Card.module.css";
import styles from "./Styles/Practice.module.css";
import { practiceTopicActions } from "./State/action";
import { useHistory } from "react-router-dom";
import { BlurModal } from "../Common/DialogBoxes/BlurModal";
import { BlurModalContext } from "../../ContextProviders/BlurModalContextProvider";
import { Card } from "../Common/Card";
const Practice = () => {
  const { practiceTopicsData, isLoading } = useSelector(
    (state) => state.practice_topics
  );
  const [title, setTitle] = React.useState("");
  const dispatch = useDispatch();
  const history = useHistory();
  const { practiceQuestionID, topicId } = useSelector(
    (state) => state.practice_topics
  );

  const { isOpen, setIsOpen } = React.useContext(BlurModalContext);
  const startAttempt = () => {
    setIsOpen(false);

    history.push(`/practice_topics/individual_question/${topicId}/1`);
  };
  useEffect(() => {
    dispatch(practiceTopicActions.getPracticeTopics());
  }, []);
  const openModalBox = (id, size, name) => {
    const payload = {
      _id: id,
      size: size,
    };
    setIsOpen(true);
    setTitle(name);
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
  const renderPracticeCards = () => {
    return practiceTopicsData?.map((item) => {
      const { name, icon, _id, size } = item;

      // const cardContent = (
      //   <div
      //     onClick={() => openModalBox(_id, size, name)}
      //     className={styles.Card}
      //   >
      //     <div className={styles.svgLogo}>
      //       <img src={icon} alt="Logo not found" />
      //       <p>{name}</p>
      //     </div>
      //     <div className={styles.startQuiz}>
      //       <h4>Start Practice</h4>
      //     </div>
      //   </div>

      const cardContent = (
        <div className={styles.startQuiz}>
          <h3>PRACTICE {item.name}</h3>
        </div>
      );
      return (
        <div key={item._id} className={styles.card}>
          {/* <PracticeTopicCard data={item} title={item.name} /> */}
          <Card
            data={item}
            name={item.name}
            cardContent={cardContent}
            onClick={() => openModalBox(_id, size, name)}
          />
        </div>
      );
    });
  };
  return (
    <div className={styles.Practice}>
      {renderPracticeCards()}
      <BlurModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        modalContent={modalContent}
      />
      {/* <div key={item._id} className={styles.card}>
        <PracticeTopicCard data={item} title={item.name} />
      </div> */}
    </div>
  );
};

export { Practice };
