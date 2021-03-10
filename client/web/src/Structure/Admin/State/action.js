import {adminConstants} from './actionTypes'
import axios from 'axios'

const TOPIC_API = process.env.REACT_APP_ADMIN_TOPIC_API_URL

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

    const config = {
        method: "get",
        url: TOPIC_API
        // headers: {
        //   Authorization: `Bearer ${token}`,
        //   "Content-Type": "application/json",
        // },
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

    const config = {
        method: "post",
        url: `${TOPIC_API}/create`,
        data: payload
        // headers: {
        //   Authorization: `Bearer ${token}`,
        //   "Content-Type": "application/json",
        // },
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

    const config = {
        method: "get",
        url: `${TOPIC_API}/id/${payload}`
        // headers: {
        //   Authorization: `Bearer ${token}`,
        //   "Content-Type": "application/json",
        // },
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

    const config = {
        method: "delete",
        url: `${TOPIC_API}/${payload}`,
        // headers: {
        //   Authorization: `Bearer ${token}`,
        //   "Content-Type": "application/json",
        // },
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

    const config = {
        method: "put",
        url: `${TOPIC_API}/${id}`,
        data: payload
        // headers: {
        //   Authorization: `Bearer ${token}`,
        //   "Content-Type": "application/json",
        // },
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

export const adminActions = {
    getCrudTopicsRequest: getCrudTopicsRequest,
    getCrudTopicsSuccess: getCrudTopicsSuccess,
    getCrudTopicsFailure: getCrudTopicsFailure,
    getCrudTopics: getCrudTopics,
    postCrudTopicsRequest: postCrudTopicsRequest,
    postCrudTopicsSuccess: postCrudTopicsSuccess,
    postCrudTopicsFailure: postCrudTopicsFailure,
    postCrudTopics: postCrudTopics,
    getCrudTopicByIdRequest: getCrudTopicByIdRequest,
    getCrudTopicByIdSuccess: getCrudTopicByIdSuccess,
    getCrudTopicByIdFailure: getCrudTopicByIdFailure,
    getCrudTopicById: getCrudTopicById,
    deleteCrudTopicRequest: deleteCrudTopicRequest,
    deleteCrudTopicSuccess: deleteCrudTopicSuccess,
    deleteCrudTopicFailure: deleteCrudTopicFailure,
    deleteCrudTopic: deleteCrudTopic,
    updateCrudTopicsRequest: updateCrudTopicsRequest,
    updateCrudTopicsSuccess: updateCrudTopicsSuccess,
    updateCrudTopicsFailure: updateCrudTopicsFailure,
    updateCrudTopics: updateCrudTopics
}