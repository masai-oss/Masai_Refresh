import { authConstants } from "./actionTypes";
import axios from "axios";
import { storageEnums } from "../../../Enums/storageEnums";
import {
  saveToStorage,
  removeFromStorage,
} from "../../../Utils/localStorageHelper";

const AUTH_API_URL = process.env.REACT_APP_AUTH_API_URL;

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

const userVerificationRequest = () => ({
  type: authConstants.USERS_VERIFICATION_REQUEST,
});

const userVerificationSuccess = (payload) => ({
  type: authConstants.USERS_VERIFICATION_SUCCESS,
  payload,
});

const userVerificationFailure = (payload) => ({
  type: authConstants.USERS_VERIFICATION_FAILURE,
  payload,
});

const userSignUpProcess =
  ({ name, email, password }) =>
  async (dispatch) => {
    dispatch(userSignUpRequest());
    const config = {
      method: "POST",
      url: `${AUTH_API_URL}/signup`,
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        email: email,
        name: name,
        password: password,
      },
    };
    return axios(config)
      .then((res) => console.log(res))
      .catch((err) => {
        console.log(err);
      });
  };

const userVerficationProcess =
  ({ email, otp }) =>
  async (dispatch) => {
    dispatch(userVerificationRequest());
    const config = {
      method: "POST",
      url: `${AUTH_API_URL}/verify_user`,
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        email: email,
        otp: otp,
      },
    };
    return axios(config)
      .then((res) => console.log(res))
      .catch((err) => {
        console.log(err);
      });
  };

export const authActions = {
  userSignUpProcess: userSignUpProcess,
};
