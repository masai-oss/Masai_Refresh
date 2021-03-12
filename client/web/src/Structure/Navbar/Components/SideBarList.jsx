import React from "react";
import { useDispatch } from "react-redux";
import EditIcon from "@material-ui/icons/Edit";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { authActions } from "../../Authentication";

const REACT_APP_AUTH_GOOGLE_LOGOUT_URL =
  process.env.REACT_APP_AUTH_GOOGLE_LOGOUT_URL;

let sideBarProperty = [
  { name: "Quiz", icon: <EditIcon /> },
  { name: "Logout", icon: <ExitToAppIcon /> },
];

const SideBarList = () => {
  const dispatch = useDispatch();
  // eslint-disable-next-line no-unused-vars
  const logout = () => {
    window.open(REACT_APP_AUTH_GOOGLE_LOGOUT_URL, "_self");
    dispatch(authActions.logoutProcess());
  };
  return (
    <List>
      {sideBarProperty.map(({ name, icon }) => (
        <ListItem button key={name}>
          <ListItemIcon>{icon}</ListItemIcon>
          <ListItemText primary={name} />
        </ListItem>
      ))}
    </List>
  );
};

export { SideBarList };
