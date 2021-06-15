import React from "react";
import styles from "../Styles/Bookmarks.module.css";
const Bookmarks = () => {
  const bookmarksList = [
    "What are Tags,Attributes and Elements",
    "What are Tags,Attributes and Elements",
    "What are Tags,Attributes and Elements",
    "What areTags,Attributes and Elements",
    "What are Tags,Attributes and Elements",
  ];
  const renderBookmarks = () => {
    return bookmarksList.map((singleBookmark) => {
      return (
        <div className={styles.bookmarks__singleBookmark}>
          <p>{singleBookmark}</p>
          <img src="/logos/GreaterThanIcon.svg" alt="back icon" />
        </div>
      );
    });
  };
  return (
    <div className={styles.bookmarks}>
      <div className={styles.bookmarks__backButton}>
        <img src="/logos/LessThanIcon.svg" alt="back icon" />
        <p>Go Back</p>
      </div>
      <div className={styles.bookmarks__bookmarkCount}>
        <img src="/logos/html/html_logo.svg" alt="back icon" />
        <p>18 Bookmarks</p>
      </div>
      <div className={styles.bookmarks__bookmarksList}>{renderBookmarks()}</div>
    </div>
  );
};

export default Bookmarks;
