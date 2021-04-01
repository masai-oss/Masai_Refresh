import { store } from "../store";
import axios from "axios";
import { authActions } from "../Structure/Authentication";
import { getFromStorage } from "./localStorageHelper";
import { storageEnums } from "../Enums/storageEnums";

const axiosInterceptor = () => {
  const token = getFromStorage(storageEnums.TOKEN, "");
  const { dispatch } = store;
  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (
        (error?.response?.status === 401 || error?.response?.status === 403) &&
        token
      ) {
        window.open(process.env.REACT_APP_AUTH_GOOGLE_LOGOUT_URL, "_self");
        dispatch(authActions.logoutProcess());
      }
      return Promise.reject(error);
    }
  );

  axios.interceptors.request.use(
    (request) => {
      return request;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
};

export { axiosInterceptor };
