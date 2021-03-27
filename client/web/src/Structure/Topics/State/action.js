import { 
  GET_TOPICS_LOADING,
  GET_TOPICS_SUCCESS,
  GET_TOPICS_FAILURE
 } from "./actionTypes";
import axios from "axios";
import { getFromStorage } from "../../../Utils/localStorageHelper"
import { storageEnums } from "../../../Enums/storageEnums"
const TOPIC_API_URL = process.env.REACT_APP_ADMIN_TOPIC_API_URL;


const getTopicsLoading = () => ({
  type: GET_TOPICS_LOADING,
});

const getTopicsSuccess = (payload) => ({
  type: GET_TOPICS_SUCCESS,
  payload,
});

const getTopicsFailure = (payload) => ({
  type: GET_TOPICS_FAILURE,
  payload,
});

const getTopics = () => (dispatch) => {
  dispatch(getTopicsLoading());
  const token = getFromStorage(storageEnums.TOKEN, "")
  return axios
    .get(`${TOPIC_API_URL}/summary`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      dispatch(getTopicsSuccess(res.data.data))
      return {output: true}
    })
    .catch((err) => {
      dispatch(getTopicsFailure(err.response))
      return {output: false}
    });
};


export const topicActions = {
  getTopics
}