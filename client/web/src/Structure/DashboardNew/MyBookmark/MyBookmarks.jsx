import React from "react";

const MyBookmarks = ({ setRightSideContent }) => {
  return (
    <div>
      <h1 onClick={() => setRightSideContent("Bookmarks")}>My Bookmarks</h1>
    </div>
  );
};

export default MyBookmarks;
