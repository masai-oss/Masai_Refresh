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

const userSigninRequest = () => ({
  type: authConstants.USERS_SIGNIN_REQUEST,
});

const userSigninSuccess = (payload) => ({
  type: authConstants.USERS_SIGNIN_SUCCESS,
  payload,
});

const userSigninFailure = (payload) => ({
  type: authConstants.USERS_SIGNIN_FAILURE,
  payload,
});

const resentOTPRequest = () => ({
  type: authConstants.RESEND_OTP_REQUEST,
});

const resentOTPSuccess = (payload) => ({
  type: authConstants.RESEND_OTP_SUCCESS,
  payload,
});

const resentOTPFailure = (payload) => ({
  type: authConstants.RESEND_OTP_FAILURE,
  payload,
});

const forgetPasswordRequest = () => ({
  type: authConstants.FORGET_PASSWORD_REQUEST,
});

const forgetPasswordSuccess = (payload) => ({
  type: authConstants.FORGET_PASSWORD_SUCCESS,
  payload,
});

const forgetPasswordFailure = (payload) => ({
  type: authConstants.FORGET_PASSWORD_FAILURE,
  payload,
});

// reset password

const resetPasswordRequest = () => ({
  type: authConstants.RESET_PASSWORD_REQUEST,
});

const resetPasswordSuccess = (payload) => ({
  type: authConstants.RESET_PASSWORD_SUCCESS,
  payload,
});

const resetPasswordFailure = (payload) => ({
  type: authConstants.RESET_PASSWORD_FAILURE,
  payload,
});

const storeOtp = (payload) => ({
  type: authConstants.STORE_OTP,
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
      .then((res) => dispatch(userSignUpSuccess(res.data)))
      .catch((err) => {
        console.log(err.response, "err");
        dispatch(userSignUpFailure(err.response.data));
      });
  };

//user verification

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
        OTP: otp,
      },
    };
    return axios(config)
      .then((res) => dispatch(userVerificationSuccess(res.data)))
      .catch((err) => {
        dispatch(userVerificationFailure(err.response.data));
        console.log(err.response);
      });
  };

// signin

const userSigninProcess =
  ({ email, password }) =>
  async (dispatch) => {
    dispatch(userSigninRequest());
    const config = {
      method: "POST",
      url: `${AUTH_API_URL}/signin`,
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        email: email,
        password: password,
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
      return dispatch(userSigninSuccess(res.data));
    } catch (err) {
      return dispatch(userSigninFailure(err.response));
    }
  };

// Resend OTP

const resendOtpProcess =
  ({ email }) =>
  async (dispatch) => {
    dispatch(resentOTPRequest());
    const config = {
      method: "POST",
      url: `${AUTH_API_URL}/email_verification/resend_otp`,
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        email: email,
      },
    };
    return axios(config)
      .then((res) => dispatch(resentOTPSuccess(res)))
      .catch((err) => {
        console.log(err);
      });
  };

//FORGET PASSWORD

const forgetPasswordProcess =
  ({ email }) =>
  async (dispatch) => {
    dispatch(forgetPasswordRequest());
    const config = {
      method: "POST",
      url: `${AUTH_API_URL}/password_resst/send_otp`,
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        email: email,
      },
    };
    return axios(config)
      .then((res) =>
        dispatch(forgetPasswordSuccess({ status: res.status, email: email }))
      )
      .catch((err) => {
        dispatch(forgetPasswordFailure(err.response.data));
        console.log("errrrrrrrr", err.response.data);
      });
  };

//RESET PASSWORD

const resetPasswordProcess =
  ({ email, password, otp }) =>
  async (dispatch) => {
    dispatch(resetPasswordRequest());
    const config = {
      method: "POST",
      url: `${AUTH_API_URL}/password_reset`,
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        email: email,
        new_password: password,
        OTP: otp,
      },
    };
    return axios(config)
      .then((res) => dispatch(resetPasswordSuccess(res.data)))
      .catch((err) => {
        dispatch(resetPasswordFailure(err.response.data));
        console.log("errrrrrrrr", err.response.data);
      });
  };

export const authActions = {
  userSignUpProcess: userSignUpProcess,
  userVerficationProcess: userVerficationProcess,
  userSigninProcess: userSigninProcess,
  resendOtpProcess: resendOtpProcess,
  forgetPasswordProcess: forgetPasswordProcess,
  resetPasswordProcess: resetPasswordProcess,
  storeOtp: storeOtp,
};
