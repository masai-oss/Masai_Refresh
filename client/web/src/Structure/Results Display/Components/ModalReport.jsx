import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";
import ReportIcon from "@material-ui/icons/Report";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import { useMediaQuery } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import { modalStyles } from "../Styles/ModalStyles";

const ModalReport = () => {
  const classes = modalStyles();
  const theme = useTheme();

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
      <Tooltip title="Report" placement="bottom">
        <ReportIcon className={classes.icon} onClick={handleClickOpen} />
      </Tooltip>

      <Dialog
        className={classes.modal}
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" className={classes.title}>
          Tell us how we can help
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <h5 className={classes.reason}>PICK A REASON</h5>
            <div className={classes.flex}>
              <div>Question Unclear</div>
              <div>Wrong Options</div>
              <div>Insufficient Data</div>
              <div>Explanation Unclear</div>
            </div>
            <h3 className={classes.margin}>Please provide some more info</h3>
            <TextareaAutosize
              aria-label="Explanation"
              rowsMin={9}
              name="explanation"
              className={classes.textAreaWidth}
              required
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} style={{ float: "left" }}>
            Close
          </Button>
          <Button
            onClick={handleClose}
            variant="contained"
            color="primary"
            autoFocus
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export { ModalReport };
