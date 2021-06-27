import { authConstants } from "./actionTypes";
import { getFromStorage } from "../../../Utils/localStorageHelper";
import { storageEnums } from "../../../Enums/storageEnums";

import LogRocket from "logrocket";
LogRocket.init("zpsfu7/refresh-localhost");

const initState = {
  isSignUp: false,
  isSignIn: false,
  isLoading: false,
  signUpError: false,
  ErrorMessage: "",
  email: "",
  otpVerification: false,
  userData: [],
  otp: "",
  passwordRecovered: false,
  token: "",
  userVerif: false,
};

const authenticationNew = (state = initState, { type, payload }) => {
  switch (type) {
    // signup
    case authConstants.USERS_SIGNUP_REQUEST:
      return {
        ...state,
        isSignUp: false,
        isLoading: true,
      };
    case authConstants.USERS_SIGNUP_SUCCESS:
      console.log("email", payload.data.email);
      return {
        ...state,
        isLoading: false,
        isSignUp: true,
        signUpError: false,
        email: payload.data.email,
        ErrorMessage: "",
      };
    case authConstants.USERS_SIGNUP_FAILURE:
      console.log(payload);
      return {
        ...state,
        isLoading: false,
        isSignUp: false,
        signUpError: payload.error,
        ErrorMessage: payload.message,
      };

    // user verification
    case authConstants.USERS_VERIFICATION_REQUEST:
      return {
        ...state,
        isLoading: true,
        ErrorMessage: "",
        userVerif: false,
      };
    case authConstants.USERS_VERIFICATION_SUCCESS:
      return {
        ...state,
        isLoading: false,
        ErrorMessage: "",
        userVerif: true,
      };
    case authConstants.USERS_VERIFICATION_FAILURE:
      return {
        ...state,
        isLoading: false,
        ErrorMessage: payload.message,
        userVerif: false,
      };

    // signin
    case authConstants.USERS_SIGNIN_REQUEST:
      return {
        ...state,
        isLoading: true,
        ErrorMessage: "",
        isSignIn: false,
        token: "",
      };
    case authConstants.USERS_SIGNIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        userData: payload.user,
        ErrorMessage: "",
        isSignIn: true,
        token: payload.token,
      };
    case authConstants.USERS_SIGNIN_FAILURE:
      return {
        ...state,
        isLoading: false,
        ErrorMessage: payload.message,
        isSignIn: false,
      };

    //forget password
    case authConstants.FORGET_PASSWORD_REQUEST:
      return {
        ...state,
        isLoading: true,
        ErrorMessage: "",
        otpVerification: false,
      };
    case authConstants.FORGET_PASSWORD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        otpVerification: payload.status == 200 ? true : false,
        ErrorMessage: "",
        email: payload.email,
      };
    case authConstants.FORGET_PASSWORD_FAILURE:
      return {
        ...state,
        isLoading: false,
        ErrorMessage: payload.message,
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
        ErrorMessage: "",
        passwordRecovered: false,
      };
    case authConstants.RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        passwordRecovered: true,
        ErrorMessage: "",
      };
    case authConstants.RESET_PASSWORD_FAILURE:
      return {
        ...state,
        isLoading: false,
        ErrorMessage: payload.message,
        passwordRecovered: !payload.error,
      };
    default:
      return state;
  }
};

export { authenticationNew };
