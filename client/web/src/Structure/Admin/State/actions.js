import { adminConstants } from './actionTypes'
import axios from 'axios'
 
const getQuestionsLoading = () => ({
    type: adminConstants.GET_ALL_QUESTIONS_LOADING,
  });
  
  const getQuestionsSuccess = (payload) => ({
    type: adminConstants.GET_ALL_QUESTIONS_SUCCESS,
    payload,
  });
  
  const getQuestionsFailure = (data) => ({
    type: adminConstants.GET_ALL_QUESTIONS_FAILURE,
    payload: data
  });
  
  export const getQuestionsRequest = (page = 1, limit = 10) => (dispatch) => {
    dispatch(getQuestionsLoading());
    const token = (localStorage.getItem('token'))
    let url = `http://localhost:5050/api/question/all/?page=${page+1}&limit=${limit}`

    axios({
      method: "get",
      url: url,
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) =>dispatch(getQuestionsSuccess(res.data)) )
      .catch((err) => dispatch(getQuestionsFailure(err)));
  };

const getTopicsLoading = () => ({
    type: adminConstants.GET_TOPICS_LOADING,
  });
  
  const getTopicsSuccess = (payload) => ({
    type: adminConstants.GET_TOPICS_SUCCESS,
    payload,
  });
  
  const getTopicsFailure = (data) => ({
    type: adminConstants.GET_TOPICS_FAILURE,
    payload: data,
  });
  
  export const getTopicsRequest = () => (dispatch) => {
    dispatch(getTopicsLoading());

    const token = (localStorage.getItem('token'))

    axios({
      method: "get",
      url: `http://localhost:5050/api/topic`,
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => dispatch(getTopicsSuccess(res.data)) )
      .catch((err) => dispatch(getTopicsFailure(err)));
  };


  const getQuestionsByTopicLoading = () => ({
    type: adminConstants.GET_QUESTIONS_BY_TOPIC_LOADING,
  });
  
  const getQuestionsByTopicSuccess = (payload) => ({
    type: adminConstants.GET_QUESTIONS_BY_TOPIC_SUCCESS,
    payload,
  });
  
  const getQuestionsByTopicFailure = (data) => ({
    type: adminConstants.GET_QUESTIONS_BY_TOPIC_FAILURE,
    payload: data
  });
  
  export const getQuestionsByTopicRequest = (topic) => (dispatch) => {
    console.log(topic)
    dispatch(getQuestionsByTopicLoading());
    const token = (localStorage.getItem('token'))
    let url = `http://localhost:5050/api/question/byTopic/${topic}`

    axios({
      method: "get",
      url: url,
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => { console.log(res.data); return dispatch(getQuestionsByTopicSuccess(res.data)) } )
      .catch((err) => dispatch(getQuestionsByTopicFailure(err)));
  };

  
  const addQuestionsLoading = () => ({
    type: adminConstants.ADD_QUESTION_LOADING,
  });
  
  const addQuestionsSuccess = (payload) => ({
    type: adminConstants.ADD_QUESTION_SUCCESS,
    payload,
  });
  
  const addQuestionsFailure = (data) => ({
    type: adminConstants.ADD_QUESTION_FAILURE,
    payload: data
  });
  
  export const addQuestionsRequest = (payload) => (dispatch) => {
    dispatch(addQuestionsLoading());
    const token = (localStorage.getItem('token'))
    let url = `http://localhost:5050/api/question/add/:topic/`

    axios({
      method: "post",
      url: url,
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: payload
    })
      .then((res) => { console.log(res.data); return dispatch(addQuestionsSuccess(res.data)) } )
      .catch((err) => dispatch(addQuestionsFailure(err)));
  };
  
  const deleteQuestionsLoading = () => ({
    type: adminConstants.DELETE_QUESTION_LOADING,
  });
  
  const deleteQuestionsSuccess = (payload) => ({
    type: adminConstants.DELETE_QUESTION_SUCCESS,
    payload,
  });
  
  const deleteQuestionsFailure = (data) => ({
    type: adminConstants.DELETE_QUESTION_FAILURE,
    payload: data
  });
  
  export const deleteQuestionsRequest = (id, topic) => (dispatch) => {
    dispatch(deleteQuestionsLoading());
    const token = (localStorage.getItem('token'))
    let url = `http://localhost:5050/api/question/delete/${topic}/${id}`

    axios({
      method: "post",
      url: url,
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      }
    })
      .then((res) => { console.log(res.data); return dispatch(deleteQuestionsSuccess(res.data)) } )
      .catch((err) => dispatch(deleteQuestionsFailure(err)));
  };