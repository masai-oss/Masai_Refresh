import React, { useState } from "react";
import { useDispatch } from "react-redux";
import EditIcon from "@material-ui/icons/Edit";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  MenuItem,
} from "@material-ui/core";
import { authActions } from "../../Authentication";
import { useHistory } from "react-router";

const REACT_APP_AUTH_GOOGLE_LOGOUT_URL =
  process.env.REACT_APP_AUTH_GOOGLE_LOGOUT_URL;

const SideBarList = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [selected, chooseSelected] = useState(0);
  // eslint-disable-next-line no-unused-vars
  const logout = () => {
    window.open(REACT_APP_AUTH_GOOGLE_LOGOUT_URL, "_self");
    dispatch(authActions.logoutProcess());
  };
  const goTo = (to) => {
    history.push(to);
  };
  return (
    <List>
      <MenuItem
        button
        onClick={() => chooseSelected(0)}
        selected={selected === 0}
      >
        <ListItem button onClick={() => goTo("/quiz_topics")}>
          <ListItemIcon>
            <EditIcon />
          </ListItemIcon>
          <ListItemText primary="Quiz" />
        </ListItem>
      </MenuItem>
      <MenuItem
        button
        onClick={() => chooseSelected(1)}
        selected={selected === 1}
      >
        <ListItem button onClick={logout}>
          <ListItemIcon>
            <ExitToAppIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </MenuItem>
    </List>
  );
};

export { SideBarList };
