import React from "react";
import styles from "./Sidebar.module.css";
import logo from "./logo.svg";

const Sidebar = ({ setRightSideContent }) => {
  const [displayProfileMenu, setDisplayProfileMenu] = React.useState(false);
  const [currentActiveTab, setCurrentActiveTab] = React.useState("Quiz");
  const handleListItemClick = (id, e) => {
    console.log(e.currentTarget);
    setRightSideContent(id);
    setCurrentActiveTab(id);
  };

  const handleProfileClick = () => {
    setDisplayProfileMenu(!displayProfileMenu);
    setCurrentActiveTab("Profile");
  };
  return (
    <div className={styles.Sidebar}>
      <div className={styles.logoContainer}>
        <img src={logo} alt="Masai Refresh" />
      </div>
      <div className={styles.navContainer}>
        <ul>
          <li onClick={(e) => handleListItemClick("Quiz", e)}>
            <img src="/logos/QuizIcon.svg" alt="Quiz" />
            <h4 className={currentActiveTab === "Quiz" ? styles.selected : ""}>
              Quiz
            </h4>
          </li>
          <li onClick={(e) => handleListItemClick("Practice", e)}>
            <img src="/logos/PracticeIcon.svg" alt="Practice" />
            <h4
              className={currentActiveTab === "Practice" ? styles.selected : ""}
            >
              Practice
            </h4>
          </li>
          <li
            onClick={(e) => handleProfileClick(e)}
            className={currentActiveTab === "Profile" ? styles.selected : ""}
          >
            <img src="/logos/ProfileIcon.svg" alt="Profile" />
            <h4
              className={currentActiveTab === "Profile" ? styles.selected : ""}
            >
              Profile
            </h4>
          </li>
          {displayProfileMenu ? (
            <ul className={styles.Sidebar__profileMenu}>
              <li onClick={(e) => handleListItemClick("MyBookmarks", e)}>
                <img src="/logos/BookmarkIcon.svg" alt="MyBookmarks" />
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
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
