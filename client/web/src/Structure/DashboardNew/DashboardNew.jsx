import React from "react";
import styles from "./Styles/DashboardNew.module.css";
import Cards from "./Components/Cards";
import { Sidebar } from "../Sidebar";
import Bookmarks from "../MyBookmarks/Components/Bookmarks";
import { MyBookmarks } from "../MyBookmarks/MyBookmarks";
import { BlurModalContext } from "../../ContextProviders/BlurModalContextProvider";
import { BlurModal } from "../Common/DialogBoxes/BlurModal";
import { Practice } from "../Practice";
import { useParams, useHistory } from "react-router-dom";
const DashboardNew = () => {
  const [rightSideContent, setRightSideContent] = React.useState("Cards");
  const { isOpen, setIsOpen } = React.useContext(BlurModalContext);

  let params = useParams();
  const renderRightSideContent = () => {
    if (window.location.pathname.includes("/bookmarks")) {
      let topicId = params.topicId;
      console.log("Topic id in dashboard : ", topicId);
      return <Bookmarks topicId={topicId} />;
    }
    switch (window.location.pathname) {
      case "/":
      case "/quiz_topics":
        return <Cards />;
      case "/practice_topics":
        return <Practice />;
      case "/my_bookmarks":
        return <MyBookmarks setRightSideContent={setRightSideContent} />;
      default:
        return <Cards />;
    }
  };
  return (
    <div className={styles.Dashboard}>
      <Sidebar setRightSideContent={setRightSideContent} />
      {renderRightSideContent()}
      {/* <BlurModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        modalContent={modalContent}
      /> */}
    </div>
  );
};

export { DashboardNew };
