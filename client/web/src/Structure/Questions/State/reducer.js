import { questionConstant } from "./actionTypes";

const initState = {
  question: "",
  isLoading: false,
  isError: false,
  errorMessage: "",
};

const practise = (state = initState, { type, payload }) => {
  switch (type) {
    case questionConstant.GET_QUESTIONS_LOADING:
      return {
        ...state,
        isLoading: true,
        isError: false,
        errorMessage: "",
      };
    case questionConstant.GET_QUESTIONS_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMessage: payload,
      };
    case questionConstant.GET_QUESTIONS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        errorMessage: "",
        question: payload.data,
      };

    default:
      return state;
  }
};

export { practise };