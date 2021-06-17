import {
  GET_PREVIOUS_ATTEMPTS_REQUEST,
  GET_PREVIOUS_ATTEMPTS_SUCCESS,
  GET_PREVIOUS_ATTEMPTS_FAILURE,
} from "./actionTypes";
import axios from "axios";
import { getFromStorage } from "../../../Utils/localStorageHelper";
import { storageEnums } from "../../../Enums/storageEnums";

const getPreviousAttemptsRequest = () => ({
  type: GET_PREVIOUS_ATTEMPTS_REQUEST,
});

const getPreviousAttemptsSuccess = (payload) => ({
  type: GET_PREVIOUS_ATTEMPTS_SUCCESS,
  payload,
});

const getPreviousAttemptsFailure = () => ({
  type: GET_PREVIOUS_ATTEMPTS_FAILURE,
});

const getPreviousAttempts = (topicId) => {
  return async (dispatch) => {
    dispatch(getPreviousAttemptsRequest());
    const token = getFromStorage(storageEnums.TOKEN, "");

    axios({
      method: "GET",
      url: `http://localhost:5050/api/stats/topic_attempts_stats/${topicId}`,
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        console.log("PrevAttempts in action: ", response);
        dispatch(getPreviousAttemptsSuccess(response.data.topic_attempt_stats));
      })
      .catch((err) => {
        dispatch(getPreviousAttemptsFailure());
      });
    // dispatch(getPreviousAttemptsSuccess());

    // dispatch(getPreviousAttemptsFailure());
  };
};
export { getPreviousAttempts };
