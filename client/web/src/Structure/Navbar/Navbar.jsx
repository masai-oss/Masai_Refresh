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
import MasaiLogo from "./Components/MasaiLogo.svg";
import { useHistory } from "react-router";
import { LogoutDialog } from "./Components/LogoutDialog";
import PropTypes from "prop-types";
import { getFromStorage } from "../../Utils/localStorageHelper";
import { storageEnums } from "../../Enums/storageEnums";

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
  let isAuth = getFromStorage(storageEnums.TOKEN);
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
            {isAuth && <Button color="inherit" onClick={() => setOpen(true)}>
              Sign Out
            </Button>}
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <Toolbar />
      <main>
        <div className={classes.content} />
        {children}
      </main>
      <LogoutDialog open={open} handleClose={handleClose} />
    </>
  );
}

export { Navbar };
