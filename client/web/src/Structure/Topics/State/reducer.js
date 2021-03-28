import { 
  GET_QUIZ_TOPICS_LOADING,
  GET_QUIZ_TOPICS_SUCCESS,
  GET_QUIZ_TOPICS_FAILURE
 } from "./actionTypes";

const initState = {
  isLoading: false,
  isError: false,
  errMessage: "",
  quizTopicsData: [],
  practiceTopicsData: []
};

const topics = (state = initState, { type, payload }) => {
  switch (type) {
    case GET_QUIZ_TOPICS_LOADING:
      return {
        ...state,
        isLoading: true,
        isError: false,
        errMessage: "",
      };
    case GET_QUIZ_TOPICS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        quizTopicsData: payload,
      };
    case GET_QUIZ_TOPICS_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
        errMessage: "Error extracting Topics",
      };
    default:
      return state;
  }
};

export { topics };
