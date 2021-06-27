import { authConstants } from "./actionTypes";
import { getFromStorage } from "../../../Utils/localStorageHelper";
import { storageEnums } from "../../../Enums/storageEnums";

import LogRocket from "logrocket";
LogRocket.init("zpsfu7/refresh-localhost");

const initState = {
  isSignUp: false,
  isLoading: false,
  signUpError: false,
  ErrorMessage: "",
  email: "",
  otpVerification: false,
  userData: [],
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
        isSignUp: false,
      };
    case authConstants.USERS_VERIFICATION_SUCCESS:
      return {
        ...state,
        otpVerification: !payload.error,
        isLoading: false,
        ErrorMessage: "",
      };
    case authConstants.USERS_VERIFICATION_FAILURE:
      return {
        ...state,
        isLoading: false,
        ErrorMessage: payload.message,
        otpVerification: !payload.error,
      };

    // signin
    case authConstants.USERS_SIGNIN_REQUEST:
      return state;
    case authConstants.USERS_SIGNIN_SUCCESS:
      return {
        ...state,
        userData: payload.user,
      };
    case authConstants.USERS_SIGNIN_FAILURE:
      return {
        ...state,
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
        otpVerification: payload == 200 ? true : false,
        ErrorMessage: "",
      };
    case authConstants.FORGET_PASSWORD_FAILURE:
      return {
        ...state,
        isLoading: false,
        ErrorMessage: payload.message,
        otpVerification: !payload.error,
      };
    default:
      return state;
  }
};

export { authenticationNew };
