import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import ReportIcon from "@material-ui/icons/Report";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import { useMediaQuery } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import { modalStyles } from "../Styles/ModalStyles";

const ModalReport = () => {
  const classes = modalStyles();
  const theme = useTheme();

  // eslint-disable-next-line no-unused-vars
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <ReportIcon className={classes.icon} onClick={handleClickOpen} />
      <Dialog
        fullScreen={fullScreen}
        className={classes.modal}
        open={open}
        maxWidth="xl"
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <div id="alert-dialog-title" className={classes.title}>
          Report issue with a question
        </div>
        <div
          className={classes.hr}
          style={{ height: "0.5px", width: "100%", background: " #D6D6D6" }}
        ></div>
        <div className={classes.title}>
          What seems to be the issue with the question ?
        </div>
        <div className={classes.flex}>
          <div>Question Unclear</div>
          <div>Wrong Options</div>
          <div>Insufficient Data</div>
          <div>Explanation Unclear</div>
          <div>Others</div>
        </div>
        <div className={classes.details}>Add Details</div>
        <TextareaAutosize
          aria-label="Explanation"
          rowsMin={9}
          name="explanation"
          className={classes.textAreaWidth}
          required
        />
        <div className={classes.buttonFlex}>
          <button onClick={handleClose}>Cancel</button>
          <button onClick={handleClose} className={classes.submit}>
            Submit
          </button>
        </div>
      </Dialog>
    </div>
  );
};

export { ModalReport };
