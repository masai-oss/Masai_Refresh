import React from "react";
import { Route, Redirect } from "react-router-dom";
import { IsAdmin } from "../Structure/Common";
import { Navbar } from "../Structure/Navbar";
import { getFromStorage } from "../Utils/localStorageHelper";
import { storageEnums } from "../Enums/storageEnums";
import { SidebarSelected } from "../Structure/Common";


const AdminRoute = ({ component: Component, ...rest }) => {
  let token = getFromStorage(storageEnums.TOKEN, "");
  const isAdmin = IsAdmin();
  let path = rest.path
  SidebarSelected({ add: true, path: path });
  return (
    <Route
      {...rest}
      render={(props) =>
        token ? (
          isAdmin ? (
            <Navbar isAdmin={isAdmin}>
              <Component {...props} />
            </Navbar>
          ) : (
            <Redirect to="/quiz_topics" />
          )
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

export { AdminRoute };
