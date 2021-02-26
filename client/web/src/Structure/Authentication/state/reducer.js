import { authConstants } from "./actionTypes";

const initState = {
  isLoggingIn: false,
  loginError: false,
  loginErrorMessage: "",
  token: localStorage.getItem("token"),
  name: localStorage.getItem("name"),
  email: localStorage.getItem("email"),
  profilePic: localStorage.getItem("profilePic"),
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
    case authConstants.USERS_LOGIN_SUCCESS:
      return {
        ...state,
        isLoggingIn: false,
        loginError: false,
      };
    case authConstants.USERS_LOGIN_FAILURE:
      return {
        ...state,
        isLoggingIn: false,
        loginError: true,
        loginErrorMessage: payload.data.message,
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
