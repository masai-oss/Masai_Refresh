import React, { useEffect } from "react";
// import { PracticeTopicCard } from "./Components/PracticeTopicCard";
// import styles from "./Styles/Card.module.css";
import { useDispatch, useSelector } from "react-redux";
import { BlurModal } from "../Common/Modal/BlurModal";
import styles from "./Styles/Practice.module.css";
import { practiceTopicActions } from "./State/action";
import { useHistory } from "react-router-dom";
import Card from "../DashboardNew/Card";
import { BlurModalContext } from "../../ContextProviders/BlurModalContextProvider";

const Practice = () => {
  const [title, setTitle] = React.useState("");
  const { isOpen, setIsOpen } = React.useContext(BlurModalContext);

  const { practiceTopicsData, isLoading, topicId, practiceQuestionID } =
    useSelector((state) => state.practice_topics);

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(practiceTopicActions.getPracticeTopics());
  }, []);

  const startAttempt = () => {
    setIsOpen(false);
    history.push(`/practice_topics/individual_question/${topicId}/1`);
  };

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

  return (
    <div className={styles.Practice}>
      {practiceTopicsData?.map((item) => {
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
              onClick={() => openModalBox(item._id, item.size, item.name)}
            />
          </div>
        );
      })}
      <BlurModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        modalContent={modalContent}
      />
    </div>
  );
};

export { Practice };
