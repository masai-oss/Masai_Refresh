import { storageEnums } from "../../../Enums/storageEnums";
import {
  getFromStorage,
  saveToStorage,
} from "../../../Utils/localStorageHelper";
import {
  GET_RESULT_LOADING,
  GET_RESULT_SUCCESS,
  GET_RESULT_FAILURE,
  GET_REPORT_LOADING,
  GET_REPORT_SUCCESS,
  GET_REPORT_FAILURE,
} from "./actionTypes";

const initState = {
  result: getFromStorage(storageEnums.PRACTICE_RESULTS, []),
  report: "",
  isLoading: false,
  isError: false,
  errorMessage: "",
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
      saveToStorage(storageEnums.PRACTICE_RESULTS, payload.result);
      return {
        ...state,
        isLoading: false,
        result: payload,
      };
    case GET_REPORT_LOADING:
      return {
        ...state,
        isLoading: true,
        isError: false,
        errorMessage: "",
      };
    case GET_REPORT_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMessage: payload,
      };
    case GET_REPORT_SUCCESS:
      console.log(payload);
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
