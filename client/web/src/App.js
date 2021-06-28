import React from "react";
import { Routes } from "./Routes/Routes";

// import { IsAdmin } from "./Structure/Common/";
import { PageWrapper } from "./App.Styles";
import { useGA } from "./Utils/googleAnalyticsHook";

const App = () => {
  // const isAdmin = IsAdmin();
  useGA();
  return (
    <div>
      <PageWrapper>
        <Routes />
      </PageWrapper>
    </div>
  );
};

export { App };
