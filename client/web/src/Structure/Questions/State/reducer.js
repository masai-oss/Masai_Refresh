import { storageEnums } from "../../../Enums/storageEnums";
import { getFromStorage, saveToStorage } from "../../../Utils/localStorageHelper";
import { 
  GET_QUESTION_LOADING, 
  GET_QUESTION_FAILURE, 
  GET_QUESTION_SUCCESS,
  RECORD_ANSWER_SUCCESS,
  RECORD_ANSWER_FAILURE
} from "./actionTypes";

const initState = {
  isLoading: false,
  isError: false,
  errMsg: "",
  question: getFromStorage(storageEnums.QUESTION_PRACTICE, null),
  recordAnswerMsg:''
};

const questions = (state = initState, { type, payload }) => {
  switch (type) {
    case GET_QUESTION_LOADING:
      return {
        ...state,
        isLoading: true,
        isError: false,
        errMsg: "",
      };
    case GET_QUESTION_SUCCESS:
      saveToStorage(storageEnums.QUESTION_PRACTICE, payload)
      return {
        ...state,
        isLoading: false,
        question: payload,
      };
    case GET_QUESTION_FAILURE:
      return {
        ...state,
        isError: true,
        isLoading: false
      };
    case RECORD_ANSWER_SUCCESS:
      return {
        ...state,
        recordAnswerMsg: payload
      }
    case RECORD_ANSWER_FAILURE:
      return {
        ...state,
        recordAnswerMsg: payload
      }
    default:
      return state;
  }
};

export { questions };
