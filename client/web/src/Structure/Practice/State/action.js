import {
  GET_PRACTICE_TOPICS_LOADING,
  GET_PRACTICE_TOPICS_SUCCESS,
  GET_PRACTICE_TOPICS_FAILURE,
  START_PRACTICE_FAILURE,
  START_PRACTICE_LOADING,
  START_PRACTICE_SUCCESS,
} from "./actionTypes";
import axios from "axios";
import { getFromStorage } from "../../../Utils/localStorageHelper";
import { storageEnums } from "../../../Enums/storageEnums";
const PRACTICE_TOPIC_API_URL = process.env.REACT_APP_PRACTICE_TOPIC_URL;
console.log(PRACTICE_TOPIC_API_URL, "URL");

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
  console.log(PRACTICE_TOPIC_API_URL);
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
    console.log(PRACTICE_TOPIC_API_URL);
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
        console.log(res, "res");
        dispatch(startPracticeSuccess({ ...res.data.questions }));
        return { output: true, state: { ...res.data.questions } };
      })
      .catch((err) => {
        dispatch(startPracticeFailure(err.message));
        return { output: false };
      });
  };

export const practiceTopicActions = {
  getPracticeTopics,
  startPractice,
};
