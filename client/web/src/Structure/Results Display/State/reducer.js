import { storageEnums } from "../../../Enums/storageEnums";
import { getFromStorage, saveToStorage } from "../../../Utils/localStorageHelper";
import { 
  GET_RESULT_LOADING,
  GET_RESULT_SUCCESS,
  GET_RESULT_FAILURE
 } from "./actionTypes";

const initState = {
  result: getFromStorage(storageEnums.PRACTICE_RESULTS, []),
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
      saveToStorage(storageEnums.PRACTICE_RESULTS, payload.result)
      return {
        ...state,
        isLoading: false,
        result: payload,
      };

    default:
      return state;
  }
};

export { resultReducer };
