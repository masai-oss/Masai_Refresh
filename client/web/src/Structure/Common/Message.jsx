import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";

const Alert = (props) => <MuiAlert elevation={6} variant="filled" {...props} />;

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

const Message = ({ message, handleCloseMessage }) => {
  const classes = useStyles();
  const { open, message: crnMessage, severity } = message
  return (
    <div className={classes.root}>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        onClose={handleCloseMessage}
      >
        <Alert severity={severity}>{crnMessage}</Alert>
      </Snackbar>
    </div>
  );
};

export { Message };
