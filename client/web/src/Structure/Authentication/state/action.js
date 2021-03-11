import { authConstants } from "./actionTypes"
import axios from "axios"
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
      'Content-Type': 'application/json',
    }
  }

  try {
    const res = await axios(config);
    console.log(res.data)
    const { user, token } = res.data
    const { name, email, profilePic } = user
    localStorage.setItem("token", token)
    localStorage.setItem("name", name)
    localStorage.setItem("email", email)
    localStorage.setItem("profilePic", profilePic)
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
  }
  finally{
    localStorage.removeItem("token")
    localStorage.removeItem("name")
    localStorage.removeItem("email")
    localStorage.removeItem("profilePic")
  }
};


export const authActions = {
  userLoginProcess: userLoginProcess,
  logoutProcess: logoutProcess,
};
