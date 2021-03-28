import React from "react";
import {
  Button,
  Dialog as DialogBox,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  useMediaQuery,
  Box
} from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
import { authActions } from "../Authentication";

const REACT_APP_AUTH_GOOGLE_LOGOUT_URL =
  process.env.REACT_APP_AUTH_GOOGLE_LOGOUT_URL;

const Dialog = ({ open, handleClose, heading, message, okBtnTitle, cancelBtnTitle }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const dispatch = useDispatch();
  const logout = () => {
    window.open(REACT_APP_AUTH_GOOGLE_LOGOUT_URL, "_self");
    dispatch(authActions.logoutProcess());
  };
  return (
    <DialogBox
      fullScreen={fullScreen}
      open={open}
      aria-labelledby="responsive-dialog-title"
      onClick={handleClose}
    >
      <Box marginX={5} marginBottom={2} marginTop={1}>
        {heading && <DialogTitle id="responsive-dialog-title">{heading}</DialogTitle>}
        <DialogContent>
          <DialogContentText>{message}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} >
            {cancelBtnTitle}
          </Button>
          <Button
            variant="contained"
            onClick={logout}
            style={{ backgroundColor: "#6C8D9E", color: "white" }}
          >
            {okBtnTitle}
          </Button>
        </DialogActions>
      </Box>
    </DialogBox>
  );
};

export { Dialog };
