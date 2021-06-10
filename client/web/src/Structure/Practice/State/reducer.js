import {
  GET_PRACTICE_TOPICS_LOADING,
  GET_PRACTICE_TOPICS_SUCCESS,
  GET_PRACTICE_TOPICS_FAILURE,
  START_PRACTICE_FAILURE,
  START_PRACTICE_SUCCESS,
  START_PRACTICE_LOADING,
  GET_NEXT_QUESTION_FAILURE,
  GET_NEXT_QUESTION_SUCCESS,
  GET_NEXT_QUESTION_LOADING,
  POST_BOOKMARK_LOADING,
  POST_BOOKMARK_SUCCESS,
  POST_BOOKMARK_FAILURE,
  POST_LIKE_SUCCESS,
  POST_LIKE_LOADING,
  POST_LIKE_FAILURE,
} from "./actionTypes";

import { storageEnums } from "../../../Enums/storageEnums";
import {
  getFromStorage,
  saveToStorage,
} from "../../../Utils/localStorageHelper";

const initState = {
  isLoading: false,
  isError: false,
  errMessage: "",
  practiceTopicsData: [],
  practiceQuestionID: [],
  question: getFromStorage(storageEnums.LONG_QUESTION_PRACTICE, null),
  topicId: "",
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
      console.log(payload, "payload");
      return {
        ...state,
        isLoading: false,
        practiceQuestionID: payload.questions,
        topicId: payload.topic_id,
      };
    case START_PRACTICE_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
        errMessage: "Error extracting Topics",
        practiceQuestionID: [],
      };

    //getting questions
    case GET_NEXT_QUESTION_LOADING:
      return {
        ...state,
        isLoading: true,
        isError: false,
        errMsg: "",
      };
    case GET_NEXT_QUESTION_SUCCESS:
      saveToStorage(storageEnums.LONG_QUESTION_PRACTICE, payload);
      return {
        ...state,
        isLoading: false,
        question: payload,
      };
    case GET_NEXT_QUESTION_FAILURE:
      return {
        ...state,
        isError: true,
        isLoading: false,
      };

    //bookmarks

    case POST_BOOKMARK_LOADING:
      return {
        ...state,
        isLoading: true,
        isError: false,
        errMessage: "",
      };
    case POST_BOOKMARK_SUCCESS:
      return {
        ...state,
        isLoading: false,
        practiceQuestionID: payload,
      };
    case POST_BOOKMARK_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
        errMessage: "Error in posting bookmarks",
      };

    //likes

    case POST_LIKE_LOADING:
      return {
        ...state,
        isLoading: true,
        isError: false,
        errMessage: "",
      };
    case POST_LIKE_SUCCESS:
      console.log(payload, "likesPayload");
      return {
        ...state,
        isLoading: false,
        
      };
    case POST_LIKE_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
        errMessage: "Error in posting bookmarks",
      };

    default:
      return state;
  }
};

export { practice_topics };
