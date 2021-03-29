import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { topicActions } from "../State/action";
import { useHistory } from "react-router";
import { CustomDialog } from "../../Common/CustomDialog";

const StartQuizModal = ({ modalData, handleClose }) => {
  const { open, topic, topicId } = modalData;
  const dispatch = useDispatch();
  const history = useHistory();
  const isLoadingQuiz = useSelector((state) => state.topics.isLoadingQuiz);
  const isSuccessQuiz = useSelector((state) => state.topics.isSuccessQuiz);
  const startQuiz = () => {
    dispatch(topicActions.attemptQuiz(topicId)).then((res) => {
      if (res.final === "success") {
        history.replace(`/quiz_questions/${topic}`);
      } else if (res.final === "failure") {
        alert("Unable to start Quiz try later");
      }
    });
  };
  return (
    <div>
      <CustomDialog
        heading="START QUIZ"
        open={open}
        handleClose={handleClose}
        message={`You are about to start a quiz on ${topic.split("_").join(" ")}. Are you sure you wanna go ahead`}
        okBtnTitle="Start"
        cancelBtnTitle="Cancel"
        onOkAction={startQuiz}
        isLoading={isLoadingQuiz}
        isSuccess={isSuccessQuiz}
      />
    </div>
  );
};

export { StartQuizModal };
