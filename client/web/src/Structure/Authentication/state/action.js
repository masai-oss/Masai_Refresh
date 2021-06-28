import { authConstants } from "./actionTypes";
import axios from "axios";
import { storageEnums } from "../../../Enums/storageEnums";
import {
  saveToStorage,
  removeFromStorage,
} from "../../../Utils/localStorageHelper";

const AUTH_API_URL = process.env.REACT_APP_AUTH_API_URL;

const userLoginRequest = () => ({
  type: authConstants.USERS_LOGIN_REQUEST,
});

const userLoginSuccess = (payload) => ({
  type: authConstants.USERS_LOGIN_SUCCESS,
  payload,
});

const userLoginFailure = (payload) => ({
  type: authConstants.USERS_LOGIN_FAILURE,
  payload,
});

const userSignUpRequest = () => ({
  type: authConstants.USERS_SIGNUP_REQUEST,
});

const userSignUpSuccess = (payload) => ({
  type: authConstants.USERS_SIGNUP_SUCCESS,
  payload,
});

const userSignUpFailure = (payload) => ({
  type: authConstants.USERS_SIGNUP_FAILURE,
  payload,
});

const logoutRequest = () => ({
  type: authConstants.LOGOUT_REQUEST,
});

const logoutSuccess = () => ({
  type: authConstants.LOGOUT_SUCCESS,
});

const logoutFailure = () => ({
  type: authConstants.LOGOUT_FAILURE,
});

const userLoginProcess = () => async (dispatch) => {
  dispatch(userLoginRequest());
  const config = {
    method: "get",
    url: `${AUTH_API_URL}/current_user`,
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const res = await axios(config);
    const { user, token } = res.data;
    const { name, email, profilePic, _id } = user;
    saveToStorage(storageEnums.USER_ID, _id);
    saveToStorage(storageEnums.TOKEN, token);
    saveToStorage(storageEnums.NAME, name);
    saveToStorage(storageEnums.EMAIL, email);
    saveToStorage(storageEnums.PROFILEPIC, profilePic);
    return dispatch(userLoginSuccess(res.data));
  } catch (err) {
    return dispatch(userLoginFailure(err.response));
  }
};

const logoutProcess = () => async (dispatch) => {
  dispatch(logoutRequest());
  try {
    return dispatch(logoutSuccess());
  } catch (err) {
    return dispatch(logoutFailure());
  } finally {
    removeFromStorage(storageEnums.USER_ID);
    removeFromStorage(storageEnums.TOKEN);
    removeFromStorage(storageEnums.NAME);
    removeFromStorage(storageEnums.EMAIL);
    removeFromStorage(storageEnums.PROFILEPIC);
    removeFromStorage(storageEnums.ATTEMPT_ID);
    removeFromStorage(storageEnums.PRACTICE_RESULTS);
    removeFromStorage(storageEnums.QUESTION_PRACTICE);
    removeFromStorage(storageEnums.ALL_QUESTIONS_IDS);
    removeFromStorage(storageEnums.SUBMISSION_ID);
  }
};

export const authActions = {
  userLoginProcess: userLoginProcess,
  logoutProcess: logoutProcess,
};
