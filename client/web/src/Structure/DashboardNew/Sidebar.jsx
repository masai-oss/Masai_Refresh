import React from "react";
import styles from "./Sidebar.module.css";
import logo from "./logo.svg";
import profile from "./profile.svg";
const Sidebar = ({ setRightSideContent }) => {
  const [displayProfileMenu, setDisplayProfileMenu] = React.useState(false);

  const handleListItemClick = (id, e) => {
    console.log(e.currentTarget);
    setRightSideContent(id);
  };

  const handleProfileClick = () => {
    setDisplayProfileMenu(!displayProfileMenu);
  };
  return (
    <div className={styles.Sidebar}>
      <div className={styles.logoContainer}>
        <img src={logo} alt="Masai Refresh" />
      </div>
      <div className={styles.navContainer}>
        <ul>
          <li onClick={(e) => handleListItemClick("Cards", e)}>
            <img src={profile} alt="Profile" />
            <h4>Quiz</h4>
          </li>
          <li onClick={(e) => handleListItemClick("Cards", e)}>
            <img src={profile} alt="Practice" />
            <h4>Practice</h4>
          </li>
          <li onClick={(e) => handleProfileClick(e)}>
            <img src={profile} alt="Profile" />
            <h4>Profile</h4>
          </li>
          {displayProfileMenu ? (
            <ul className={styles.Sidebar__profileMenu}>
              <li onClick={(e) => handleListItemClick("MyBookmarks", e)}>
                <img src={profile} alt="MyBookmarks" />
                <h4>My Bookmarks</h4>
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
