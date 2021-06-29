import { authConstants } from "./actionTypes";
import axios from "axios";
import { storageEnums } from "../../../Enums/storageEnums";
import {
  saveToStorage,
  removeFromStorage,
} from "../../../Utils/localStorageHelper";

import { getFromStorage } from "../../../Utils/localStorageHelper";
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

// user sign up
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
      .then((res) => {
        dispatch(userSignUpSuccess(res.data));
      })
      .catch((err) => {
        dispatch(userSignUpFailure(err.response.data));
      });
  };

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
      .then((res) => {
        dispatch(userVerificationSuccess(res.data));
      })
      .catch((err) => {
        dispatch(userVerificationFailure(err.response.data));
      });
  };
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
      return dispatch(userSigninFailure(err.response.data));
    }
  };

const resendOTPRequest = () => ({
  type: authConstants.RESEND_OTP_REQUEST,
});

const resendOTPSuccess = (payload) => ({
  type: authConstants.RESEND_OTP_SUCCESS,
  payload,
});

const resendOTPFailure = (payload) => ({
  type: authConstants.RESEND_OTP_FAILURE,
  payload,
});

// Resend OTP

const resendOtpProcess =
  ({ email }) =>
  async (dispatch) => {
    dispatch(resendOTPRequest());
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
      .then((res) => dispatch(resendOTPSuccess(res)))
      .catch((err) => {
        dispatch(resendOTPFailure(err.response.data));
      });
  };

// resend forgot passowrd otp

const resendForgotOtpRequest = () => ({
  type: authConstants.RESEND_OTP_REQUEST,
});

const resendForgotOtpSuccess = (payload) => ({
  type: authConstants.RESEND_OTP_SUCCESS,
  payload,
});

const resendForgotOtpFailure = (payload) => ({
  type: authConstants.RESEND_OTP_FAILURE,
  payload,
});

// Resend forgot password OTP

const resendForgotOtpProcess =
  ({ email }) =>
  async (dispatch) => {
    dispatch(resendForgotOtpRequest());
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
      .then((res) => dispatch(resendForgotOtpSuccess(res)))
      .catch((err) => {
        dispatch(resendForgotOtpFailure(err.response.data));
      });
  };

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
      .then((res) => {
        dispatch(
          forgetPasswordSuccess({
            status: res.status,
            email: email,
            error: res.data.error,
          })
        );
      })
      .catch((err) => {
        dispatch(forgetPasswordFailure(err.response.data));
      });
  };

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

//RESET PASSWORD

const resetPasswordProcess =
  ({ email, password, otp }) =>
  async (dispatch) => {
    dispatch(resetPasswordRequest());
    const TEMP_PASS = getFromStorage(storageEnums.TEMP_PASS, "");
    const config = {
      method: "POST",
      url: `${AUTH_API_URL}/password_reset`,
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        new_password: password,
        pass: TEMP_PASS,
      },
    };
    return axios(config)
      .then((res) => {
        console.log("[action] : ", res);
        dispatch(resetPasswordSuccess(res.data));
      })
      .catch((err) => {
        dispatch(resetPasswordFailure(err.response.data));
      });
  };
// const storeOtp = (payload) => ({
//   type: authConstants.STORE_OTP,
//   payload,
// });

// reset password otp verification

const resetPasswordOtpRequest = () => ({
  type: authConstants.RESET_PASSWORD_OTP_REQUEST,
});

const resetPasswordOtpSuccess = (payload) => ({
  type: authConstants.RESET_PASSWORD_OTP_SUCCESS,
  payload,
});

const resetPasswordOtpFailure = (payload) => ({
  type: authConstants.RESET_PASSWORD_OTP_FAILURE,
  payload,
});

const resetPasswordOtpProcess =
  ({ email, otp }) =>
  async (dispatch) => {
    dispatch(resetPasswordOtpRequest());
    const config = {
      method: "POST",
      url: `${AUTH_API_URL}/password_reset/verify_otp`,
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        email: email,
        OTP: otp,
      },
    };

    return axios(config)
      .then((res) => {
        dispatch(resetPasswordOtpSuccess(res.data.data));
      })
      .catch((err) => {
        dispatch(resetPasswordOtpFailure(err.response.data));
      });
  };

// logout

const logoutRequest = () => ({
  type: authConstants.LOGOUT_REQUEST,
});

const logoutSuccess = () => ({
  type: authConstants.LOGOUT_SUCCESS,
});

const logoutFailure = () => ({
  type: authConstants.LOGOUT_FAILURE,
});

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

const changeThisState = (payload) => ({
  type: authConstants.CHANGE_THIS_STATE,
  payload,
});
export const authActions = {
  userSignUpProcess: userSignUpProcess,
  userVerficationProcess: userVerficationProcess,
  userSigninProcess: userSigninProcess,
  resendOtpProcess: resendOtpProcess,
  forgetPasswordProcess: forgetPasswordProcess,
  resetPasswordProcess: resetPasswordProcess,
  logoutProcess: logoutProcess,
  resetPasswordOtpProcess: resetPasswordOtpProcess,
  resendForgotOtpProcess: resendForgotOtpProcess,
  changeThisState: changeThisState,
};
