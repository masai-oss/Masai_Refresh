import { resultConstant } from "./actionTypes";

import axios from "axios";

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
  console.log(payload.quizId)
  axios({
    method: "GET",
    url: `/api/quiz/result/${payload.quizId}`,
    headers: "bearer-token"
  })
  // .then((res) => console.log(res))
    .then((res) => dispatch(getResultSuccess(res)))
    // .then((res) => console.log(res))
    .catch((err) => dispatch(getResultFailure(err)));
    // .catch((err) => console.log(err))
};