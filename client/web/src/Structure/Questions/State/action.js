import { questionConstant } from "./actionTypes";
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
