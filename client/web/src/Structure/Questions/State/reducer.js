import { questionConstant, answerConstant } from "./actionTypes";

const initState = {
  isLoading: false,
  isError: false,
  errMsg: "",
  question: {},
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
        //errMsg:payload.data.message
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
