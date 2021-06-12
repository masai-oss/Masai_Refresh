import React from "react";
import styles from "./Sidebar.module.css";
import logo from "./logo.svg";
import profile from "./profile.svg";
const Sidebar = ({ setRightSideContent }) => {
  const handleListItemClick = (id) => {
    setRightSideContent(id);
  };
  return (
    <div className={styles.Sidebar}>
      <div className={styles.logoContainer}>
        <img src={logo} alt="Masai Refresh" />
      </div>
      <div className={styles.navContainer}>
        <ul>
          <li onClick={() => handleListItemClick("Cards")}>
            <img src={profile} alt="Profile" />
            <h4>Quiz</h4>
          </li>
          <li onClick={() => handleListItemClick("Cards")}>
            <img src={profile} alt="Profile" />
            <h4>Practice</h4>
          </li>
          <li onClick={() => handleListItemClick("Cards")}>
            <img src={profile} alt="Profile" />
            <h4>Profile</h4>
          </li>
          <li onClick={() => handleListItemClick("MyBookmarks")}>
            <img src={profile} alt="MyBookmarks" />
            <h4>My Bookmarks</h4>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
