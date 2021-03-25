import { 
  GET_QUESTION_LOADING, 
  GET_QUESTION_FAILURE, 
  GET_QUESTION_SUCCESS,
  RECORD_ANSWER_SUCCESS,
  RECORD_ANSWER_FAILURE
} from "./actionTypes";
import axios from "axios";
import { getFromStorage } from "../../../Utils/localStorageHelper";
import { storageEnums } from "../../../Enums/storageEnums";
const GET_QUESTIONS_URL = process.env.REACT_APP_ATTEMPT_URL;



const nextQuestionLoading = () => ({
  type: GET_QUESTION_LOADING,
});

const nextQuestionFailure = (payload) => ({
  type: GET_QUESTION_FAILURE,
  payload,
});

const nextQuestionSuccess = (payload) => ({
  type: GET_QUESTION_SUCCESS,
  payload,
});

const nextQuestion = ({ attemptId, submissionId }) => (dispatch) => {
  dispatch(nextQuestionLoading());
  const token = getFromStorage(storageEnums.TOKEN, "");
  axios({
    method: "POST",
    url: `${GET_QUESTIONS_URL}/next`,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    data: {
      submission_id: submissionId,
      attempt_id: attemptId,
    },
  })
    .then((res) => dispatch(nextQuestionSuccess(res.data.data)))
    .catch((err) => dispatch(nextQuestionFailure(err)));
};




// record
// -----------------------------------------------------

const recordAnswerSuccess = (payload) => ({
  type: RECORD_ANSWER_SUCCESS,
  payload,
});

const recordAnswerFailure = (payload) => ({
  type: RECORD_ANSWER_FAILURE,
  payload,
});

const recordAnswer = (payload) => async(dispatch) => {
  // eslint-disable-next-line no-unused-vars
  let attemptId = payload.attempt_id, submissionId = payload.submission_id
  const token = getFromStorage(storageEnums.TOKEN, "");
  return axios({
    method: "PATCH",
    url: `${GET_QUESTIONS_URL}/record`,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    data: payload,
  })
  .then((res) => {
    dispatch(recordAnswerSuccess(res.data.message))
    return {output: true}
  })
  .catch((err) => {
    dispatch(recordAnswerFailure(err))
    return {output: false}
  });
};


export const questionActions = {
  nextQuestion: nextQuestion,
  recordAnswer: recordAnswer,
};