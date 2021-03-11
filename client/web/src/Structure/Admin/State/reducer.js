import { adminConstants } from "./actionTypes";

const initState = {
  isLoading: false,
  isError: false,
  data:[],
  topics: "",
  topicsData: [],
  topicPostedSuccessfully: false,
  topicPostFailed: false,
  errorMessage: "",
  specificTopicData: ""
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

      case adminConstants.GET_CRUD_TOPICS_REQUEST:
            return{
                ...state,
                isLoading: true
            }
      case adminConstants.GET_CRUD_TOPICS_SUCCESS:
          return{
              ...state,
              topicsData: [...payload],
              isLoading: false
          }
      case adminConstants.GET_CRUD_TOPICS_FAILURE:
          return{
              ...state,
              errorMessage: payload,
              isLoading: false
          }
      case adminConstants.POST_CRUD_TOPICS_REQUEST:
          return{
              ...state,
              isLoading: true,
              topicPostedSuccessfully: false
          }
      case adminConstants.POST_CRUD_TOPICS_SUCCESS:
          return{
              ...state,
              topicsData: [...state.topicsData, ...payload],
              isLoading: false,
              topicPostedSuccessfully: true
          }
      case adminConstants.POST_CRUD_TOPICS_FAILURE:
          return{
              ...state,
              errorMessage: payload,
              isLoading: false
          }
      case adminConstants.GET_BY_CRUD_TOPIC_ID_REQUEST:
          return{
              ...state,
              isLoading: true
          }
      case adminConstants.GET_BY_CRUD_TOPIC_ID_SUCCESS:
          return{
              ...state,
              isLoading: false,
              specificTopicData: payload
          }
      case adminConstants.GET_BY_CRUD_TOPIC_ID_FAILURE:
          return{
              ...state,
              isLoading: false,
              specificTopicData: ""
          }
      case adminConstants.DELETE_CRUD_TOPIC_REQUEST:
          return{
              ...state,
              isLoading: true,
          }
      case adminConstants.DELETE_CRUD_TOPIC_SUCCESS:
          return{
              ...state,
              isLoading: false,
          }
      case adminConstants.DELETE_CRUD_TOPIC_FAILURE:
          return{
              ...state,
              errorMessage: payload,
              isLoading: false
          }
      case adminConstants.PUT_CRUD_TOPIC_REQUEST:
          return{
              ...state,
              isLoading: true,
              topicPostedSuccessfully: false
          }
      case adminConstants.PUT_CRUD_TOPIC_SUCCESS:
          return{
              ...state,
              isLoading: false,
          }
      case adminConstants.PUT_CRUD_TOPIC_FAILURE:
          return{
              ...state,
              errorMessage: payload,
              isLoading: false
          }
    default:
      return state;
  }
};

export { admin };