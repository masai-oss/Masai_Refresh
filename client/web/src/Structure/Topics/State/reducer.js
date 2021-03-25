import { 
  GET_TOPICS_LOADING,
  GET_TOPICS_SUCCESS,
  GET_TOPICS_FAILURE
 } from "./actionTypes";

const initState = {
  isLoading: false,
  isError: false,
  errMessage: "",
  topicsData: []
};

const topics = (state = initState, { type, payload }) => {
  switch (type) {
    case GET_TOPICS_LOADING:
      return {
        ...state,
        isLoading: true,
        isError: false,
        errMessage: "",
      };
    case GET_TOPICS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        topicsData: payload,
      };
    case GET_TOPICS_FAILURE:
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
