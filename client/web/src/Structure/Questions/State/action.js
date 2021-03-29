import { 
  GET_QUIZ_QUESTION_LOADING, 
  GET_QUIZ_QUESTION_FAILURE, 
  GET_QUIZ_QUESTION_SUCCESS,
  
  RECORD_ANSWER_LOADING,
  RECORD_ANSWER_SUCCESS,
  RECORD_ANSWER_FAILURE,
  
  ATTEMPT_QUIZ_LOADING,
  ATTEMPT_QUIZ_SUCCESS,
  ATTEMPT_QUIZ_FAILURE
} from "./actionTypes";
import axios from "axios";
import { getFromStorage } from "../../../Utils/localStorageHelper";
import { storageEnums } from "../../../Enums/storageEnums";
const ATTEMPT_API_URL = process.env.REACT_APP_ATTEMPT_URL;



const getQuizQuestionLoading = () => ({
  type: GET_QUIZ_QUESTION_LOADING,
});

const getQuizQuestionFailure = (payload) => ({
  type: GET_QUIZ_QUESTION_FAILURE,
  payload,
});

const getQuizQuestionSuccess = (payload) => ({
  type: GET_QUIZ_QUESTION_SUCCESS,
  payload,
});

const getQuizQuestion = (payload) => (dispatch) => {
  const { attempt_id, submission_id, question_id } = payload
  dispatch(getQuizQuestionLoading());
  const token = getFromStorage(storageEnums.TOKEN, "");
  return axios({
    method: "GET",
    url: `${ATTEMPT_API_URL}/question`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      attempt_id,
      submission_id,
      question_id
    }
  })
  .then((res) => {
    dispatch(getQuizQuestionSuccess(res.data.data))
    return {output: true} 
  })
  .catch((err) => {
    dispatch(getQuizQuestionFailure(err + ''))
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

const recordAnswer = ({submission_id, attempt_id, answer_type, response, selected, decision, question_id}) => (dispatch) => {
  dispatch(recordAnswerLoading())
  const token = getFromStorage(storageEnums.TOKEN, "");
  return axios({
    method: "PATCH",
    url: `${ATTEMPT_API_URL}/record`,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    data: {
      submission_id,
      attempt_id,
      question_id,
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



// attempt 
//------------------------------------------------------------------

const attemptQuizLoading = () => ({
  type: ATTEMPT_QUIZ_LOADING,
});

const attemptQuizSuccess = (payload) => ({
  type: ATTEMPT_QUIZ_SUCCESS,
  payload,
});

const attemptQuizFailure = (payload) => ({
  type: ATTEMPT_QUIZ_FAILURE,
  payload,
});

const attemptQuiz = ({topic_id, topic, size}) => (dispatch, state) => {
  dispatch(attemptQuizLoading());
  const token = getFromStorage(storageEnums.TOKEN, "");
  const config = {
    method: "POST",
    url: `${ATTEMPT_API_URL}/create`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      topic_id,
      size: size || 5
    },
  }

  return axios(config)
  .then(res => {
    dispatch(attemptQuizSuccess(res.data.data));
    return {output: true, state: {...res.data.data, topic}}
  })
  .catch(err => {
    dispatch(attemptQuizFailure(err.response));
    return {output: false}
  })
};



export const questionActions = {
  getQuizQuestion,
  recordAnswer,
  attemptQuiz
};