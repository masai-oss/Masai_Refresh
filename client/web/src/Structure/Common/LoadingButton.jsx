import React from "react";
import clsx from "clsx";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
import { LoadingButtonStyle } from "./Styles/LoadingButtonStyles";

const LoadingButton = ({
  isLoading,
  innerText,
  submit = "none",
  isSuccess,
  type = "button",
}) => {
  const classes = LoadingButtonStyle();
  const buttonClassname = clsx({
    [classes.buttonSuccess]: isSuccess,
  });

  return (
    <div className={classes.root}>
      <div className={classes.wrapper}>
        <Button
          variant="contained"
          style={{ backgroundColor: "#39C0ED" }}
          className={buttonClassname}
          disabled={isLoading}
          onClick={submit === "none" ? undefined : submit}
          type={type}
        >
          {innerText}
        </Button>
        {isLoading && (
          <CircularProgress size={24} className={classes.buttonProgress} />
        )}
      </div>
    </div>
  );
};

export { LoadingButton };
