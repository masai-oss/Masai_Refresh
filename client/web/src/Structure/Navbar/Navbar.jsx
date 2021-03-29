import React, { useState } from "react";
import {
  AppBar,
  CssBaseline,
  Toolbar,
  useScrollTrigger,
  Slide,
  Button,
} from "@material-ui/core";
import { NavbarStyles } from "./Styles/NavbarStyle";
import MasaiLogo from "../../Resources/MasaiLogo.svg";
import { useHistory } from "react-router";
import { CustomDialog } from "../Common/CustomDialog";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { authActions } from "../Authentication";

const REACT_APP_AUTH_GOOGLE_LOGOUT_URL =
  process.env.REACT_APP_AUTH_GOOGLE_LOGOUT_URL;

function HideOnScroll(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({ target: window ? window() : undefined });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

HideOnScroll.propTypes = {
  children: PropTypes.element.isRequired,
  window: PropTypes.func,
};

function Navbar(props) {
  const { children } = props;
  const classes = NavbarStyles();
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const logout = () => {
    window.open(REACT_APP_AUTH_GOOGLE_LOGOUT_URL, "_self");
    dispatch(authActions.logoutProcess());
  };

  const handleClose = () => {
    setOpen(false);
  };
  const goHome = () => {
    history.push("/");
  };
  let isAuth = useSelector((state) => state.authentication.token);
  return (
    <>
      <CssBaseline />
      <HideOnScroll {...props}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <div className={classes.navbarName} style={{cursor: "pointer"}} onClick={goHome} >
              <img src={MasaiLogo} alt="masaiLogo" />
              <p className={classes.refresh}>refresh</p>
            </div>
            {isAuth && (
              <Button color="inherit" onClick={() => setOpen(true)}>
                Sign Out
              </Button>
            )}
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <Toolbar />
      <main>
        <div className={classes.content} />
        {children}
      </main>
      <CustomDialog
        open={open}
        handleClose={handleClose}
        message="Are you sure you want to logout?"
        okBtnTitle="Agree"
        cancelBtnTitle="Cancel"
        onOkAction={logout}
      />
    </>
  );
}

export { Navbar };
