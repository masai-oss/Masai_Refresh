import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import { LoadingButton } from "..";

const CustomDialog = ({ open, handleClose, heading, message, okBtnTitle, cancelBtnTitle, onOkAction, isLoading = false, isSuccess = true }) => {
  return (
    <Dialog
      open={open}
      aria-labelledby="responsive-dialog-title"
      fullWidth={true}
      maxWidth="sm"
    >
      {heading && <DialogTitle id="alert-dialog-title">{heading}</DialogTitle>}
      <DialogContent>
        <DialogContentText>
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleClose}
          disabled={isLoading}
        >
          {cancelBtnTitle}
        </Button>
        <LoadingButton
          isLoading={isLoading}
          isSuccess={isSuccess}
          innerText={okBtnTitle}
          submit={onOkAction}
        />
      </DialogActions>
    </Dialog>
  );
};

export { CustomDialog };
