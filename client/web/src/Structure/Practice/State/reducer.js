import {
  GET_PRACTICE_TOPICS_LOADING,
  GET_PRACTICE_TOPICS_SUCCESS,
  GET_PRACTICE_TOPICS_FAILURE,
} from "./actionTypes";

const initState = {
  isLoading: false,
  isError: false,
  errMessage: "",
  practiceTopicsData: [],
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
      console.log(payload)
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
    default:
      return state;
  }
};

export { practice_topics };
