import React from "react";
import styles from "./Sidebar.module.css";
import logo from "./logo.svg";
import profile from "./profile.svg";
const Sidebar = () => {
  return (
    <div className={styles.Sidebar}>
      <div className={styles.logoContainer}>
        <img src={logo} alt="Masai Refresh" />
      </div>
      <div className={styles.navContainer}>
        <ul>
          <li>
            <img src={profile} alt="Profile" />
            <h4>Quiz</h4>
          </li>
          <li>
            <img src={profile} alt="Profile" />
            <h4>Practice</h4>
          </li>
          <li>
            <img src={profile} alt="Profile" />
            <h4>Profile</h4>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
