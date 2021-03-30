import {
  GET_RESULT_LOADING,
  GET_RESULT_SUCCESS,
  GET_RESULT_FAILURE,
  SEND_REPORT_LOADING,
  SEND_REPORT_SUCCESS,
  SEND_REPORT_FAILURE,
} from "./actionTypes";
import axios from "axios";
import { getFromStorage } from "../../../Utils/localStorageHelper";
import { storageEnums } from "../../../Enums/storageEnums";
const RESULT_API = process.env.REACT_APP_ATTEMPT_URL;
const REPORT_API = process.env.REACT_APP_ADMIN_QUESTION_API_URL;
const token = getFromStorage(storageEnums.TOKEN, "");

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

export const getResult = ({ attempt_id }) => (dispatch) => {
  dispatch(getResultRequest());
  axios({
    method: "GET",
    url: `${RESULT_API}/result/${attempt_id}`,
    headers: { Authorization: `Bearer ${token}` },
  })
    .then((res) => dispatch(getResultSuccess(res.data.result)))
    .catch((err) => dispatch(getResultFailure(err)));
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

export const sendReport = ({ question_id, reason, des }) => (dispatch) => {
  dispatch(sendReportRequest);
  return axios({
    method: "PATCH",
    url: `${REPORT_API}/report/${question_id}`,
    headers: { Authorization: `Bearer ${token}` },
    data: {
      reason: reason,
      description: des,
    },
  })
  .then((res) => {
    dispatch(sendReportSuccess(res))
    return {output: true} 
  })
  .catch((err) => {
    dispatch(sendReportFailure(err))
    return {output: false} 
  });
};

export const resultAction = {
  getResult,
  sendReport
}