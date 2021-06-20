import {
  GET_BOOKMARKS_COUNT_LOADING,
  GET_BOOKMARKS_COUNT_SUCCESS,
  GET_BOOKMARKS_COUNT_FAILURE,
  GET_TOPICWISE_BOOKMARKS_LOADING,
  GET_TOPICWISE_BOOKMARKS_SUCCESS,
  GET_TOPICWISE_BOOKMARKS_FAILURE,
} from "./actionTypes";
import axios from "axios";
import { getFromStorage } from "../../../Utils/localStorageHelper";
import { storageEnums } from "../../../Enums/storageEnums";
import { GET_PREVIOUS_ATTEMPTS_FAILURE } from "../../DashboardNew/State/actionTypes";
const REACT_APP_BOOKMARK_URL = process.env.REACT_APP_BOOKMARK_URL;
const REACT_APP_TOPICWISE_BOOKMARK_URL =
  process.env.REACT_APP_TOPICWISE_BOOKMARK_URL;

const getBookmarksCountRequest = () => ({
  type: GET_BOOKMARKS_COUNT_LOADING,
});

const getBookmarksCountSuccess = (payload) => ({
  type: GET_BOOKMARKS_COUNT_SUCCESS,
  payload,
});

const getBookmarksCountFailure = () => ({
  type: GET_PREVIOUS_ATTEMPTS_FAILURE,
});

const getBookmarksCount = () => {
  return async (dispatch) => {
    dispatch(getBookmarksCountRequest());
    const token = getFromStorage(storageEnums.TOKEN, "");
    axios({
      method: "GET",
      url: `${REACT_APP_BOOKMARK_URL}/`,
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        console.log("All Bookmarks: ", response);
        dispatch(getBookmarksCountSuccess(response.data.data));
      })
      .catch((err) => {
        dispatch(getBookmarksCountFailure());
      });
  };
};

const getTopicWiseBookmarksRequest = () => ({
  type: GET_TOPICWISE_BOOKMARKS_LOADING,
});

const getTopicWiseBookmarksSuccess = (payload) => ({
  type: GET_TOPICWISE_BOOKMARKS_SUCCESS,
  payload,
});

const getTopicWiseBookmarksFailure = () => ({
  type: GET_TOPICWISE_BOOKMARKS_FAILURE,
});

const getTopicWiseBookmarks = (id) => {
  console.log("Action Getting topic bookmarks: ", id);
  return async (dispatch) => {
    dispatch(getTopicWiseBookmarksRequest());
    const token = getFromStorage(storageEnums.TOKEN, "");
    axios({
      method: "POST",
      url: `${REACT_APP_TOPICWISE_BOOKMARK_URL}/`,
      headers: { Authorization: `Bearer ${token}` },
      data: {
        topic_id: id,
      },
    })
      .then((response) => {
        console.log("All Topicwise Bookmarks: ", response.data.data);
        dispatch(getTopicWiseBookmarksSuccess(response.data.data));
      })
      .catch((err) => {
        dispatch(getTopicWiseBookmarksFailure());
      });
  };
};

export { getBookmarksCount, getTopicWiseBookmarks };
