import { questionConstant } from "./actionTypes";

const initState = {
  isLoading: false,
  isError: false,
  errMsg: "",
  question: {},
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
        question: payload,
      };
    case questionConstant.GET_NEXT_QUESTION_FAILURE:
      console.log(payload);
      return {
        ...state,
        isError: true,
        //errMsg:payload.data.message
      };
    default:
      return state;
  }
};

export { questions };
