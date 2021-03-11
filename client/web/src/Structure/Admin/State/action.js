import {adminConstants} from './actionTypes'
import axios from 'axios'

const TOPIC_API = process.env.REACT_APP_ADMIN_TOPIC_API_URL
const QUESTION_URL = process.env.REACT_APP_ADMIN_QUESTION_API_URL;

const getCrudTopicsRequest = () => {
    return{
        type: adminConstants.GET_CRUD_TOPICS_REQUEST
    }
}

const getCrudTopicsSuccess = (payload) => {
    return{
        type: adminConstants.GET_CRUD_TOPICS_SUCCESS,
        payload
    }
}


const getCrudTopicsFailure = (payload) => {
    return{
        type: adminConstants.GET_CRUD_TOPICS_FAILURE,
        payload
    }
}

const getCrudTopics = () => async (dispatch) => {
    dispatch(getCrudTopicsRequest())
    let token = localStorage.getItem("token");
    const config = {
        method: "get",
        url: TOPIC_API,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
    };

    try {
        const res = await axios(config);
        dispatch(getCrudTopicsSuccess(res.data.data));
        return "success";
      } catch (err) {
        dispatch(getCrudTopicsFailure(err));
        return "failure";
      }

}

const postCrudTopicsRequest = () => {
    return{
        type: adminConstants.POST_CRUD_TOPIC_REQUEST
    }
}

const postCrudTopicsSuccess = (payload) => {
    return{
        type: adminConstants.POST_CRUD_TOPIC_SUCCESS,
        payload
    }
}


const postCrudTopicsFailure = (payload) => {
    return{
        type: adminConstants.POST_CRUD_TOPIC_FAILURE,
        payload
    }
}


const postCrudTopics = (payload) => async (dispatch) => {
    dispatch(postCrudTopicsRequest())
    let token = localStorage.getItem("token");
    const config = {
        method: "post",
        url: `${TOPIC_API}/create`,
        data: payload,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
    };

    try {
        const res = await axios(config);
        dispatch(postCrudTopicsSuccess(res));
        dispatch(getCrudTopics())
        return "success";
      } catch (err) {
        dispatch(postCrudTopicsFailure(err));
        return "failure";
      }

}

const getCrudTopicByIdRequest = () => {
    return{
        type: adminConstants.GET_BY_CRUD_TOPIC_ID_REQUEST
    }
}

const getCrudTopicByIdSuccess = (payload) => {
    return{
        type: adminConstants.GET_BY_CRUD_TOPIC_ID_SUCCESS,
        payload
    }
}


const getCrudTopicByIdFailure = (payload) => {
    return{
        type: adminConstants.GET_BY_CRUD_TOPIC_ID_FAILURE,
        payload
    }
}

const getCrudTopicById = (payload) => async (dispatch) => {
    dispatch(getCrudTopicByIdRequest())
    let token = localStorage.getItem("token");
    const config = {
        method: "get",
        url: `${TOPIC_API}/id/${payload}`,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
    };

    try {
        const res = await axios(config);
        dispatch(getCrudTopicByIdSuccess(res.data.data));
        return "success";
      } catch (err) {
        dispatch(getCrudTopicByIdFailure(err));
        return "failure";
      }

}

const deleteCrudTopicRequest = () => {
    return{
        type: adminConstants.DELETE_CRUD_TOPIC_REQUEST
    }
}

const deleteCrudTopicSuccess = (payload) => {
    return{
        type: adminConstants.DELETE_CRUD_TOPIC_SUCCESS
    }
}


const deleteCrudTopicFailure = (payload) => {
    return{
        type: adminConstants.DELETE_CRUD_TOPIC_FAILURE,
        payload
    }
}


const deleteCrudTopic = (payload) => async (dispatch) => {
    dispatch(deleteCrudTopicRequest())
    let token = localStorage.getItem("token");
    const config = {
        method: "delete",
        url: `${TOPIC_API}/${payload}`,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
    };

    try {
        const res = await axios(config);
        dispatch(deleteCrudTopicSuccess(res));
        dispatch(getCrudTopics())
        return "success";
      } catch (err) {
        dispatch(deleteCrudTopicFailure(err));
        return "failure";
      }

}

const updateCrudTopicsRequest = () => {
    return{
        type: adminConstants.PUT_CRUD_TOPIC_REQUEST
    }
}

const updateCrudTopicsSuccess = (payload) => {
    return{
        type: adminConstants.PUT_CRUD_TOPIC_SUCCESS,
        payload
    }
}


const updateCrudTopicsFailure = (payload) => {
    return{
        type: adminConstants.PUT_CRUD_TOPIC_FAILURE,
        payload
    }
}


const updateCrudTopics = (payload, id) => async (dispatch) => {
    dispatch(updateCrudTopicsRequest())
    let token = localStorage.getItem("token");
    const config = {
        method: "put",
        url: `${TOPIC_API}/${id}`,
        data: payload,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
    };

    try {
        const res = await axios(config);
        dispatch(updateCrudTopicsSuccess(res));
        dispatch(getCrudTopics())
        return "success";
      } catch (err) {
        dispatch(updateCrudTopicsFailure(err));
        return "failure";
      }

}

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
  
  const getQuestionsRequest = (page = 0, limit = 10) => (dispatch) => {
    dispatch(getQuestionsLoading());
    const token = (localStorage.getItem('token'))
    let url = `${QUESTION_URL}/all/?page=${page+1}&limit=${limit}`

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
  
const getTopicsRequest = () => (dispatch) => {
    dispatch(getTopicsLoading());

    const token = (localStorage.getItem('token'))

    axios({
      method: "get",
      url: `${TOPIC_API}`,
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
  
const getQuestionsByTopicRequest = (topic) => (dispatch) => {
    dispatch(getQuestionsByTopicLoading());
    const token = (localStorage.getItem('token'))
    let url = `${QUESTION_URL}/byTopic/${topic}`

    axios({
      method: "get",
      url: url,
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => dispatch(getQuestionsByTopicSuccess(res.data)) )
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
  
const addQuestionsRequest = (payload, topic) => (dispatch) => {
    dispatch(addQuestionsLoading());
    const token = (localStorage.getItem('token'))
    let url = `${QUESTION_URL}/create/${topic}/`

    axios({
      method: "post",
      url: url,
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: payload
    })
    .then((res) => { console.log(res.data);  dispatch(addQuestionsSuccess(res.data)) })
    .catch((err) => { console.log(err); return dispatch(addQuestionsFailure(err)) });
  };
  
  const deleteQuestionsLoading = () => ({
    type: adminConstants.DELETE_QUESTION_LOADING,
  });
  
  const deleteQuestionsSuccess = (payload, id) => ({
    type: adminConstants.DELETE_QUESTION_SUCCESS,
    payload,
    id
  });
  
  const deleteQuestionsFailure = (data) => ({
    type: adminConstants.DELETE_QUESTION_FAILURE,
    payload: data
  });
  
const deleteQuestionsRequest = (id, topic) => (dispatch) => {
    dispatch(deleteQuestionsLoading());
    const token = (localStorage.getItem('token'))
    let url = `${QUESTION_URL}/delete/${topic}/${id}`

    axios({
      method: "delete",
      url: url,
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      }
    })
      .then((res) => dispatch(deleteQuestionsSuccess(res.data, id)) )
      .catch((err) => dispatch(deleteQuestionsFailure(err)));
  };

export const adminActions = {
    getCrudTopics,
    postCrudTopics: postCrudTopics,
    getCrudTopicById,
    deleteCrudTopic,
    updateCrudTopics,
    getQuestionsRequest,
    getTopicsRequest,
    getQuestionsByTopicRequest,
    deleteQuestionsRequest,
    addQuestionsRequest
}