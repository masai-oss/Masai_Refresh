import {
  GET_RESULT_LOADING,
  GET_RESULT_SUCCESS,
  GET_RESULT_FAILURE,
  SEND_REPORT_LOADING,
  SEND_REPORT_SUCCESS,
  SEND_REPORT_FAILURE,
  GET_PREVIOUS_ATTEMPTS_LIST_SUCCESS,
  GET_PREVIOUS_ATTEMPT_RESULT_SUCCESS,
} from "./actionTypes";
import axios from "axios";
import { getFromStorage } from "../../../Utils/localStorageHelper";
import { storageEnums } from "../../../Enums/storageEnums";
const RESULT_API = process.env.REACT_APP_ATTEMPT_URL;
const REPORT_API = process.env.REACT_APP_ADMIN_QUESTION_API_URL;

const STATS_API = process.env.REACT_APP_STATS_URL;
const getResultRequest = () => ({
  type: GET_RESULT_LOADING,
});
const getResultSuccess = (payload) => ({
  type: GET_RESULT_SUCCESS,
  payload,
});
const getResultFailure = (payload) => ({
  type: GET_RESULT_FAILURE,
  payload,
});
const getPreviousAttemptsList = (payload) => ({
  type: GET_PREVIOUS_ATTEMPTS_LIST_SUCCESS,
  payload,
});
const getPreviousAttempt = (payload) => ({
  type: GET_PREVIOUS_ATTEMPT_RESULT_SUCCESS,
  payload,
});
//----------Calling this right after clicking submit buttons in the question part-------
const getResult =
  ({ attempt_id, topicId }) =>
  (dispatch) => {
    dispatch(getResultRequest());

    dispatch(getPreviousAttempt(attempt_id));
    const token = getFromStorage(storageEnums.TOKEN, "");
    axios({
      method: "GET",
      url: `${RESULT_API}/result/${attempt_id}`,
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        axios({
          method: "GET",
          url: `${STATS_API}/topic_attempts_stats/${topicId}`,
          headers: { Authorization: `Bearer ${token}` },
        }).then((response) => {
          dispatch(getPreviousAttemptsList(response.data.topic_attempt_stats));
          dispatch(getResultSuccess(res.data.result));
        });
      })
      .catch((err) => {
        dispatch(getResultFailure(err));
      });
  };
const getResultPrevSection =
  ({ topicId, attempt_id }) =>
  (dispatch) => {
    dispatch(getResultRequest());

    const token = getFromStorage(storageEnums.TOKEN, "");
    axios({
      method: "GET",
      url: `${STATS_API}/topic_attempts_stats/${topicId}`,
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (attempt_id === undefined) {
          attempt_id =
            res.data.topic_attempt_stats[
              res.data.topic_attempt_stats.length - 1
            ].attempt_id;
        }
        axios({
          method: "GET",
          url: `${RESULT_API}/result/${attempt_id}`,
          headers: { Authorization: `Bearer ${token}` },
        }).then((response) => {
          dispatch(getPreviousAttempt(attempt_id));
          dispatch(getPreviousAttemptsList(res.data.topic_attempt_stats));
          dispatch(getResultSuccess(response.data.result));
        });
      })
      .catch((err) => {
        dispatch(getResultFailure(err));
      });
  };
//----------Report questions ------//
const sendReportRequest = () => ({
  type: SEND_REPORT_LOADING,
});
const sendReportSuccess = (payload) => ({
  type: SEND_REPORT_SUCCESS,
  payload,
});
const sendReportFailure = (payload) => ({
  type: SEND_REPORT_FAILURE,
  payload,
});
const sendReport =
  ({ question_id, reason, des }) =>
  async (dispatch) => {
    dispatch(sendReportRequest);
    const token = getFromStorage(storageEnums.TOKEN, "");

    try {
      const res = await axios({
        method: "PATCH",
        url: `${REPORT_API}/report/${question_id}`,
        headers: { Authorization: `Bearer ${token}` },

        data:
          des !== "" && des
            ? {
                reason: reason,
                description: des,
              }
            : {
                reason: reason,
              },
      });
      dispatch(sendReportSuccess(res));
      return { output: true };
    } catch (err) {
      dispatch(sendReportFailure(err.response));
      return { output: false };
    }
  };
export const resultAction = {
  getResult,
  sendReport,
  getResultPrevSection,
};
