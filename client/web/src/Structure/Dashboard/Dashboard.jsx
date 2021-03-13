import React from "react";
import { Redirect } from "react-router-dom";
import { getFromStorage } from "../../Utils/localStorageHelper"
import { storageEnums } from "../../Enums/storageEnums"

const Dashboard = () => {
  let token = getFromStorage(storageEnums.TOKEN, "");
  return (
    <>{token ? <Redirect to="/quiz_topics" /> : <Redirect to="/login" />}</>
  );
};

export { Dashboard };
