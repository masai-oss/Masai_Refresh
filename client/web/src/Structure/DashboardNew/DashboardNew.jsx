import React from "react";
import styles from "./Dashboard.module.css";
import Cards from "./Cards";
import Sidebar from "./Sidebar";
const DashboardNew = () => {
  return (
    <div className={styles.Dashboard}>
      <Sidebar />
      <Cards />
    </div>
  );
};

export { DashboardNew };
