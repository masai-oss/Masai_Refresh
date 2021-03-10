import { adminConstants } from "./actionTypes";

const initState = {
    topicsData: [],
    isLoading: false,
    isPosting: false,
    isDeleting: false,
    isUpdating: false,
    topicPostedSuccessfully: false,
    topicPostFailed: false,
    errorMessage: "",
    specificTopicData: ""
};

const admin = (state= initState, {type, payload}) => {
    switch(type){
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
                isPosting: true,
                topicPostedSuccessfully: false
            }
        case adminConstants.POST_CRUD_TOPICS_SUCCESS:
            return{
                ...state,
                topicsData: [...state.topicsData, ...payload],
                isPosting: false,
                topicPostedSuccessfully: true
            }
        case adminConstants.POST_CRUD_TOPICS_FAILURE:
            return{
                ...state,
                errorMessage: payload,
                isPosting: false
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
                isDeleting: true,
            }
        case adminConstants.DELETE_CRUD_TOPIC_SUCCESS:
            return{
                ...state,
                isDeleting: false,
            }
        case adminConstants.DELETE_CRUD_TOPIC_FAILURE:
            return{
                ...state,
                errorMessage: payload,
                isDeleting: false
            }
        case adminConstants.PUT_CRUD_TOPIC_REQUEST:
            return{
                ...state,
                isUpdating: true,
                topicPostedSuccessfully: false
            }
        case adminConstants.PUT_CRUD_TOPIC_SUCCESS:
            return{
                ...state,
                isUpdating: false,
            }
        case adminConstants.PUT_CRUD_TOPIC_FAILURE:
            return{
                ...state,
                errorMessage: payload,
                isUpdating: false
            }
        default:
            return{
                ...state
            }
    }
}

export {admin}