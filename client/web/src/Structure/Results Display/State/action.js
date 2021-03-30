import {
  GET_RESULT_LOADING,
  GET_RESULT_SUCCESS,
  GET_RESULT_FAILURE,
  GET_REPORT_LOADING,
  GET_REPORT_SUCCESS,
  GET_REPORT_FAILURE,
} from "./actionTypes";
import axios from "axios";
import { getFromStorage } from "../../../Utils/localStorageHelper";
import { storageEnums } from "../../../Enums/storageEnums";
const RESULT_API = process.env.REACT_APP_ATTEMPT_URL;
const REPORT_API = process.env.REACT_APP_ADMIN_QUESTION_API_URL;
console.log(REPORT_API);
const token = getFromStorage(storageEnums.TOKEN, "");

export const getResultRequest = () => ({
  type: GET_RESULT_LOADING,
});

export const getResultSuccess = (payload) => ({
  type: GET_RESULT_SUCCESS,
  payload,
});

export const getResultFailure = (payload) => ({
  type: GET_RESULT_FAILURE,
  payload,
});

export const getResult = ({ attempt_id }) => (dispatch) => {
  console.log(`${RESULT_API}/result/${attempt_id}`);
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

export const getReportRequest = () => ({
  type: GET_REPORT_LOADING,
});

export const getReportSuccess = (payload) => ({
  type: GET_REPORT_SUCCESS,
  payload,
});

export const getReportFailure = (payload) => ({
  type: GET_REPORT_FAILURE,
  payload,
});

export const getReport = ({ question_id, reason, des }) => (dispatch) => {
  // console.log(`${REPORT_API}/report/${id}`);
  console.log(question_id, reason, des, "redux");
  dispatch(getReportRequest);
  axios({
    method: "PATCH",
    url: `${REPORT_API}/report/${question_id}`,
    headers: { Authorization: `Bearer ${token}` },
    data: {
      reason: reason,
      description: des,
    },
  })
    .then((res) => console.log(res, "res"))
    .catch((err) => dispatch(getReportFailure(err)));
};
