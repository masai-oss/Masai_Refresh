import React from "react";
import "../../Styles/StyleContainer.css";

const StyleContainer = (props) => {
  const classes = "style-container " + props.className;
  return <div className={classes}>{props.children}</div>;
};

export default StyleContainer;
