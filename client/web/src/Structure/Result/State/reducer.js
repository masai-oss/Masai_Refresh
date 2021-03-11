import { resultConstant } from "./actionTypes";

const initState = {
    result:   { 
        error: false, 
        result:[
                  {
                      "statement" :  "",
                      "outcome" : "",
                      "correct" : "",
                      "response" : "",
                  }
              ]
    },
    isLoading: false,
    isError: false,
    errorMessage: "",
  };
  
  const resultReducer = (state = initState, { type, payload }) => {
    switch (type) {
      case resultConstant.GET_RESULT_LOADING:
        return {
          ...state,
          isLoading: true,
          isError: false,
          errorMessage: "",
        };
      case resultConstant.GET_RESULT_FAILURE:
        return {
          ...state,
          isLoading: false,
          isError: true,
          errorMessage: payload,
        };
      case resultConstant.GET_RESULT_SUCCESS:
        return {
          ...state,
          isLoading: false,
          isError: false,
          errorMessage: "",
          result: payload.data,
        };
  
      default:
        return state;
    }
  };
  
  export { resultReducer };