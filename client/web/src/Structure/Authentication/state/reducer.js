import { authConstants } from "./actionTypes";
import { getFromStorage } from "../../../Utils/localStorageHelper";
import { storageEnums } from "../../../Enums/storageEnums";

import LogRocket from "logrocket";
LogRocket.init("zpsfu7/refresh-localhost");

const initState = {
  isLoggingIn: false,
  loginError: false,
  loginErrorMessage: "",
  token: getFromStorage(storageEnums.TOKEN, ""),
  name: getFromStorage(storageEnums.NAME, ""),
  email: getFromStorage(storageEnums.EMAIL, ""),
  profilePic: getFromStorage(storageEnums.PROFILEPIC, ""),
  logoutError: "",
};

const authentication = (state = initState, { type, payload }) => {
  switch (type) {
    case authConstants.USERS_LOGIN_REQUEST:
      return {
        ...state,
        isLoggingIn: true,
        loginError: false,
      };
    case authConstants.USERS_LOGIN_SUCCESS: {
      const {
        token,
        user: { email, name },
      } = payload;
      console.log(email, name, payload, token);
      LogRocket.identify(token, {
        name,
        email,
      });
      return {
        ...state,
        token: getFromStorage(storageEnums.TOKEN, ""),
        name: getFromStorage(storageEnums.NAME, ""),
        email: getFromStorage(storageEnums.EMAIL, ""),
        profilePic: getFromStorage(storageEnums.PROFILEPIC, ""),
        isLoggingIn: false,
        loginError: false,
      };
    }
    case authConstants.USERS_LOGIN_FAILURE:
      return {
        ...state,
        isLoggingIn: false,
        loginError: true,
        loginErrorMessage: payload,
      };
    case authConstants.LOGOUT_REQUEST:
      return state;
    case authConstants.LOGOUT_SUCCESS:
      return {
        ...state,
        isLoggingIn: false,
        loginError: "",
        logoutError: "",
      };
    case authConstants.LOGOUT_FAILURE:
      return {
        ...state,
        isLoggingIn: false,
        loginError: "",
        logoutError: "",
      };
    default:
      return state;
  }
};

export { authentication };
