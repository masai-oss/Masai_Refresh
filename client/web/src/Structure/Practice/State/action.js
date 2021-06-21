import {
  GET_PRACTICE_TOPICS_LOADING,
  GET_PRACTICE_TOPICS_SUCCESS,
  GET_PRACTICE_TOPICS_FAILURE,
  START_PRACTICE_FAILURE,
  START_PRACTICE_LOADING,
  START_PRACTICE_SUCCESS,
  GET_NEXT_QUESTION_FAILURE,
  GET_NEXT_QUESTION_LOADING,
  GET_NEXT_QUESTION_SUCCESS,
  POST_BOOKMARK_SUCCESS,
  POST_BOOKMARK_LOADING,
  POST_BOOKMARK_FAILURE,
  POST_LIKE_SUCCESS,
  POST_LIKE_LOADING,
  POST_LIKE_FAILURE,
  POST_REPORT_FAILURE,
  POST_REPORT_SUCCESS,
  POST_REPORT_LOADING,
  POST_REPORT_COMPLETED,
} from "./actionTypes";
import axios from "axios";
import { getFromStorage } from "../../../Utils/localStorageHelper";
import { storageEnums } from "../../../Enums/storageEnums";
const PRACTICE_TOPIC_API_URL = process.env.REACT_APP_PRACTICE_TOPIC_URL;
const REPORT_API_URL = process.env.REACT_APP_REPORT_API_URL;

//get topics
const getPracticeTopicsLoading = () => ({
  type: GET_PRACTICE_TOPICS_LOADING,
});

const getPracticeTopicsSuccess = (payload) => ({
  type: GET_PRACTICE_TOPICS_SUCCESS,
  payload,
});

const getPracticeTopicsFailure = (payload) => ({
  type: GET_PRACTICE_TOPICS_FAILURE,
  payload,
});

const getPracticeTopics = () => async (dispatch) => {
  dispatch(getPracticeTopicsLoading());
  const token = getFromStorage(storageEnums.TOKEN, "");
  try {
    const res = await axios.get(`${PRACTICE_TOPIC_API_URL}/topics`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(getPracticeTopicsSuccess(res.data.data));
    return { output: true };
  } catch (err) {
    dispatch(getPracticeTopicsFailure(err.response));
    return { output: false };
  }
};

// start parctice

const startPracticeLoading = () => ({
  type: START_PRACTICE_LOADING,
});

const startPracticeSuccess = (payload) => ({
  type: START_PRACTICE_SUCCESS,
  payload,
});

const startPracticeFailure = (payload) => ({
  type: START_PRACTICE_FAILURE,
  payload,
});

const startPractice =
  ({ _id, size }) =>
  async (dispatch) => {
    dispatch(startPracticeLoading());
    const token = getFromStorage(storageEnums.TOKEN, "");
    const config = {
      method: "POST",
      url: `${PRACTICE_TOPIC_API_URL}/create`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        topic_id: _id,
        size: size || 5,
      },
    };
    return axios(config)
      .then((res) => {
        dispatch(
          startPracticeSuccess({ questions: res.data.questions, topic_id: _id })
        );
      })
      .catch((err) => {
        dispatch(startPracticeFailure(err.message));
        return { output: false };
      });
  };

// getting questions

const nextQuestionLoading = () => ({
  type: GET_NEXT_QUESTION_LOADING,
});

const nextQuestionFailure = (payload) => ({
  type: GET_NEXT_QUESTION_FAILURE,
  payload,
});

const nextQuestionSuccess = (payload) => ({
  type: GET_NEXT_QUESTION_SUCCESS,
  payload,
});

const nextQuestion =
  ({ topic_id, question_id }) =>
  (dispatch) => {
    dispatch(nextQuestionLoading());
    const token = getFromStorage(storageEnums.TOKEN, "");

    var data = { topic_id: topic_id, question_id: question_id };

    var config = {
      method: "post",
      url: `${PRACTICE_TOPIC_API_URL}/question`,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then((res) => {
        dispatch(nextQuestionSuccess(res.data.data));
      })
      .catch((err) => dispatch(nextQuestionFailure(err)));
  };

// bookmarks

const postBookmarkLoading = () => ({
  type: POST_BOOKMARK_LOADING,
});

const postBookmarkSuccess = (payload) => ({
  type: POST_BOOKMARK_SUCCESS,
  payload,
});

const postBookmarkFailure = (payload) => ({
  type: POST_BOOKMARK_FAILURE,
  payload,
});

const bookmarks =
  ({ question_id, topic_id }) =>
  async (dispatch) => {
    dispatch(postBookmarkLoading());
    const token = getFromStorage(storageEnums.TOKEN, "");
    const config = {
      method: "POST",
      url: `${PRACTICE_TOPIC_API_URL}/question_bookmark`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        question_id: question_id,
      },
    };
    return axios(config)
      .then(async (res) => {
        await dispatch(postBookmarkSuccess(res.data));
        await dispatch(
          nextQuestion({ question_id: question_id, topic_id: topic_id })
        );
      })

      .catch((err) => {
        dispatch(postBookmarkFailure(err.message));
        return { output: false };
      });
  };

//likes

const postLikeLoading = () => ({
  type: POST_LIKE_LOADING,
});

const postLikeSuccess = (payload) => ({
  type: POST_LIKE_SUCCESS,
  payload,
});

const postLikeFailure = (payload) => ({
  type: POST_LIKE_FAILURE,
  payload,
});

const likes =
  ({ question_id, topic_id }) =>
  async (dispatch) => {
    dispatch(postLikeLoading());
    const token = getFromStorage(storageEnums.TOKEN, "");
    const config = {
      method: "POST",
      url: `${PRACTICE_TOPIC_API_URL}/question_like`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        question_id: question_id,
      },
    };
    return axios(config)
      .then(async (res) => {
        await dispatch(postLikeSuccess(res.data));
        await dispatch(
          nextQuestion({ question_id: question_id, topic_id: topic_id })
        );
      })

      .catch((err) => {
        dispatch(postLikeFailure(err.message));
        return { output: false };
      });
  };

// Report
const postReportLoading = () => ({
  type: POST_REPORT_LOADING,
});

const postReportSuccess = () => ({
  type: POST_REPORT_SUCCESS,
});

const postReportFailure = () => ({
  type: POST_REPORT_FAILURE,
});

const postReportCompleted = () => ({
  type: POST_REPORT_COMPLETED,
});

const postReport = (question_id, issueData) => async (dispatch) => {
  console.log("Inside action post report:", `${REPORT_API_URL}/${question_id}`);
  dispatch(postReportLoading());
  const token = getFromStorage(storageEnums.TOKEN, "");
  const config = {
    method: "POST",
    url: `${REPORT_API_URL}/${question_id}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      reason: [...issueData.options],
      description: issueData.description,
    },
  };
  return axios(config)
    .then(async (res) => {
      console.log("SUCCESS-------------------IN ACTION", res);
      await dispatch(postReportSuccess());
    })
    .catch((err) => {
      dispatch(postReportFailure(err.message));
    });
};
export const practiceTopicActions = {
  getPracticeTopics,
  startPractice,
  nextQuestion,
  bookmarks,
  likes,
  postReport,
  postReportCompleted,
};
