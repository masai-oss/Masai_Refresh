import { topicConstant, questionsConstants } from "./actionTypes";
import axios from "axios";
import { questionActions } from "../../Questions"

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

const getTopics = () => (dispatch) => {
  dispatch(getTopicsLoading());
  const token = localStorage.getItem("token");
  axios
    .get(`${TOPIC_API_URL}/summary`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => dispatch(getTopicsSuccess(res.data)))
    .catch((err) => dispatch(getTopicsFailure(err.response)));
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

const attemptQuiz = (payload) => async(dispatch, getState) => {
  dispatch(attemptQuizLoading());
  const token = localStorage.getItem("token");
  const config = {
    method: "POST",
    url: `${ATTEMPT_API_URL}/create`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      topic_id: `${payload}`,
      size:5
    },
  };
  try {
    const res = await axios(config)
    dispatch(attemptQuizSuccess(res.data.data));
    const attemptId = getState().topics.attemptId;
    const submissionId = getState().topics.submissionId;
    dispatch(questionActions.nextQuestion({ attemptId, submissionId }));
    return {output: true, final: "success"}
  } catch (err) {
    dispatch(attemptQuizFailure(err.response));
    return {final: "failure"}
  }
};

export const topicActions = {
  getTopics: getTopics,
  attemptQuiz: attemptQuiz,
}