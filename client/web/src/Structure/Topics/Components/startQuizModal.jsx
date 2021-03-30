import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { questionActions } from '../../Questions'
import { useHistory } from "react-router";
import { CustomDialog } from "../../Common/DialogBoxes/CustomDialog";

const StartQuizModal = ({ modalData, handleClose }) => {
  const { open, topic, topicId } = modalData;
  const dispatch = useDispatch();
  const history = useHistory();
  const isLoadingQuiz = useSelector((state) => state.questions.isLoading);
  const isSuccessQuiz = useSelector((state) => state.questions.isSucccess);
  console.log(isLoadingQuiz, isSuccessQuiz)
  const startQuiz = async() => {
    let res = await dispatch(questionActions.attemptQuiz({topic_id: topicId, topic}))
    if (res.output) {
      let state = res.state
      let {attempt_id, submission_id} = state
      let question_id = state.questions[0]
      let payload = {attempt_id, submission_id, question_id}
      await dispatch(questionActions.getQuizQuestion(payload))
      history.replace(`/quiz_questions?attempt_id=${attempt_id}&submission_id=${submission_id}&question_id=${question_id}&topic=${topic}`);
    } else{
      alert("Unable to start Quiz try later");
    }
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
