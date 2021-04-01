import React, { useRef, useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { resultAction } from "../../Results Display";
import { useDispatch } from "react-redux";
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
import { modalStyles } from "../../Results Display/Styles/ModalStyles";

export default function ReportDialog({ question_id, customMargin }) {
  const classes = modalStyles();
  const [open, setOpen] = useState(false);
  const [select, setSelect] = useState([]);
  const [details, setDetails] = useState("");
  const [success, setSuccess] = useState(false);
  const snackbarBtnRef = useRef();
  const errorMessage = useSelector((state) => state.resultReducer.errorMessage);
  let issues = Object.values(ReasonEnums);

  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = async (submit) => {
    if (submit) {
      if (details.length === 0 || select.length === 0) {
        return;
      }
      let res = await handleReport();
      if (res.output) {
        setSuccess(true);
      } else {
        setSuccess(false);
      }
      snackbarBtnRef.current.click();
    }
    setOpen(false);
    setSelect([]);
    setDetails("");
  };

  const handleDetailsChange = (e) => {
    setDetails(e.target.value);
  };

  const toggleSelect = (index) => {
    setSelect((prev) => {
      if (prev.includes(index)) {
        return prev.filter((el) => el !== index);
      }
      if (prev.length === 4) {
        return prev;
      }
      return [...prev, index];
    });
  };

  const handleReport = async () => {
    let reasons = select.map((ind) => issues[ind]);
    const payload = {
      question_id,
      reason: reasons,
      des: details,
    };
    return dispatch(resultAction.sendReport(payload));
  };

  return (
    <div>
      <IssueReport onClick={handleClickOpen} margin={customMargin}>
        Report an issue with the question
      </IssueReport>
      <Dialog
        open={open}
        onClose={() => handleClose(false)}
        maxWidth={"lg"}
        aria-labelledby="responsive-dialog-title"
      >
        <div className={classes.title} id="responsive-dialog-title">
          {"Report an issue with the question"}
        </div>
        <Line />
        <DialogContent>
          <div>
            <h3>What seems to be the issue with the question? * </h3>
            <TagsWrapper>
              {issues.map((el, i) => (
                <Tag
                  onClick={() => toggleSelect(i)}
                  selected={select.includes(i)}
                  key={i}
                >
                  {el}
                </Tag>
              ))}
            </TagsWrapper>
          </div>
          <div>
            <h3 className={classes.details}>Add Details *</h3>
            <CustomizedTextArea
              onChange={handleDetailsChange}
              value={details}
            />
          </div>
        </DialogContent>
        <DialogActions style={{ paddingBottom: "30px" }}>
          <CustomButton
            autoFocus
            onClick={() => handleClose(false)}
            color="primary"
          >
            Cancel
          </CustomButton>
          <CustomButton
            onClick={() => handleClose(true, "here")}
            color="primary"
            autoFocus
            submitBtn={true}
            disabled={details.length === 0 || select.length === 0}
          >
            Submit
          </CustomButton>
        </DialogActions>
      </Dialog>
      <CustomizedSnackbars
        success={success}
        message={
          success
            ? "The question has been successfully reported."
            : errorMessage
        }
        ref={snackbarBtnRef}
      />
    </div>
  );
}
