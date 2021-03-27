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
import { useDispatch } from "react-redux";
import { authActions } from "../../Authentication";

const REACT_APP_AUTH_GOOGLE_LOGOUT_URL =
  process.env.REACT_APP_AUTH_GOOGLE_LOGOUT_URL;

const LogoutDialog = ({ open, handleClose }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const dispatch = useDispatch();
  const logout = () => {
    window.open(REACT_APP_AUTH_GOOGLE_LOGOUT_URL, "_self");
    dispatch(authActions.logoutProcess());
  };
  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        aria-labelledby="responsive-dialog-title"
        onClick={handleClose}
      >
        <DialogTitle id="responsive-dialog-title">Logout</DialogTitle>
        <DialogContent>
          <DialogContentText>Would you like to logout ?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={logout}
            style={{ backgroundColor: "#6C8D9E" }}
          >
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export { LogoutDialog };
