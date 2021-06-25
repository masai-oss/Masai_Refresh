import React from "react";
import clsx from "clsx";
import { CircularProgress, Button } from "@material-ui/core";
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
          style={{ backgroundColor: "#5B6AFA", color: 'white' }}
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
