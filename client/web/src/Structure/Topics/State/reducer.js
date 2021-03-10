import { topicConstant } from "./actionTypes";

const initState = {
    isLoading: false,
    isError: false,
    errMsg:'',
  topicsData:[]
};

const topics = (state = initState, { type, payload }) => {
  switch (type) {
    case topicConstant.GET_TOPICS_LOADING:
      return {
        ...state,
        isLoading: true,
          isError: false,
        errMsg:''
      };
      case topicConstant.GET_TOPICS_SUCCESS:
      return {
        ...state,
       topicsData:payload.data
      };
      case topicConstant.GET_TOPICS_FAILURE:
          console.log(payload)
      return {
        ...state,
        isLoading: false,
        isError: true,
        // errMsg: payload.data.message,
      };
   
  
    default:
      return state;
  }
};

export { topics };
