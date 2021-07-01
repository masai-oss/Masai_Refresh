import React, { useRef, useState } from "react";
import { Dialog, DialogActions, DialogContent } from "@material-ui/core";
import { resultAction, modalStyles } from "../../Results Display";
import { useDispatch } from "react-redux";
import { makeStyles, Theme } from "@material-ui/core";
import report from "../../../Assets/report.svg";
import styles from "../Styles/ReportSuccess.module.css";
import CloseIcon from "@material-ui/icons/Close";
import DoneIcon from "@material-ui/icons/Done";
import {
  IssueReport,
  Line,
  Tag,
  TagsWrapper,
  CustomizedTextArea,
  CustomButton,
} from "../Styles/ReportDialogBoxStyles";
import ReasonEnums from "../../../Enums/ReasonEnums";
import { useSelector } from "react-redux";
import { CustomizedSnackbars } from "../AlertPopUps/CustomizedSnackbars";
import tick from "../../../Assets/tick.svg";
const useStyles = makeStyles((theme) => ({
  backDrop: {
    backdropFilter: "blur(10px)",
    backgroundColor: "rgba(0,0,30,0.4)",
  },
}));
function ReportSuccessModal({ question_id, customMargin, isOpen }) {
  const classes = modalStyles();
  const classesNew = useStyles();

  const [open, setOpen] = useState(false);
  const [select, setSelect] = useState([]);
  const [details, setDetails] = useState("");
  const snackbarBtnRef = useRef();

  const handleClose = async (submit) => {
    setOpen(false);
    setSelect([]);
    setDetails("");
  };

  React.useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);
  const handleClickOpen = () => {
    setOpen(isOpen);
  };
  const handleReport = () => {};

<<<<<<< HEAD
	return (
		<div>
			<Dialog
				BackdropProps={{
					classes: {
						root: classesNew.backDrop
					}
				}}
				className={classes.modalWidth}
				open={open}
				onClose={() => handleClose(false)}
				maxWidth={'lg'}
				aria-labelledby="responsive-dialog-title"
			>
				<div className={classes.title} id="responsive-dialog-title">
					{'Report an issue with the question'}{' '}
					<span style={{ float: 'right', cursor: 'pointer' }}>
						<CloseIcon onClick={() => handleClose(false)} />
					</span>
				</div>
				<Line />
				<div style={{ height: '60px' }} />

				<DialogContent className={styles.dialogContent}>
					<img className={styles.tickImg} src={tick} alt="tick" />
					<div> Thank you for submitting your query.</div>
					<div>We will ensure the problem is </div>
					<div>resolved</div>
				</DialogContent>
				<DialogActions>
					<button
						className={styles.submitBtn}
						onClick={() => handleClose(true, 'here')}
						autoFocus
						submitBtn={true}
						disabled={details.length === 0 || select.length === 0}
					>
						<span onClick={() => handleClose(false)}>Go Back</span>
					</button>
				</DialogActions>
			</Dialog>
		</div>
	);
=======
  return (
    <div>
      {/* <h1 onClick={handleClickOpen}></h1> */}
      <Dialog
        BackdropProps={{
          classes: {
            root: classesNew.backDrop,
          },
        }}
        className={classes.modalWidth}
        open={open}
        onClose={() => handleClose(false)}
        maxWidth={"lg"}
        aria-labelledby="responsive-dialog-title"
      >
        <div className={classes.title} id="responsive-dialog-title">
          {"Report an issue with the question"}{" "}
          <span style={{ float: "right", cursor: "pointer" }}>
            <CloseIcon onClick={() => handleClose(false)} />
          </span>
        </div>
        <Line />
        <div style={{ height: "60px" }} />

        <DialogContent className={styles.dialogContent}>
          <img className={styles.tickImg} src={tick} alt="tick" />
          <div> Thank you for submitting your query.</div>
          <div>We will ensure the problem is </div>
          <div>resolved</div>
        </DialogContent>
        <DialogActions className={styles.dialogActions}>
          <button
            className={styles.submitBtn}
            onClick={() => handleClose(true, "here")}
            // color="primary"
            autoFocus
            submitBtn={true}
            disabled={details.length === 0 || select.length === 0}
          >
            <span onClick={() => handleClose(false)}>Go Back</span>
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
>>>>>>> 390ae7560e7f32c754fa06e645a27d5514e5d912
}

export { ReportSuccessModal };
