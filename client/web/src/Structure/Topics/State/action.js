import { topicConstant, questionsConstants } from "./actionTypes";
import axios from "axios";

const token = localStorage.getItem("token");
const ATTEMPT_API_URL = process.env.REACT_APP_ATTEMPT_URL;
const TOPIC_API_URL = process.env.REACT_APP_ADMIN_TOPIC_API_URL;

const getTopicsLoading = () => ({
  type: topicConstant.GET_TOPICS_LOADING,
});

const getTopicsSuccess = (payload) => ({
  type: topicConstant.GET_TOPICS_SUCCESS,
  payload,
});

const getTopicsFailure = (payload) => ({
  type: topicConstant.GET_TOPICS_FAILURE,
  payload,
});

const getTopics = (payload) => (dispatch) => {
  dispatch(getTopicsLoading());

  axios
    .get(`${TOPIC_API_URL}/summary`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => dispatch(getTopicsSuccess(res.data)))
    .catch((err) => dispatch(getTopicsFailure(err)));
};

const attemptQuizLoading = () => ({
  type: questionsConstants.ATTEMPT_QUIZ_LOADING,
});

const attemptQuizSuccess = (payload) => ({
  type: questionsConstants.ATTEMPT_QUIZ_SUCCESS,
  payload,
});

const attemptQuizFailure = (payload) => ({
  type: questionsConstants.ATTEMPT_QUIZ_FAILURE,
  payload,
});

const attemptQuiz = (payload) => (dispatch) => {
  dispatch(attemptQuizLoading());
  axios({
    method: "POST",
    url: `${ATTEMPT_API_URL}/create`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      topic_id: `${payload}`,
    },
  })
    .then((res) => dispatch(attemptQuizSuccess(res.data.data)))
    .catch((err) => dispatch(attemptQuizFailure(err)));
};

export const topicActions = {
  getTopics: getTopics,
  attemptQuiz: attemptQuiz,
}