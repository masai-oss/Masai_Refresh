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
import { LogoutSideBarMenu } from "./LogoutSideBarMenu"
import { useSelector } from "react-redux"

const UserSideBarList = () => {
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
        <MenuItem button selected={selected === "quiz_topics"}>
          <ListItem button onClick={() => goTo("/quiz_topics")}>
            <ListItemIcon className={classes.iconColor}>
              <EditIcon />
            </ListItemIcon>
            <ListItemText primary="Quiz" />
          </ListItem>
        </MenuItem>
        <LogoutSideBarMenu
          selected={selected}
        />
      </List>
      <LogoutDialog open={open} handleClose={handleClose} />
    </>
  );
};

export { UserSideBarList };
