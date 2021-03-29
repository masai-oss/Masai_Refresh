import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { questionActions } from '../../Questions'
import { useHistory } from "react-router";
import { CustomDialog } from "../../Common/CustomDialog";

const StartQuizModal = ({ modalData, handleClose }) => {
  const { open, topic, topicId } = modalData;
  const dispatch = useDispatch();
  const history = useHistory();
  const isLoadingQuiz = useSelector((state) => state.topics.isLoadingQuiz);
  const isSuccessQuiz = useSelector((state) => state.topics.isSuccessQuiz);
  let attempt_id = useSelector((state) => state.questions.attemptId);
  let submission_id = useSelector((state) => state.questions.submissionId);
  let question_ids = useSelector((state) => state.questions.questionIds);
  
  const startQuiz = () => {
    dispatch(questionActions.attemptQuiz({topic_id: topicId})).then((res) => {
      if (res.output) {
        let question_id = question_ids[0]
        dispatch(questionActions.getQuestion({attempt_id, submission_id, question_id}))
        history.replace(`/quiz_questions/${topic}`);
      } else{
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
