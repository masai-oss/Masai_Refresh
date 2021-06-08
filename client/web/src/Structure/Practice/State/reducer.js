import {
  GET_PRACTICE_TOPICS_LOADING,
  GET_PRACTICE_TOPICS_SUCCESS,
  GET_PRACTICE_TOPICS_FAILURE,
  START_PRACTICE_FAILURE,
  START_PRACTICE_SUCCESS,
  START_PRACTICE_LOADING,
} from "./actionTypes";

const initState = {
  isLoading: false,
  isError: false,
  errMessage: "",
  practiceTopicsData: [],
  practiceQuestionID: [],
};

const practice_topics = (state = initState, { type, payload }) => {
  switch (type) {
    case GET_PRACTICE_TOPICS_LOADING:
      return {
        ...state,
        isLoading: true,
        isError: false,
        errMessage: "",
      };
    case GET_PRACTICE_TOPICS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        practiceTopicsData: payload,
      };
    case GET_PRACTICE_TOPICS_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
        errMessage: "Error extracting Topics",
      };

    //start practice

    case START_PRACTICE_LOADING:
      return {
        ...state,
        isLoading: true,
        isError: false,
        errMessage: "",
      };
    case START_PRACTICE_SUCCESS:
      console.log(payload,"payload");
      return {
        ...state,
        isLoading: false,
        practiceQuestionID: payload,
      };
    case START_PRACTICE_FAILURE:
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

export { practice_topics };
