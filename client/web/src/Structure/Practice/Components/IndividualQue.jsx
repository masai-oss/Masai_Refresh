import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { practiceTopicActions } from "../State/action";

const IndividualQue = () => {
  const topic_id = useParams();
  const { practiceQuestionID } = useSelector((state) => state.practice_topics);
  const firstQue = practiceQuestionID[0];
  const dispatch = useDispatch();

  const questionPayload = {
    topic_id: topic_id,
    question_id: firstQue,
  };
  React.useEffect(() => {
    dispatch(practiceTopicActions.nextQuestion(questionPayload));
  }, []);
  return <div>hai</div>;
};

export default IndividualQue;
