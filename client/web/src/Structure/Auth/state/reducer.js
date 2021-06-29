import { authConstants } from "./actionTypes";
import { getFromStorage } from "../../../Utils/localStorageHelper";
import { storageEnums } from "../../../Enums/storageEnums";

import LogRocket from "logrocket";
LogRocket.init("zpsfu7/refresh-localhost");

const initState = {
  isSignUp: false,
  signUpError: false,
  email: "",

  userVerif: false,

  isSignIn: false,
  token: "",
  userData: [],

  isLoading: false,

  otpVerification: false,

  resendOtp: "",
  otp: "",
  passwordRecovered: false,

  logoutError: "",

  resetPassOtpVerif: false,
  resetPassTemp: "",

  errorMessageSignUp: "",
  errorMessageUserVerification: "",
  errorMessageResendUserVerification: "",

  errorMessageUserSignIn: "",

  errorMessageForgetPassword: "",
  errorMessageResetPasswordOtp: "",
  errorMessageResetPassword: "",

  errorMessageLogout: "",
};

const authenticationNew = (state = initState, { type, payload }) => {
  switch (type) {
    // signup
    case authConstants.USERS_SIGNUP_REQUEST:
      return {
        ...state,
        isSignUp: false,
        isLoading: true,
        errorMessageSignUp: "",
      };
    case authConstants.USERS_SIGNUP_SUCCESS:
      console.log("Reducer: ", payload);
      return {
        ...state,
        isLoading: false,
        isSignUp: true,
        signUpError: false,
        email: payload.data.email,
        errorMessageSignUp: "",
      };
    case authConstants.USERS_SIGNUP_FAILURE:
      return {
        ...state,
        isLoading: false,
        isSignUp: false,
        signUpError: payload.error,
        errorMessageSignUp: payload.message,
      };

    // user verification
    case authConstants.USERS_VERIFICATION_REQUEST:
      return {
        ...state,
        isLoading: true,
        errorMessageUserVerification: "",
        userVerif: false,
      };
    case authConstants.USERS_VERIFICATION_SUCCESS:
      return {
        ...state,
        isLoading: false,
        errorMessageUserVerification: "",
        userVerif: true,
      };
    case authConstants.USERS_VERIFICATION_FAILURE:
      return {
        ...state,
        isLoading: false,

        errorMessageUserVerification: payload.message,
        userVerif: false,
      };

    // resend user verification otp
    case authConstants.RESEND_OTP_REQUEST:
      return {
        ...state,
        isLoading: true,
        errorMessageResendUserVerification: "",
        resendOtp: false,
      };
    case authConstants.RESEND_OTP_SUCCESS:
      return {
        ...state,
        isLoading: false,
        errorMessageResendUserVerification: "",
        resendOtp: true,
      };
    case authConstants.RESEND_OTP_FAILURE:
      return {
        ...state,
        isLoading: false,
        errorMessageResendUserVerification: payload.message,
        resendOtp: false,
      };

    // reset password otp
    case authConstants.RESET_PASSWORD_OTP_REQUEST:
      return {
        ...state,
        isLoading: true,
        resetPassOtpVerif: false,
        resetPassTemp: "",
        errorMessageResetPasswordOtp: "",
      };
    case authConstants.RESET_PASSWORD_OTP_SUCCESS:
      return {
        ...state,
        isLoading: false,
        errorMessageResetPasswordOtp: "",
        resetPassOtpVerif: true,
        resetPassTemp: payload.temporary_pass,
      };
    case authConstants.RESET_PASSWORD_OTP_FAILURE:
      return {
        ...state,
        isLoading: false,
        errorMessageResetPasswordOtp: payload.message,
        resetPassOtpVerif: false,
        resetPassTemp: "",
      };

    // signin
    case authConstants.USERS_SIGNIN_REQUEST:
      return {
        ...state,
        isLoading: true,
        isSignIn: false,
        token: "",
        errorMessageUserSignIn: "",
      };
    case authConstants.USERS_SIGNIN_SUCCESS:
      console.log("[reducer] ", payload);
      return {
        ...state,
        isLoading: false,
        userData: payload.user,
        errorMessageUserSignIn: "",
        isSignIn: true,
        token: payload.token,
      };
    case authConstants.USERS_SIGNIN_FAILURE:
      return {
        ...state,
        isLoading: false,

        errorMessageUserSignIn: payload.message,
        isSignIn: false,
      };

    //forget password
    case authConstants.FORGET_PASSWORD_REQUEST:
      return {
        ...state,
        isLoading: true,
        errorMessageForgetPassword: "",
        otpVerification: false,
      };
    case authConstants.FORGET_PASSWORD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        otpVerification: payload.status == 200 && !payload.error ? true : false,
        errorMessageForgetPassword: "",
        email: payload.email,
      };
    case authConstants.FORGET_PASSWORD_FAILURE:
      return {
        ...state,
        isLoading: false,
        errorMessageForgetPassword: payload.message,
        otpVerification: !payload.error,
      };
    //store OTP

    case authConstants.STORE_OTP:
      return {
        ...state,
        otp: payload,
      };

    // reset password
    case authConstants.RESET_PASSWORD_REQUEST:
      return {
        ...state,
        isLoading: true,
        errorMessageResetPassword: "",
        passwordRecovered: false,
      };
    case authConstants.RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        passwordRecovered: true,
        errorMessageResetPassword: "",
      };
    case authConstants.RESET_PASSWORD_FAILURE:
      return {
        ...state,
        isLoading: false,
        errorMessageResetPassword: payload.message,
        passwordRecovered: !payload.error,
      };

    // logout
    case authConstants.LOGOUT_REQUEST:
      return state;
    case authConstants.LOGOUT_SUCCESS:
      return {
        ...state,
        isSignIn: false,
        logoutError: "",
        errorMessageLogout: "",
      };
    case authConstants.LOGOUT_FAILURE:
      return {
        ...state,
        isSignIn: false,
        errorMessageLogout: "",
      };

    case authConstants.CHANGE_THIS_STATE:
      return {
        ...state,
        [payload.stateKey]: payload.stateValue,
      };
    default:
      return state;
  }
};

export { authenticationNew };
