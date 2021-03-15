import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Badge from "@material-ui/core/Badge";

const useStyles = makeStyles((theme) => ({
  badges: {
    borderRadius: 5,
    fontSize: 2,
    background: "crimson",
    color: "lavenderblush",
    fontSize: 15,
    padding: "2px 4px",
  },
}));

const TopicChip = ({ topicDisplay }) => {
  const classes = useStyles();

  return <div className={classes.badges}>{topicDisplay}</div>;
};

export { TopicChip };
