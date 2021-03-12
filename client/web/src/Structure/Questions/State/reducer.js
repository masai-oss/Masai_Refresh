import { storageEnums } from "../../../Enums/storageEnums";
import { getFromStorage, saveToStorage } from "../../../Utils/localStorageHelper";
import { questionConstant, answerConstant } from "./actionTypes";

const initState = {
  isLoading: false,
  isError: false,
  errMsg: "",
  question: getFromStorage(storageEnums.QUESTION_PRACTICE, null),
  recordAnswerMsg:''
};

const questions = (state = initState, { type, payload }) => {
  switch (type) {
    case questionConstant.GET_NEXT_QUESTION_LOADING:
      return {
        ...state,
        isLoading: true,
        isError: false,
        errMsg: "",
      };
    case questionConstant.GET_NEXT_QUESTION_SUCCESS:
      saveToStorage(storageEnums.QUESTION_PRACTICE, payload)
      return {
        ...state,
        isLoading: false,
        question: payload,
      };
    case questionConstant.GET_NEXT_QUESTION_FAILURE:
      console.log(payload);
      return {
        ...state,
        isError: true,
        isLoading: false
      };
    case answerConstant.RECORD_ANSWER_SUCCESS:
      return {
        ...state,
        recordAnswerMsg: payload
      }
    case answerConstant.RECORD_ANSWER_FAILURE:
      return {
        ...state,
        recordAnswerMsg: payload
      }
    default:
      return state;
  }
};

export { questions };
