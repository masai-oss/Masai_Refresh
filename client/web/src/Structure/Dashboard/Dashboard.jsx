import React from "react";
import { Redirect } from "react-router-dom";

const Dashboard = () => {
  let token = localStorage.getItem("token");
  return (
    <>{token ? <Redirect to="/quiz_topics" /> : <Redirect to="/login" />}</>
  );
};

export { Dashboard };
