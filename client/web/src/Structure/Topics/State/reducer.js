import { storageEnums } from "../../../Enums/storageEnums";
import { getFromStorage, saveToStorage } from "../../../Utils/localStorageHelper";
import { topicConstant, questionsConstants } from "./actionTypes";

const initState = {
  isLoading: false,
  isError: false,
  errMsg: "",
  isLoadingQuiz: false,
  isErrorQuiz: false,
  isSuccessQuiz: false,
  topicsData: [],
  questionIds: getFromStorage(storageEnums.ALL_QUESTIONS_IDS, []),
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
        errMsg: "",
      };
    case topicConstant.GET_TOPICS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        topicsData: payload.data,
      };
    case topicConstant.GET_TOPICS_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
        errMsg: payload,
      };
    case questionsConstants.ATTEMPT_QUIZ_LOADING:
      return {
        ...state,
        isLoadingQuiz: true,
        isErrorQuiz: false,
        errMsg:''
      }
    case questionsConstants.ATTEMPT_QUIZ_SUCCESS:
      saveToStorage(storageEnums.ATTEMPT_ID, payload.attempt_id)
      saveToStorage(storageEnums.SUBMISSION_ID, payload.submission_id)
      saveToStorage(storageEnums.ALL_QUESTIONS_IDS, payload.questions)
      return {
        ...state,
        isLoadingQuiz: false,
        isSuccessQuiz: true,
        questionIds: payload.questions,
        attemptId: payload.attempt_id,
        submissionId: payload.submission_id
      }
    case questionsConstants.ATTEMPT_QUIZ_FAILURE:
      return {
        ...state,
        isLoadingQuiz: false,
        isErrorQuiz: true,
        isError: true,
      }
    default:
      return state;
  }
};

export { topics };
