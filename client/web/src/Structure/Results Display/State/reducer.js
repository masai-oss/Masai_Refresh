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
  GET_PREVIOUS_ATTEMPTS_LIST_SUCCESS,
  GET_PREVIOUS_ATTEMPT_RESULT_SUCCESS,
} from "./actionTypes";
const initState = {
  result: getFromStorage(storageEnums.PRACTICE_RESULTS, []),
  report: "",
  isLoading: false,
  isError: false,
  isErrorReport: false,
  errorMessage: "",
  prev_attempt: getFromStorage("PREVIOUS_ATTEMPT_LIST", []),
  prev_attempt_result: getFromStorage("PREVIOUS_ATTEMPT_RESULT_ID", ""),
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
    case GET_PREVIOUS_ATTEMPTS_LIST_SUCCESS:
      saveToStorage("PREVIOUS_ATTEMPT_LIST", payload);
      return {
        ...state,
        prev_attempt: payload,
      };
    case GET_PREVIOUS_ATTEMPT_RESULT_SUCCESS:
      saveToStorage("PREVIOUS_ATTEMPT_RESULT_ID", payload);
      return {
        ...state,
        prev_attempt_result: payload,
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
        result: payload,
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
