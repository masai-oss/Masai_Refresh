import { 
  GET_QUIZ_TOPICS_LOADING,
  GET_QUIZ_TOPICS_SUCCESS,
  GET_QUIZ_TOPICS_FAILURE
 } from "./actionTypes";
import axios from "axios";
import { getFromStorage } from "../../../Utils/localStorageHelper"
import { storageEnums } from "../../../Enums/storageEnums"
const TOPIC_API_URL = process.env.REACT_APP_ADMIN_TOPIC_API_URL;


const getTopicsLoading = () => ({
  type: GET_QUIZ_TOPICS_LOADING,
});

const getTopicsSuccess = (payload) => ({
  type: GET_QUIZ_TOPICS_SUCCESS,
  payload,
});

const getTopicsFailure = (payload) => ({
  type: GET_QUIZ_TOPICS_FAILURE,
  payload,
});

const getQuizTopics = () => async (dispatch) => {
  dispatch(getTopicsLoading());
  const token = getFromStorage(storageEnums.TOKEN, "")
  try {
    const res = await axios
      .get(`${TOPIC_API_URL}/summary`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    dispatch(getTopicsSuccess(res.data.data));
    return { output: true };
  } catch (err) {
    dispatch(getTopicsFailure(err.response));
    return { output: false };
  }
};


export const topicActions = {
  getQuizTopics
};