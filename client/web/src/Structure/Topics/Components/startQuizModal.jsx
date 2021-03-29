import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  useMediaQuery,
} from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { topicActions } from "../State/action";
import { useHistory } from "react-router";
import { LoadingButton } from "../../Common";

const StartQuizModal = ({ modalData, handleClose }) => {
  const { open, topic, topicId } = modalData;
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const dispatch = useDispatch();
  const history = useHistory();
  const isLoadingQuiz = useSelector((state) => state.topics.isLoadingQuiz);
  const isSuccessQuiz = useSelector((state) => state.topics.isSuccessQuiz);
  const startQuiz = () => {
    dispatch(topicActions.attemptQuiz(topicId)).then((res) => {
      if (res.final === "success") {
        history.replace(`/quiz_questions/${topic}`);
      } else if (res.final === "failure") {
        alert("Unable to start Quiz try later");
      }
    });
  };
  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        aria-labelledby="responsive-dialog-title"
        fullWidth={true}
        maxWidth="md"
      >
        <DialogTitle id="responsive-dialog-title">Start Quiz</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {`You are about to start a quiz on ${topic.split("_").join(" ")}. Are you sure you wanna go ahead`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            onClick={handleClose}
            disabled={isLoadingQuiz}
            color="primary"
          >
            Cancel
          </Button>
          <LoadingButton
            isLoading={isLoadingQuiz}
            isSuccess={isSuccessQuiz}
            innerText="Start"
            submit={startQuiz}
          />
        </DialogActions>
      </Dialog>
    </div>
  );
};

export { StartQuizModal };
