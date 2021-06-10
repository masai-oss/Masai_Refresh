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
} from "./actionTypes";
import axios from "axios";
import { getFromStorage } from "../../../Utils/localStorageHelper";
import { storageEnums } from "../../../Enums/storageEnums";
const PRACTICE_TOPIC_API_URL = process.env.REACT_APP_PRACTICE_TOPIC_URL;

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
        dispatch(startPracticeSuccess({ ...res.data.questions })).then(
          dispatch(
            nextQuestion({ topic_id: _id, question_id: res.data.questions[0] })
          )
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
    console.log(topic_id, question_id, "nextque");

    dispatch(nextQuestionLoading());
    const token = getFromStorage(storageEnums.TOKEN, "");
    var data = { topic_id, question_id };
    axios({
      method: "GET",
      url: `${PRACTICE_TOPIC_API_URL}/question`,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: data,
    })
      .then((res) => {
        console.log(res);
        dispatch(nextQuestionSuccess(res.data.data));
      })

      .catch((err) => dispatch(nextQuestionFailure(err)));
  };

export const practiceTopicActions = {
  getPracticeTopics,
  startPractice,
  nextQuestion,
};
