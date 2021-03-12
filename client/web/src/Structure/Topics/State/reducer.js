import { storageEnums } from "../../../Enums/storageEnums";
import { getFromStorage, saveToStorage } from "../../../Utils/localStorageHelper";
import { topicConstant, questionsConstants } from "./actionTypes";

const initState = {
  isLoading: false,
  isError: false,
  errMsg:'',
  topicsData: [],
  questions: getFromStorage(storageEnums.ALL_QUESTIONS, []),
  attemptId: getFromStorage(storageEnums.ATTEMPT_ID, ''),
  submissionId: getFromStorage(storageEnums.SUBMISSION_ID, '')
};

const topics = (state = initState, { type, payload }) => {
  switch (type) {
    case topicConstant.GET_TOPICS_LOADING:
      return {
        ...state,
        isLoading: true,
        isError: false,
        errMsg:''
      };
    case topicConstant.GET_TOPICS_SUCCESS:
      return {
        ...state,
        topicsData:payload.data
      };
      case topicConstant.GET_TOPICS_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case questionsConstants.ATTEMPT_QUIZ_LOADING:
      return {
        ...state,
        isLoading: true,
        isError: false,
        errMsg:''
      }
    case questionsConstants.ATTEMPT_QUIZ_SUCCESS:
      saveToStorage(storageEnums.ATTEMPT_ID, payload.attempt_id)
      saveToStorage(storageEnums.SUBMISSION_ID, payload.submission_id)
      saveToStorage(storageEnums.ALL_QUESTIONS, payload.questions)
      return {
        ...state,
        questions: payload.questions,
        attemptId: payload.attempt_id,
        submissionId: payload.submission_id
      }
    case questionsConstants.ATTEMPT_QUIZ_FAILURE:
      return {
          ...state,
          isError: true,
      }
    default:
      return state;
  }
};

export { topics };