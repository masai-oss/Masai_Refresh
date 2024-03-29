import React, { useRef, useState } from "react";
import { Dialog, DialogActions, DialogContent } from "@material-ui/core";
import { resultAction, modalStyles } from "../../Results Display";
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

function ReportDialog({ question_id, customMargin, statement }) {
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
      <IssueReport onClick={handleClickOpen}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <svg
            width="22"
            height="21"
            viewBox="0 0 22 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M2.25 2C2.1837 2 2.12011 2.02634 2.07322 2.07322C2.02634 2.12011 2 2.1837 2 2.25V14.75C2 14.888 2.112 15 2.25 15H4.75C4.94891 15 5.13968 15.079 5.28033 15.2197C5.42098 15.3603 5.5 15.5511 5.5 15.75V18.94L8.927 15.513C9.25501 15.1848 9.69996 15.0002 10.164 15H19.75C19.8163 15 19.8799 14.9737 19.9268 14.9268C19.9737 14.8799 20 14.8163 20 14.75V2.25C20 2.1837 19.9737 2.12011 19.9268 2.07322C19.8799 2.02634 19.8163 2 19.75 2H2.25ZM0.5 2.25C0.5 1.284 1.284 0.5 2.25 0.5H19.75C20.716 0.5 21.5 1.284 21.5 2.25V14.75C21.5 15.2141 21.3156 15.6592 20.9874 15.9874C20.6592 16.3156 20.2141 16.5 19.75 16.5H10.164C10.1311 16.4999 10.0986 16.5064 10.0682 16.5189C10.0379 16.5314 10.0103 16.5498 9.987 16.573L6.487 20.073C6.28324 20.2767 6.02367 20.4153 5.74111 20.4715C5.45854 20.5277 5.16567 20.4988 4.8995 20.3886C4.63333 20.2784 4.40581 20.0917 4.24571 19.8522C4.08561 19.6127 4.0001 19.3311 4 19.043V16.5H2.25C1.78587 16.5 1.34075 16.3156 1.01256 15.9874C0.684375 15.6592 0.5 15.2141 0.5 14.75V2.25ZM11 4C11.1989 4 11.3897 4.07902 11.5303 4.21967C11.671 4.36032 11.75 4.55109 11.75 4.75V8.75C11.75 8.94891 11.671 9.13968 11.5303 9.28033C11.3897 9.42098 11.1989 9.5 11 9.5C10.8011 9.5 10.6103 9.42098 10.4697 9.28033C10.329 9.13968 10.25 8.94891 10.25 8.75V4.75C10.25 4.55109 10.329 4.36032 10.4697 4.21967C10.6103 4.07902 10.8011 4 11 4ZM11 13C11.2652 13 11.5196 12.8946 11.7071 12.7071C11.8946 12.5196 12 12.2652 12 12C12 11.7348 11.8946 11.4804 11.7071 11.2929C11.5196 11.1054 11.2652 11 11 11C10.7348 11 10.4804 11.1054 10.2929 11.2929C10.1054 11.4804 10 11.7348 10 12C10 12.2652 10.1054 12.5196 10.2929 12.7071C10.4804 12.8946 10.7348 13 11 13Z"
              fill="#333434"
            />
          </svg>
          {statement === -1 ? null : (
            <h3 style={{ marginLeft: "15px" }}>{statement}</h3>
          )}
        </div>
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

export { ReportDialog };
