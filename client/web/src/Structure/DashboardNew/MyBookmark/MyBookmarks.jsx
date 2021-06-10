import React from "react";
import { getFromStorage } from "../../../Utils/localStorageHelper";
import { storageEnums } from "../../../Enums/storageEnums";
import axios from "axios";
const MyBookmarks = ({ setRightSideContent }) => {
  const BOOKMARK_API_URL = process.env.REACT_APP_ADMIN_BOOKMARK_URL;
  const token = getFromStorage(storageEnums.TOKEN, "");
  axios
    .get(`http://localhost:5050/api/user_profile/all_bookmarks`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      console.log(res);
    });
  return (
    <div>
      <h1 onClick={() => setRightSideContent("Bookmarks")}>My Bookmarks</h1>
    </div>
  );
};

export default MyBookmarks;
