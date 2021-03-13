import { topicConstant, questionsConstants } from "./actionTypes";

const initState = {
  isLoading: false,
  isError: false,
  errMsg: "",
  isLoadingQuiz: false,
  isErrorQuiz: false,
  isSuccessQuiz: false,
  topicsData: [],
  questions: [],
  attemptId: "",
  submissionId: "",
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
        errMsg: "",
      };
    case questionsConstants.ATTEMPT_QUIZ_SUCCESS:
      return {
        ...state,
        isLoadingQuiz: false,
        isSuccessQuiz: true,
        questions: payload.questions,
        attemptId: payload.attempt_id,
        submissionId: payload.submission_id,
      };
    case questionsConstants.ATTEMPT_QUIZ_FAILURE:
      return {
        ...state,
        isLoadingQuiz: false,
        isErrorQuiz: true,
        errMsg: payload,
      };
    default:
      return state;
  }
};

export { topics };
