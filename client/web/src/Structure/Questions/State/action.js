import { questionConstant, answerConstant } from "./actionTypes";
import axios from "axios";


const GET_QUESTIONS_URL = process.env.REACT_APP_ATTEMPT_URL;

const nextQuestionLoading = () => ({
  type: questionConstant.GET_NEXT_QUESTION_LOADING,
});

const nextQuestionFailure = (payload) => ({
  type: questionConstant.GET_NEXT_QUESTION_FAILURE,
  payload,
});

const nextQuestionSuccess = (payload) => ({
  type: questionConstant.GET_NEXT_QUESTION_SUCCESS,
  payload,
});

const nextQuestion = ({ attemptId, submissionId }) => (dispatch) => {
  dispatch(nextQuestionLoading());
  const token = localStorage.getItem("token");
  axios({
    method: "POST",
    url: `${GET_QUESTIONS_URL}/next`,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    data: {
      submission_id: submissionId,
      attempt_id: attemptId,
    },
  })
    .then((res) => dispatch(nextQuestionSuccess(res.data.data)))
    .catch((err) => dispatch(nextQuestionFailure(err)));
};

const recordAnswerSuccess = (payload) => ({
  type: answerConstant.RECORD_ANSWER_SUCCESS,
  payload,
});

const recordAnswerFailure = (payload) => ({
  type: answerConstant.RECORD_ANSWER_FAILURE,
  payload,
});

const recordAnswer = (payload) => async(dispatch) => {
  // eslint-disable-next-line no-unused-vars
  let attemptId = payload.attempt_id, submissionId = payload.submission_id
  const token = localStorage.getItem("token");
  return axios({
    method: "PATCH",
    url: `${GET_QUESTIONS_URL}/record`,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    data: payload,
  })
  .then((res) => {
    dispatch(recordAnswerSuccess(res.data.message))
    return {output: true}
  })
  .catch((err) => {
    dispatch(recordAnswerFailure(err))
    return {output: false}
  });
};


export const questionActions = {
  nextQuestion: nextQuestion,
  recordAnswer: recordAnswer,
};