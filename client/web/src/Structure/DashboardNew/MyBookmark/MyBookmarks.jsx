import React from "react";
import Card from "../Card";
import styles from "./MyBookmarks.module.css";
const MyBookmarks = ({ setRightSideContent }) => {
  return (
    <div className={styles.MyBookmarks}>
      <div className={styles.MyBookmarks__header}>
        <p>18 bookmarks</p>
      </div>
      <div className={styles.MyBookmarks__content}>
        <Card
          name={"html"}
          cardContent={""}
          onClick={() => setRightSideContent("Bookmarks")}
        />
        <Card
          name={"html"}
          cardContent={""}
          onClick={() => setRightSideContent("Bookmarks")}
        />
        <Card
          name={"html"}
          cardContent={""}
          onClick={() => setRightSideContent("Bookmarks")}
        />
        <Card
          name={"html"}
          cardContent={""}
          onClick={() => setRightSideContent("Bookmarks")}
        />
      </div>

      {/* <h1 onClick={() => setRightSideContent("Bookmarks")}>My Bookmarks</h1> */}
    </div>
  );
};

export default MyBookmarks;
