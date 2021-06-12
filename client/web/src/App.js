import React from "react";
import { Routes } from "./Routes/Routes";
import { Navbar } from "./Structure/Navbar";
import { IsAdmin } from "./Structure/Common/";
import { PageWrapper } from "./App.Styles";
import { useGA } from "./Utils/googleAnalyticsHook";

const App = () => {
  const isAdmin = IsAdmin();
  useGA();
  return (
    <div>
      {/* <Navbar isAdmin={isAdmin} /> */}
      <PageWrapper>
        <Routes />
      </PageWrapper>
    </div>
  );
};

export { App };
