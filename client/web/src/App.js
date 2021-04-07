import React from "react";
import { Routes } from "./Routes/Routes";
import { Navbar } from "./Structure/Navbar";
import { IsAdmin } from "./Structure/Common/";
import { DotsLogo } from "./Structure/Common/DotsLogo";
import { PageWrapper, DotsPos } from "./App.Styles";
import { useSelector } from "react-redux";

const App = () => {
  const isAdmin = IsAdmin();
  let isAuth = useSelector((state) => state.authentication.token);
  return (
    <div>
      <Navbar isAdmin={isAdmin} />
      <PageWrapper>
        <Routes />
      </PageWrapper>
      {isAuth === null ? (
        <DotsPos>
          <DotsLogo />
        </DotsPos>
      ) : (
        <DotsLogo />
      )}
    </div>
  );
};

export { App };
