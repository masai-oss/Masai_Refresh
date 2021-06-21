import { adminConstants } from "./actionTypes";
import axios from "axios";
import { getFromStorage } from "../../../Utils/localStorageHelper";
import { storageEnums } from "../../../Enums/storageEnums";

const TOPIC_API = process.env.REACT_APP_ADMIN_TOPIC_API_URL;
const QUESTION_URL = process.env.REACT_APP_ADMIN_QUESTION_API_URL;
const getCrudTopicsRequest = () => {
  return {
    type: adminConstants.GET_CRUD_TOPICS_REQUEST,
  };
};

const getCrudTopicsSuccess = (payload) => {
  return {
    type: adminConstants.GET_CRUD_TOPICS_SUCCESS,
    payload,
  };
};

const getCrudTopicsFailure = (payload) => {
  return {
    type: adminConstants.GET_CRUD_TOPICS_FAILURE,
    payload,
  };
};

const getCrudTopics = () => async (dispatch) => {
  dispatch(getCrudTopicsRequest());
  const token = getFromStorage(storageEnums.TOKEN, "");
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
};

const getCrudTopicByIdRequest = () => {
  return {
    type: adminConstants.GET_BY_CRUD_TOPIC_ID_REQUEST,
  };
};

const getCrudTopicByIdSuccess = (payload) => {
  return {
    type: adminConstants.GET_BY_CRUD_TOPIC_ID_SUCCESS,
    payload,
  };
};

const getCrudTopicByIdFailure = (payload) => {
  return {
    type: adminConstants.GET_BY_CRUD_TOPIC_ID_FAILURE,
    payload,
  };
};

const getCrudTopicById = (payload) => async (dispatch) => {
  dispatch(getCrudTopicByIdRequest());
  const token = getFromStorage(storageEnums.TOKEN, "");
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
};

const getQuestionsLoading = () => ({
  type: adminConstants.GET_ALL_QUESTIONS_LOADING,
});

const getQuestionsSuccess = (payload) => ({
  type: adminConstants.GET_ALL_QUESTIONS_SUCCESS,
  payload,
});

const getQuestionsFailure = (data) => ({
  type: adminConstants.GET_ALL_QUESTIONS_FAILURE,
  payload: data,
});

const getQuestionsRequest = (page = 1, limit = 10, disabledFilter = false, reportedFilter = false) => (dispatch) => {
  dispatch(getQuestionsLoading());
  const token = getFromStorage(storageEnums.TOKEN, "");
  let url = `${QUESTION_URL}/all/?page=${page}&limit=${limit}&disabledFilter=${disabledFilter}&reportedFilter=${reportedFilter}`;

  axios({
    method: "get",
    url: url,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })
    .then((res) => dispatch(getQuestionsSuccess(res.data)))
    .catch((err) => dispatch(getQuestionsFailure(err)));
};

const getQuestionLoading = () => ({
  type: adminConstants.GET_QUESTION_LOADING,
});

const getQuestionSuccess = (payload) => ({
  type: adminConstants.GET_QUESTION_SUCCESS,
  payload,
});

const getQuestionFailure = (data) => ({
  type: adminConstants.GET_QUESTION_FAILURE,
  payload: data,
});

const getQuestionRequest = (id) => (dispatch) => {
  dispatch(getQuestionLoading());
  const token = getFromStorage(storageEnums.TOKEN, "");
  let url = `${QUESTION_URL}/byId/${id}`;

  axios({
    method: "get",
    url: url,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })
    .then((res) => dispatch(getQuestionSuccess(res.data)))
    .catch((err) => dispatch(getQuestionFailure(err)));
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

  const token = getFromStorage(storageEnums.TOKEN, "");

  axios({
    method: "get",
    url: `${TOPIC_API}`,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })
    .then((res) => dispatch(getTopicsSuccess(res.data)))
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
  payload: data,
});

const getQuestionsByTopicRequest = (topic, page = 1, limit = 10, disabledFilter = false, reportedFilter = false) => (
  dispatch
) => {
  dispatch(getQuestionsByTopicLoading());
  const token = getFromStorage(storageEnums.TOKEN, "");
  let url = `${QUESTION_URL}/byTopic/${topic}/?page=${page}&limit=${limit}&disabledFilter=${disabledFilter}&reportedFilter=${reportedFilter}`;

  axios({
    method: "get",
    url: url,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })
    .then((res) => dispatch(getQuestionsByTopicSuccess(res.data)))
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
  payload: data,
});

const addQuestionsRequest = (payload, topic) => (dispatch) => {
  dispatch(addQuestionsLoading());
  const token = getFromStorage(storageEnums.TOKEN, "");
  let url = `${QUESTION_URL}/create/${topic}/`;

  axios({
    method: "post",
    url: url,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    data: payload,
  })
    .then((res) => dispatch(addQuestionsSuccess(res.data)))
    .catch((err) => dispatch(addQuestionsFailure(err)));
};

const disableQuestionsLoading = () => ({
  type: adminConstants.DISABLE_QUESTION_LOADING,
});

const disableQuestionsSuccess = (payload, id) => ({
  type: adminConstants.DISABLE_QUESTION_SUCCESS,
  payload,
  id,
});

const disableQuestionsFailure = (data) => ({
  type: adminConstants.DISABLE_QUESTION_FAILURE,
  payload: data,
});

const disableQuestionsRequest = (id, topic, type) => (dispatch) => {
  dispatch(disableQuestionsLoading());
  const token = getFromStorage(storageEnums.TOKEN, "");
  let url = `${QUESTION_URL}/delete/${topic}/${id}`;

  axios({
    method: "delete",
    url: url,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      dispatch(disableQuestionsSuccess(res.data, id));
      // dispatch(getQuestionsByTopicRequest(topic));
    })
    .catch((err) => dispatch(disableQuestionsFailure(err)));
};

const updateQuestionsLoading = () => ({
  type: adminConstants.EDIT_QUESTION_LOADING,
});

const updateQuestionsSuccess = (payload, id) => ({
  type: adminConstants.EDIT_QUESTION_SUCCESS,
  payload,
  id,
});

const updateQuestionsFailure = (data) => ({
  type: adminConstants.EDIT_QUESTION_FAILURE,
  payload: data,
});

const updateQuestionsRequest = (payload, id, topic) => (dispatch) => {
  dispatch(updateQuestionsLoading());
  const token = getFromStorage(storageEnums.TOKEN, "");
  let url = `${QUESTION_URL}/update/${topic}/${id}`;

  axios({
    method: "PUT",
    url: url,
    data: payload,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      dispatch(updateQuestionsSuccess(res.data, id));
      dispatch(getQuestionsRequest());
    })
    .catch((err) => dispatch(updateQuestionsFailure(err)));
};

const uploadIconRequest = () => ({
  type: adminConstants.UPLOAD_ICON_REQUEST,
});

const uploadIconSuccess = (payload) => ({
  type: adminConstants.UPLOAD_ICON_SUCCESS,
  payload,
});

const uploadIconFailure = (payload) => ({
  type: adminConstants.UPLOAD_ICON_FAILURE,
  payload,
});

const uploadIconProcess = ({ file: icon, id }) => async (dispatch) => {
  dispatch(uploadIconRequest());
  const token = getFromStorage(storageEnums.TOKEN, "");
  const config = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  let postData = new FormData();
  if (icon !== undefined) {
    postData.append("icon", icon);
  }
  try {
    const response = await axios.patch(
      `${TOPIC_API}/icon/${id}`,
      postData,
      config
    );
    dispatch(uploadIconSuccess(response));
    return "success";
  } catch (error) {
    dispatch(uploadIconFailure(error.response));
    return "failure";
  }
};

const verifyQuestionRequest = () => ({
  type: adminConstants.VERIFY_QUESTION_REQUEST,
});

const verifyQuestionSuccess = (payload) => ({
  type: adminConstants.VERIFY_QUESTION_SUCCESS,
  payload,
});

const verifyQuestionFailure = (payload) => ({
  type: adminConstants.VERIFY_QUESTION_FAILURE,
  payload,
});

const verifyQuestionAdjustment = (payload) => ({
  type: adminConstants.VERIFY_QUESTION_ADJUSTMENT,
  payload,
});

const verifyQuestionProcess = ({ id, verified: crnState, type }) => async (
  dispatch
) => {
  dispatch(verifyQuestionRequest());
  const token = getFromStorage(storageEnums.TOKEN, "");
  const config = {
    method: "patch",
    url: `${QUESTION_URL}/verify_toggle/${id}`,
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const response = await axios(config);
    dispatch(verifyQuestionSuccess({ response, id }));
    crnState && dispatch(verifyQuestionAdjustment(id));
  } catch (error) {
    dispatch(verifyQuestionFailure(error.response));
  }
};

export const adminActions = {
  getCrudTopics,
  getCrudTopicById,
  getQuestionsRequest,
  getTopicsRequest,
  getQuestionsByTopicRequest,
  disableQuestionsRequest,
  addQuestionsRequest,
  updateQuestionsRequest,
  getQuestionRequest,
  uploadIconProcess,
  verifyQuestionProcess,
};
