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
import { Dialog } from "../Common/Dialog";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

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
            <div className={classes.navbarName}>
              <img src={MasaiLogo} alt="masaiLogo" onClick={goHome} />
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
      <Dialog
        open={open}
        handleClose={handleClose}
        message="Are you sure you want to logout?"
        okBtnTitle="Agree"
        cancelBtnTitle="Cancel"
      />
    </>
  );
}

export { Navbar };
