import React from "react";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    zIndex: 45,
    width: "100vw",
    height: "100vh"
  },
  align: {
    position: "absolute",
    margin: "auto",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    width: "100px",
    height: "100px",
  },
}));

const Spinner = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.align}>
        <Loader type="Grid" color="#2d799f" height={80} width={80} />{" "}
      </div>
    </div>
  );
};

export { Spinner };



