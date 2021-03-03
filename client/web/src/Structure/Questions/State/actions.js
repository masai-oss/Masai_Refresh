import { questionConstant } from "./actionTypes";

import axios from "axios";

export const getQuestionRequest = () => ({
  type: questionConstant.GET_QUESTIONS_LOADING,
});

export const getQuestionsSuccess = (payload) => ({
  type: questionConstant.GET_QUESTIONS_SUCCESS,
  payload,
});

export const getQuestionFailure = (payload) => ({
  type: questionConstant.GET_QUESTIONS_FAILURE,
  payload,
});

export const getQuestions = (payload) => (dispatch) => {
  dispatch(getQuestionRequest());
  axios
    .get("http://localhost:3004/questions")
    .then((res) => dispatch(getQuestionsSuccess(res)))
    .catch((err) => dispatch(getQuestionFailure(err)));
};