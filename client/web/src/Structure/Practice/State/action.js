import {
  GET_PRACTICE_TOPICS_LOADING,
  GET_PRACTICE_TOPICS_SUCCESS,
  GET_PRACTICE_TOPICS_FAILURE,
} from "./actionTypes";
import axios from "axios";
import { getFromStorage } from "../../../Utils/localStorageHelper";
import { storageEnums } from "../../../Enums/storageEnums";
const PRACTICE_TOPIC_API_URL = process.env.REACT_APP_PRACTICE_TOPIC_URL;

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
    const res = await axios.get(`${PRACTICE_TOPIC_API_URL}`, {
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

export const practiceTopicActions = {
  getPracticeTopics,
};
