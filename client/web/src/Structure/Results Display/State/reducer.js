import { storageEnums } from "../../../Enums/storageEnums";
import {
  getFromStorage,
  saveToStorage,
} from "../../../Utils/localStorageHelper";
import {
  GET_RESULT_LOADING,
  GET_RESULT_SUCCESS,
  GET_RESULT_FAILURE,
  SEND_REPORT_LOADING,
  SEND_REPORT_SUCCESS,
  SEND_REPORT_FAILURE,
} from "./actionTypes";

const initState = {
  result: getFromStorage(storageEnums.PRACTICE_RESULTS, []),
  report: "",
  isLoading: false,
  isError: false,
  isErrorReport: false,
  errorMessage: "",
  prev_attempt: null,
};

const resultReducer = (state = initState, { type, payload }) => {
  switch (type) {
    case GET_RESULT_LOADING:
      return {
        ...state,
        isLoading: true,
        isError: false,
        errorMessage: "",
      };
    case GET_RESULT_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMessage: payload,
      };
    case GET_RESULT_SUCCESS:
      saveToStorage(storageEnums.PRACTICE_RESULTS, payload);
      return {
        ...state,
        isLoading: false,
        result: payload.result,
        prev_attempt: payload.prev_attempt,
      };
    case SEND_REPORT_LOADING:
      return {
        ...state,
        isLoading: true,
        isError: false,
        errorMessage: "",
      };
    case SEND_REPORT_FAILURE:
      return {
        ...state,
        isLoading: false,
        isErrorReport: true,
        errorMessage: payload.data.message,
      };
    case SEND_REPORT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        report: payload,
      };
    default:
      return state;
  }
};

export { resultReducer };
