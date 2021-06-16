import React from "react";
import styles from "./Sidebar.module.css";
import logo from "../../Assets/logo.svg";
import { BlurModalContext } from "../../ContextProviders/BlurModalContextProvider";
import { BlurModal } from "../Common/DialogBoxes/BlurModal";

const Sidebar = ({ setRightSideContent }) => {
  const [toggle, setToggle] = React.useState(false);
  const [displayProfileMenu, setDisplayProfileMenu] = React.useState(false);
  const [currentActiveTab, setCurrentActiveTab] = React.useState("Quiz");
  const { isOpen, setIsOpen } = React.useContext(BlurModalContext);
  const handleListItemClick = (id, e) => {
    console.log(e.currentTarget);
    setRightSideContent(id);
    setCurrentActiveTab(id);
  };
  const signOutModalContent = <div>Sign Out</div>;
  const handleProfileClick = () => {
    setDisplayProfileMenu(!displayProfileMenu);
    setCurrentActiveTab("Profile");
  };

  const openSignPOutModal = () => {
    setIsOpen(true);
    setToggle(!toggle);
  };
  return (
    <div className={styles.Sidebar}>
      <div className={styles.logoContainer}>
        <img src={logo} alt="Masai Refresh" />
      </div>
      <div className={styles.navContainer}>
        <ul>
          <li
            onClick={(e) => handleListItemClick("Quiz", e)}
            className={
              currentActiveTab === "Quiz" ? styles.selected__list_item : ""
            }
          >
            <img
              src="/logos/QuizIcon.svg"
              alt="Quiz"
              className={
                currentActiveTab === "Quiz" ? styles.svg__selected : ""
              }
            />
            <h4 className={currentActiveTab === "Quiz" ? styles.selected : ""}>
              Quiz
            </h4>
          </li>
          <li
            onClick={(e) => handleListItemClick("Practice", e)}
            className={
              currentActiveTab === "Practice" ? styles.selected__list_item : ""
            }
          >
            <img
              src="/logos/PracticeIcon.svg"
              alt="Practice"
              className={
                currentActiveTab === "Practice" ? styles.svg__selected : ""
              }
            />
            <h4
              className={currentActiveTab === "Practice" ? styles.selected : ""}
            >
              Practice
            </h4>
          </li>
          <li
            onClick={(e) => handleProfileClick(e)}
            className={
              currentActiveTab === "Profile" ? styles.selected__list_item : ""
            }
          >
            <img
              src="/logos/ProfileIcon.svg"
              alt="Profile"
              className={
                currentActiveTab === "Profile" ? styles.svg__selected : ""
              }
            />
            <h4
              className={currentActiveTab === "Profile" ? styles.selected : ""}
            >
              Profile
            </h4>
          </li>
          {displayProfileMenu ? (
            <ul className={styles.Sidebar__profileMenu}>
              <li
                onClick={(e) => handleListItemClick("MyBookmarks", e)}
                className={
                  currentActiveTab === "MyBookmarks"
                    ? styles.selected__list_item
                    : ""
                }
              >
                <img
                  src="/logos/BookmarkIcon.svg"
                  alt="MyBookmarks"
                  className={
                    currentActiveTab === "MyBookmarks"
                      ? styles.svg__selected
                      : ""
                  }
                />
                <h4
                  className={
                    currentActiveTab === "MyBookmarks" ? styles.selected : ""
                  }
                >
                  My Bookmarks
                </h4>
              </li>
            </ul>
          ) : (
            ""
          )}
          <li onClick={openSignPOutModal}>
            <img src="/logos/SignOutIcon.svg" alt="SignOut" />
            <h4>Sign Out</h4>
          </li>
        </ul>
      </div>
    </div>
  );
};

export { Sidebar };
