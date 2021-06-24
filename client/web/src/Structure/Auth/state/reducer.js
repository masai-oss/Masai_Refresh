import { authConstants } from "./actionTypes";
import { getFromStorage } from "../../../Utils/localStorageHelper";
import { storageEnums } from "../../../Enums/storageEnums";

import LogRocket from "logrocket";
LogRocket.init("zpsfu7/refresh-localhost");

const initState = {
  isSignUp: false,
  signUpError: false,
  signUpErrorMessage: "",
};

const authenticationNew = (state = initState, { type, payload }) => {
  switch (type) {
    case authConstants.SIGNUP_REQUEST:
      return state;
    case authConstants.SIGNUP_SUCCESS:
      return {
        ...state,
        isSignUp: false,
        signUpError: "",
      };
    case authConstants.SIGNUP_FAILURE:
      return {
        ...state,
        isSignUp: false,
        signUpError: "",
      };
    default:
      return state;
  }
};

export { authenticationNew };
