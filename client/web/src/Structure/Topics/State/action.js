import { topicConstant } from "./actionTypes";
import axios from "axios";

export const getTopicsLoading = () => ({
  type: topicConstant.GET_TOPICS_LOADING,
});

export const getTopicsSuccess = (payload) => ({
  type: topicConstant.GET_TOPICS_SUCCESS,
  payload,
});

export const getTopicsFailure = (payload) => ({
  type: topicConstant.GET_TOPICS_FAILURE,
  payload,
});

export const getTopics = (payload) => (dispatch) => {
  dispatch(getTopicsLoading());
  
    axios.get('http://localhost:5050/api/topic/summary', {
        headers: {
         'Authorizaation': `Bearer ${payload}`
     }
 }).then(res=> dispatch(getTopicsSuccess(res.data))).catch(err=>dispatch(getTopicsFailure(err)))
};
