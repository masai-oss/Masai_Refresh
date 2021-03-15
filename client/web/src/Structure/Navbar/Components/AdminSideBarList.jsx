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
import { LogoutDialog } from "./logoutDialog";
import { LogoutSideBarMenu } from "./LogoutSideBarMenu";
import { useSelector } from "react-redux";

const AdminSideBarList = () => {
  const history = useHistory();
  const selected = useSelector((state) => state.common.selected);
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
        <MenuItem button selected={selected === "topics"}>
          <ListItem button onClick={() => goTo("/topics")}>
            <ListItemIcon className={classes.iconColor}>
              <EditIcon />
            </ListItemIcon>
            <ListItemText primary="Topics" />
          </ListItem>
        </MenuItem>
        <MenuItem button selected={selected === "questions_admin"}>
          <ListItem button onClick={() => goTo("/questions_admin")}>
            <ListItemIcon className={classes.iconColor}>
              <EditIcon />
            </ListItemIcon>
            <ListItemText primary="Questions" />
          </ListItem>
        </MenuItem>
        <LogoutSideBarMenu selected={selected} />
      </List>
      <LogoutDialog open={open} handleClose={handleClose} />
    </>
  );
};

export { AdminSideBarList };
