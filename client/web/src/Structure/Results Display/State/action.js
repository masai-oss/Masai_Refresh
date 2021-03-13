import { resultConstant } from "./actionTypes";

import axios from "axios";
import { recordAnswer } from "../../Questions/State/action";

const RESULT_API = process.env.REACT_APP_ATTEMPT_URL;
const token = localStorage.getItem("token");

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

export const getResult = ({ attemptId, payload }) => (dispatch) => {
    
  dispatch(recordAnswer(payload))
    .then(dispatch(getResultRequest()))
    .then(
      axios({
        method: "GET",
        url: `${RESULT_API}/result/${attemptId}`,
        headers: { Authorization: `Bearer ${token}` },
      }).then((res) => dispatch(getResultSuccess(res.data)))
    )

    .catch((err) => dispatch(getResultFailure(err)));
};
