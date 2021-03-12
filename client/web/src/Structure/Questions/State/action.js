import { questionConstant, answerConstant } from "./actionTypes";
import axios from "axios";

const token = localStorage.getItem("token");
const GET_QUESTIONS_URL = process.env.REACT_APP_ATTEMPT_URL;

export const nextQuestionLoading = () => ({
  type: questionConstant.GET_NEXT_QUESTION_LOADING,
});

export const nextQuestionFailure = (payload) => ({
  type: questionConstant.GET_NEXT_QUESTION_FAILURE,
  payload,
});

export const nextQuestionSuccess = (payload) => ({
  type: questionConstant.GET_NEXT_QUESTION_SUCCESS,
  payload,
});

export const nextQuestion = ({ attemptId, submissionId }) => (dispatch) => {
  dispatch(nextQuestionLoading());
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

export const recordAnswerSuccess = (payload) => ({
  type: answerConstant.RECORD_ANSWER_SUCCESS,
  payload,
});

export const recordAnswerFailure = (payload) => ({
  type: answerConstant.RECORD_ANSWER_FAILURE,
  payload,
});

export const recordAnswer = (payload) => async(dispatch) => {
    let attemptId = payload.attempt_id, submissionId = payload.submission_id
    
  axios({
    method: "PATCH",
    url: `${GET_QUESTIONS_URL}/record`,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    data: payload,
  })
    .then((res) => dispatch(recordAnswerSuccess(res.data.message)))
    .then(dispatch(nextQuestion({attemptId, submissionId})))
    .catch((err) => dispatch(recordAnswerFailure(err)));
};
