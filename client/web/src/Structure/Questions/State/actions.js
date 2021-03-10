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
  axios({
    method: "POST",
    url: `/api/quiz/attempt/${payload.questionNo}`,
    headers: "bearer-token",
    data: {
      topic: `${payload.topic}`,
      topicId: `${payload.topicId}`,
      status: "begin",
    },
  })
    .then((res) => dispatch(getQuestionsSuccess(res)))
    .catch((err) => dispatch(getQuestionFailure(err)));
};

export const attemptNextQuestion = (payload) => (dispatch) => {
  dispatch(getQuestionRequest());
  axios({
    method: "POST",
    url: `/api/quiz/attempt/${payload.questionNo}`,
    headers: "bearer-token",
    data: {
      quizId: `${payload.quizId}`,
      status: "continue",
    },
  })
    .then((res) => dispatch(getQuestionsSuccess(res)))
    .catch((err) => dispatch(getQuestionFailure(err)));
};

export const getNextQuestion = (payload) => (dispatch) => {
  axios({
    method: "POST",
    url: `/api/quiz/answer/${payload.questionNo - 1}`,
    headers: "",
    data: {
      topic: `${payload.topic}`,
      quizId: `${payload.quizId}`,
      questionId: `${payload.questionId}`,
      type: `${payload.type}`,
      answer: `${payload.answer}`,
    },
  })
    .then((res) => dispatch(saveAnswer(res)))
    .then(() => dispatch(attemptNextQuestion(payload)))
    .catch((err) => dispatch(failure(err)));
};
