import React, { useState } from "react";
import EditIcon from "@material-ui/icons/Edit";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  MenuItem,
} from "@material-ui/core";
import { useHistory } from "react-router";
import { NavbarStyles } from "../Styles/NavbarStyle";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import { LogoutDialog } from "./logoutDialog";

const SideBarList = () => {
  const history = useHistory();
  const [selected, chooseSelected] = useState(0);
  const [open, setOpen] = useState(false);
  const goTo = (to) => {
    history.push(to);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const classes = NavbarStyles();

  return (
    <>
      <List>
        <MenuItem
          button
          onClick={() => chooseSelected(0)}
          selected={selected === 0}
        >
          <ListItem button onClick={() => goTo("/quiz_topics")}>
            <ListItemIcon className={classes.iconColor}>
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
          <ListItem button onClick={() => setOpen(true)}>
            <ListItemIcon className={classes.exitColor}>
              <PowerSettingsNewIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        </MenuItem>
      </List>
      <LogoutDialog open={open} handleClose={handleClose} />
    </>
  );
};

export { SideBarList };
