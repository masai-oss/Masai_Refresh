import { storageEnums } from "../../../Enums/storageEnums";
import { getFromStorage, saveToStorage } from "../../../Utils/localStorageHelper";
import { 
  GET_QUESTION_LOADING, 
  GET_QUESTION_FAILURE, 
  GET_QUESTION_SUCCESS,

  RECORD_ANSWER_LOADING,
  RECORD_ANSWER_SUCCESS,
  RECORD_ANSWER_FAILURE,
  
  ATTEMPT_QUIZ_LOADING,
  ATTEMPT_QUIZ_SUCCESS,
  ATTEMPT_QUIZ_FAILURE
} from "./actionTypes";

const initState = {
  isLoading: false,
  isError: false,
  errMessage: "",
  question: getFromStorage(storageEnums.QUESTION_PRACTICE, null),
  recordAnswerMsg:'',
  questionIds: getFromStorage(storageEnums.ALL_QUESTIONS_IDS, []),
  attemptId: getFromStorage(storageEnums.ATTEMPT_ID, ''),
  submissionId: getFromStorage(storageEnums.SUBMISSION_ID, '')
};

const questions = (state = initState, { type, payload }) => {
  switch (type) {
    case GET_QUESTION_LOADING:
      return {
        ...state,
        isLoading: true,
        isError: false,
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
        isLoading: false,
        errMessage: "Error getting the question"
      };


    case RECORD_ANSWER_LOADING:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case RECORD_ANSWER_SUCCESS:
      return {
        ...state,
        recordAnswerMsg: payload,
        isLoading: false,
      }
    case RECORD_ANSWER_FAILURE:
      return {
        ...state,
        isError: true,
        isLoading: false,
        errMessage: "Error recording the asnwers"
      }

      
    case ATTEMPT_QUIZ_LOADING:
      return {
        ...state,
        isLoading: true,
        isError: false,
        errMessage:''
      }
    case ATTEMPT_QUIZ_SUCCESS:
      saveToStorage(storageEnums.ATTEMPT_ID, payload.attempt_id)
      saveToStorage(storageEnums.SUBMISSION_ID, payload.submission_id)
      saveToStorage(storageEnums.ALL_QUESTIONS_IDS, payload.questions)
      return {
        ...state,
        isLoading: false,
        questionIds: payload.questions,
        attemptId: payload.attempt_id,
        submissionId: payload.submission_id
      }
    case ATTEMPT_QUIZ_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
        errMessage: "Error creating quiz"
      }
    default:
      return state;
  }
};

export { questions };
