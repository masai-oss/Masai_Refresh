import {
  GET_PREVIOUS_ATTEMPTS_REQUEST,
  GET_PREVIOUS_ATTEMPTS_SUCCESS,
  GET_PREVIOUS_ATTEMPTS_FAILURE,
} from "./actionTypes";
import { storageEnums } from "../../../Enums/storageEnums";
import {
  getFromStorage,
  saveToStorage,
} from "../../../Utils/localStorageHelper";
const initState = {
  isLoading: false,
  isError: false,
  errMessage: "",
  previousAttempts: [],
};
const getPreviousAttempts = (state = initState, { type, payload }) => {
  switch (type) {
    case GET_PREVIOUS_ATTEMPTS_REQUEST:
      return {
        ...state,
        isLoading: true,
        isError: false,
        errMessage: "",
      };
    case GET_PREVIOUS_ATTEMPTS_SUCCESS:
      saveToStorage(storageEnums.PREVIOUS_ATTEMPTS, [...payload]);
      return {
        ...state,
        isLoading: false,
        previousAttempts: [...payload],
      };
    case GET_PREVIOUS_ATTEMPTS_FAILURE:
      return {
        ...state,
        isError: true,
        isLoading: false,
      };
    default:
      return { ...state };
  }
};
export { getPreviousAttempts };
