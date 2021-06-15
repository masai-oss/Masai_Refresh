import React from "react";
import styles from "./Styles/DashboardNew.module.css";
import Cards from "./Components/Cards";
import { Sidebar } from "../Sidebar";
import Bookmarks from "../MyBookmarks/Components/Bookmarks";
import { MyBookmarks } from "../MyBookmarks/MyBookmarks";
import { BlurModalContext } from "../../ContextProviders/BlurModalContextProvider";
import { BlurModal } from "../Common/DialogBoxes/BlurModal";
const DashboardNew = () => {
  const [rightSideContent, setRightSideContent] = React.useState("Cards");
  const { isOpen, setIsOpen } = React.useContext(BlurModalContext);
  // const [modalContent, setModalContent] = React.useState(
  //   <h1>Default Modal Content</h1>
  // );

  const renderRightSideContent = () => {
    switch (rightSideContent) {
      case "Quiz":
        return <Cards />;
      case "MyBookmarks":
        return <MyBookmarks setRightSideContent={setRightSideContent} />;
      case "Bookmarks":
        return <Bookmarks setRightSideContent={setRightSideContent} />;
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
