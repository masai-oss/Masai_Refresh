import React, { useState } from "react";
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  MenuItem,
} from "@material-ui/core";
import { NavbarStyles } from "../Styles/NavbarStyle";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import { LogoutDialog } from "./logoutDialog";

const LogoutSideBarMenu = ({ selected }) => {
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const classes = NavbarStyles();
  return (
    <>
      <MenuItem
        button
        selected={selected === "logout"}
      >
        <ListItem button onClick={() => setOpen(true)}>
          <ListItemIcon className={classes.exitColor}>
            <PowerSettingsNewIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </MenuItem>
      <LogoutDialog open={open} handleClose={handleClose} />
    </>
  );
};

export { LogoutSideBarMenu };
