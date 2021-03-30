import React, { useState } from "react";
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
import { useDispatch } from "react-redux";
import { getReport } from "../../Results Display/State/action";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const ModalReport = (props) => {
  const { question_id } = props;
  const classes = modalStyles();
  const dispatch = useDispatch();
  const theme = useTheme();
  const [reason, setReason] = useState([]);
  const [des, setDes] = useState("");

  // eslint-disable-next-line no-unused-vars
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleReport = () => {
    setOpenSnack(true);
    setOpen(false);
    const payload = {
      question_id: question_id,
      reason: reason,
      des: des,
    };
    dispatch(getReport(payload));
  };
  const [openSnack, setOpenSnack] = React.useState(false);

  const handleSnackClick = () => {
    setOpenSnack(true);
  };

  const handleSnackClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnack(false);
  };

  const handleDescription = (e) => {
    setDes(e.target.value);
  };
  const handleCancel = () => {
    setOpen(false);
    setDes("");
    setReason([]);
  };
  const handleReason = (e) => {
    if (reason.includes(e.target.innerHTML)) {
      setReason(reason.filter((item) => item != e.target.innerHTML));
    } else {
      setReason([...reason, e.target.innerHTML]);
    }
  };

  return (
    <div>
      {/* <ReportIcon className={classes.icon} onClick={handleClickOpen} /> */}
      <div className={classes.report} onClick={handleClickOpen}>
        Report an issue with the question
      </div>
      <Dialog
        fullScreen={fullScreen}
        className={classes.modal}
        open={open}
        maxWidth="xl"
        aria-labelledby="responsive-dialog-title"
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
        <div onClick={handleReason} className={classes.flex}>
          <div
            style={
              reason.includes("Question Unclear")
                ? { background: "#2D799F", color: "white" }
                : null
            }
          >
            Question Unclear
          </div>
          <div
            style={
              reason.includes("Wrong Options")
                ? { background: "#2D799F", color: "white" }
                : null
            }
          >
            Wrong Options
          </div>
          <div
            style={
              reason.includes("Insufficient Data")
                ? { background: "#2D799F", color: "white" }
                : null
            }
          >
            Insufficient Data
          </div>
          <div
            style={
              reason.includes("Explanation Unclear")
                ? { background: "#2D799F", color: "white" }
                : null
            }
          >
            Explanation Unclear
          </div>
          <div
            style={
              reason.includes("Others")
                ? { background: "#2D799F", color: "white" }
                : null
            }
          >
            Others
          </div>
        </div>
        <div className={classes.details}>Add Details</div>
        <TextareaAutosize
          aria-label="Explanation"
          rowsMin={9}
          name="explanation"
          className={classes.textAreaWidth}
          required
          onChange={handleDescription}
          value={des}
        />
        <div className={classes.buttonFlex}>
          <button onClick={handleCancel}>Cancel</button>
          <button
            style={
              reason.length > 0 && reason.length < 5 && des
                ? { background: "#2D799F" }
                : {
                    boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.16)",
                    color: "black",
                  }
            }
            disabled={
              reason.length > 0 && reason.length < 5 && des ? false : true
            }
            onClick={handleReport}
            className={classes.submit}
          >
            Submit
          </button>
        </div>
      </Dialog>
      <Snackbar
        open={openSnack}
        autoHideDuration={1500}
        onClose={handleSnackClose}
      >
        <Alert onClose={handleSnackClose} severity="success">
          Reported successfully
        </Alert>
      </Snackbar>
    </div>
  );
};

export { ModalReport };
