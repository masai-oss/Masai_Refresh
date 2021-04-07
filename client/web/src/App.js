import React from "react";
import { Routes } from "./Routes/Routes";
import { Navbar } from "./Structure/Navbar";
import { IsAdmin } from "./Structure/Common/";
import { DotsLogo } from "./Structure/Common/DotsLogo";
import { PageWrapper, DotsPos } from "./App.Styles";

const App = () => {
  const isAdmin = IsAdmin();
  let crnLocation = window.location.href.split("/");
  let crnParam = crnLocation[crnLocation.length - 1];
  return (
    <div>
      <Navbar isAdmin={isAdmin} />
      <PageWrapper>
        <Routes />
      </PageWrapper>
      {crnParam === "login" || crnParam === "" ? (
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
