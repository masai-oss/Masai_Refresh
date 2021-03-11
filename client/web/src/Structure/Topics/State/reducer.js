import { topicConstant, questionsConstants } from "./actionTypes";

const initState = {
    isLoading: false,
    isError: false,
    errMsg:'',
    topicsData: [],
    questions: [],
    attemptId: '',
  submissionId:''
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
        // errMsg: payload.data.message,
      };
      case questionsConstants.ATTEMPT_QUIZ_LOADING:
          return {
              ...state,
              isLoading: true,
              isError: false,
              errMsg:''
          }
      case questionsConstants.ATTEMPT_QUIZ_SUCCESS:
          console.log(payload)
          return {
              ...state,
                //   questions:payload
          }
      case questionsConstants.ATTEMPT_QUIZ_FAILURE:
          return {
              ...state,
              isError: true,
              //errMsg:payload.data.message
          }
    default:
      return state;
  }
};

export { topics };