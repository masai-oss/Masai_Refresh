import React from "react";
import { Card } from "../Common/Card";
import styles from "./Styles/MyBookmarks.module.css";
const MyBookmarks = ({ setRightSideContent }) => {
  const cardContent = (
    <div className={styles.cardContent}>
      <h3>18 Bookmarks</h3>
      <button>View</button>
    </div>
  );
  return (
    <div className={styles.MyBookmarks}>
      <div className={styles.MyBookmarks__header}>
        <p>81 Total Bookmarks</p>
      </div>
      <div className={styles.MyBookmarks__content}>
        <Card
          name={"html"}
          cardContent={cardContent}
          onClick={() => setRightSideContent("Bookmarks")}
        />
        <Card
          name={"css"}
          cardContent={cardContent}
          onClick={() => setRightSideContent("Bookmarks")}
        />
        <Card
          name={"javascript"}
          cardContent={cardContent}
          onClick={() => setRightSideContent("Bookmarks")}
        />
        <Card
          name={"java"}
          cardContent={cardContent}
          onClick={() => setRightSideContent("Bookmarks")}
        />
      </div>

      {/* <h1 onClick={() => setRightSideContent("Bookmarks")}>My Bookmarks</h1> */}
    </div>
  );
};

export { MyBookmarks };
