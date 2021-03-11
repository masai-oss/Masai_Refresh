import { adminConstants } from "./actionTypes";

const initState = {
  isLoading: false,
  isError: false,
  data:[],
  topics: ""
};

const admin = (state = initState, { type, payload }) => {
  switch (type) {
    case adminConstants.GET_ALL_QUESTIONS_LOADING:
      return{
        ...state,
        isLoading: true
      }
    case adminConstants.GET_ALL_QUESTIONS_SUCCESS:
      return{
        ...state,
        isLoading: false,
        data: payload
      }
    case adminConstants.GET_ALL_QUESTIONS_FAILURE:
      return{
        ...state,
        isError: true,
      }
    case adminConstants.GET_TOPICS_LOADING:
      return{
        ...state,
        isLoading: true
      }
    case adminConstants.GET_TOPICS_SUCCESS:
      return{
        ...state,
        isLoading: false,
        topics: payload
      }
    case adminConstants.GET_TOPICS_FAILURE:
      return{
        ...state,
        isError: true,
      }

    case adminConstants.GET_QUESTIONS_BY_TOPIC_LOADING:
      return{
        ...state,
        isLoading: true
      }
    case adminConstants.GET_QUESTIONS_BY_TOPIC_SUCCESS:
      return{
        ...state,
        isLoading: false,
        data: payload
      }
    case adminConstants.GET_QUESTIONS_BY_TOPIC_FAILURE:
      return{
        ...state,
        isError: true,
      }

    case adminConstants.ADD_QUESTION_LOADING:
      return{
        ...state,
        isLoading: true
      }
    case adminConstants.ADD_QUESTION_SUCCESS:
      return{
        ...state,
        isLoading: false,
        data: [...state.data, payload]
      }
    case adminConstants.ADD_QUESTION_FAILURE:
      return{
        ...state,
        isError: true,
      }

    case adminConstants.DELETE_QUESTION_LOADING:
      return{
        ...state,
        isLoading: true
      }
    case adminConstants.DELETE_QUESTION_SUCCESS:
      return{
        ...state,
        isLoading: false,
        data: [...state.data, payload]
      }
    case adminConstants.DELETE_QUESTION_FAILURE:
      return{
        ...state,
        isError: true,
      }


    case adminConstants.EDIT_QUESTION_LOADING:
      return{
        ...state,
        isLoading: true
      }
    case adminConstants.EDIT_QUESTION_SUCCESS:
      return{
        ...state,
        isLoading: false,
        data: [...state.data, payload]
      }
    case adminConstants.EDIT_QUESTION_FAILURE:
      return{
        ...state,
        isError: true,
      }
    default:
      return state;
  }
};

export { admin };
