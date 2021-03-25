import { 
  GET_QUESTION_LOADING, 
  GET_QUESTION_FAILURE, 
  GET_QUESTION_SUCCESS,
  
  RECORD_ANSWER_LOADING,
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

const nextQuestion = ({ attemptId, submissionId, question_id }) => (dispatch) => {
  dispatch(nextQuestionLoading());
  const token = getFromStorage(storageEnums.TOKEN, "");
  axios({
    method: "GET",
    url: `${GET_QUESTIONS_URL}/next?attempt_id=${attemptId}&submission_id=${submissionId}&question_id=${question_id}`,
    headers: {
      Authorization: `Bearer ${token}`,
    }
  })
  .then((res) => {
    dispatch(nextQuestionSuccess(res.data.data))
    return {output: true}
  })
  .catch((err) => {
    dispatch(nextQuestionFailure(err))
    return {output: false}
  });
};




// record
// -----------------------------------------------------

const recordAnswerLoading = () => ({
  type: RECORD_ANSWER_LOADING,
});

const recordAnswerSuccess = (payload) => ({
  type: RECORD_ANSWER_SUCCESS,
  payload,
});

const recordAnswerFailure = (payload) => ({
  type: RECORD_ANSWER_FAILURE,
  payload,
});

const recordAnswer = ({submission_id, attempt_id, answer_type, response, selected, decision}) => (dispatch) => {
  dispatch(recordAnswerLoading())
  const token = getFromStorage(storageEnums.TOKEN, "");
  return axios({
    method: "PATCH",
    url: `${GET_QUESTIONS_URL}/record`,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    data: {
      submission_id,
      attempt_id,
      answer_type,
      response,
      selected,
      decision
    },
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
  nextQuestion,
  recordAnswer,
};