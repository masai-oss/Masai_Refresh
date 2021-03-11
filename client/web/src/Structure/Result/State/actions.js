import { resultConstant } from "./actionTypes";

import axios from "axios";


const RESULT_API = process.env.REACT_APP_RESULT_API_URL

export const getResultRequest = () => ({
    type: resultConstant.GET_RESULT_LOADING,
  });
  
export const getResultSuccess = (payload) => ({
  type: resultConstant.GET_RESULT_SUCCESS,
  payload,
});
  
export const getResultFailure = (payload) => ({
  type: resultConstant.GET_RESULT_FAILURE,
  payload,
});

export const getResult = (payload) => (dispatch) => {
  dispatch(getResultRequest());
  const token = localStorage.getItem("token");

  axios({
    method: "GET",
    url: `${RESULT_API}/:${payload.attempt_id}`,
    header : {Authorization: `Bearer ${token}`}
  })
  // .then((res) => console.log(res))
    .then((res) => dispatch(getResultSuccess(res)))
    .catch((err) => dispatch(getResultFailure(err)));
  // .catch((err) => console.log(err))
};