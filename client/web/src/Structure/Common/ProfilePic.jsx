import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import { getFromStorage } from "../../Utils/localStorageHelper";
import { storageEnums } from "../../Enums/storageEnums";

const useStyles = makeStyles((theme) => ({
  root: {
    float: "right",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  large: {
    width: theme.spacing(6),
    height: theme.spacing(6),
  },
}));

const ProfilePic = () => {
  const classes = useStyles();
  const name = getFromStorage(storageEnums.NAME, "");
  const profilePic = getFromStorage(storageEnums.PROFILEPIC, "");
  return <Avatar alt={name} src={profilePic} className={classes.large} />;
};

export { ProfilePic };
