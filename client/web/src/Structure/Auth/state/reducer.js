import { authConstants } from "./actionTypes";
import { getFromStorage } from "../../../Utils/localStorageHelper";
import { storageEnums } from "../../../Enums/storageEnums";

import LogRocket from "logrocket";
LogRocket.init("zpsfu7/refresh-localhost");

const initState = {
  isSignUp: false,
  signUpError: false,
  signUpErrorMessage: "",
  email: "",
  otpVerification: false,
  userData: [],
};

const authenticationNew = (state = initState, { type, payload }) => {
  switch (type) {
    // signup
    case authConstants.USERS_SIGNUP_REQUEST:
      return state;
    case authConstants.USERS_SIGNUP_SUCCESS:
      console.log("email", payload.data.email);
      return {
        ...state,
        isSignUp: false,
        signUpError: "",
        email: payload.data.email,
      };
    case authConstants.USERS_SIGNUP_FAILURE:
      return {
        ...state,
        isSignUp: false,
        signUpError: "",
      };
    // user verification
    case authConstants.USERS_VERIFICATION_REQUEST:
      return state;
    case authConstants.USERS_VERIFICATION_SUCCESS:
      return {
        ...state,
        otpVerification: !payload.error,
      };
    case authConstants.USERS_VERIFICATION_FAILURE:
      return {
        ...state,
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
    default:
      return state;
  }
};

export { authenticationNew };
