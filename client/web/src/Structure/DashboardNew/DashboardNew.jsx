import React from "react";
import styles from "./Dashboard.module.css";
import Cards from "./Cards";
import Sidebar from "./Sidebar";
import Bookmarks from "./MyBookmark/Bookmarks";
import MyBookmarks from "./MyBookmark/MyBookmarks";
import { Practice } from "../Practice/Practice";
const DashboardNew = () => {
  const [rightSideContent, setRightSideContent] = React.useState("Cards");
  const renderRightSideContent = () => {
    switch (rightSideContent) {
      case "Cards":
        return <Cards />;
      case "MyBookmarks":
        return <MyBookmarks setRightSideContent={setRightSideContent} />;
      case "Bookmarks":
        return <Bookmarks />;
      case "Practice":
        return <Practice />;
      default:
        return <Cards />;
    }
  };
  return (
    <div className={styles.Dashboard}>
      <Sidebar setRightSideContent={setRightSideContent} />
      {renderRightSideContent()}
    </div>
  );
};

export { DashboardNew };
