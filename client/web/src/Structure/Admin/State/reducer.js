import { adminConstants } from "./actionTypes";

const initState = {
    topicsData: [],
    isLoading: false,
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
            return{
                ...state
            }
    }
}

export {admin}