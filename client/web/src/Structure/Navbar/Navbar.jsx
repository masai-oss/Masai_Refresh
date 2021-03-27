import React from "react";
import {
  AppBar,
  CssBaseline,
  Drawer,
  Hidden,
  IconButton,
  Toolbar,
  Typography,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { useTheme } from "@material-ui/core/styles";
import { NavbarStyles } from "./Styles/NavbarStyle";
import { UserSideBarList } from "./Components/UserSideBarList";
import { AdminSideBarList } from "./Components/AdminSideBarList";
import { ProfilePic } from "../Common";
import { useHistory } from "react-router";

import { authActions } from "../Authentication";
import { useDispatch } from "react-redux";


const REACT_APP_AUTH_GOOGLE_LOGOUT_URL = process.env.REACT_APP_AUTH_GOOGLE_LOGOUT_URL;

function Navbar({ window, children, isAdmin }) {
  const classes = NavbarStyles();
  const theme = useTheme();
  const history = useHistory()
  const dispatch = useDispatch()
  const [mobileOpen, setMobileOpen] = React.useState(false);
  
  // const handleDrawerToggle = () => {
  //   setMobileOpen(!mobileOpen);
  // };

  const goHome = () => {
    history.push('/')
  }

  // const drawer = (
  //   <div>
  //     <div className={classes.toolbar} onClick={goHome}>
  //       <u>Quizine</u>
  //     </div>
  //     {isAdmin ? <AdminSideBarList /> : <UserSideBarList />}
  //   </div>
  // );

  const logout = () => {
    console.log(REACT_APP_AUTH_GOOGLE_LOGOUT_URL)
    window.open(REACT_APP_AUTH_GOOGLE_LOGOUT_URL, "_self");
    dispatch(authActions.logoutProcess());
  }

  // const container =
  //   window !== undefined ? () => window().document.body : undefined;

  return (
    <div >
      <CssBaseline />
      {/* <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap className={classes.navbarName}>
            {isAdmin ? "Admin" : "User"}
          </Typography>
          <ProfilePic />
        </Toolbar>
      </AppBar> */}
      {/* <nav className={classes.drawer} aria-label="mailbox folders">
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true,
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav> */}
        <div className = {classes.Navbar} >
          <div>
          <svg width="60" height="25" viewBox="0 0 579 160"  fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 52.5928C8.73527 52.5928 17.4829 52.5928 26.5023 52.5928C26.5023 58.2139 26.5023 63.6893 26.5023 69.881C33.5449 55.4337 45.4061 50.189 60.109 50.5047C74.9355 50.8203 86.1913 57.3519 92.8756 70.5366C95.2355 67.5743 97.3853 64.3449 100.066 61.6375C106.911 54.7174 115.511 51.4152 125.21 50.6261C131.622 50.104 137.936 50.6503 144.052 52.6778C155.357 56.405 162.313 64.3692 166.304 75.1014C169.17 82.8107 169.973 90.8599 169.986 99.0062C170.01 117.97 169.998 136.933 169.998 155.897C169.998 156.37 169.936 156.856 169.887 157.524C161.25 157.524 152.651 157.524 143.755 157.524C143.755 156.577 143.755 155.642 143.755 154.707C143.755 137.103 143.854 119.512 143.681 101.908C143.644 97.865 143.162 93.6886 142.025 89.8158C139.69 81.888 134.204 76.8011 125.704 75.8541C116.079 74.7858 107.887 77.5174 102.587 86.1129C99.9923 90.3135 98.7073 94.9755 98.6579 99.856C98.4726 118.006 98.3984 136.156 98.2996 154.319C98.2996 155.351 98.2996 156.382 98.2996 157.572C89.4037 157.572 80.7055 157.572 71.7231 157.572C71.7231 156.565 71.7231 155.618 71.7231 154.683C71.7108 135.877 71.7602 117.071 71.6243 98.2656C71.5749 92.1953 69.981 86.4286 65.7431 81.803C59.17 74.6279 50.8548 74.3851 42.2925 77.0682C32.4824 80.1398 28.1703 87.6548 27.0336 97.2094C26.6383 100.548 26.6259 103.947 26.6135 107.31C26.5765 123.057 26.6012 138.815 26.6012 154.561C26.6012 155.508 26.6012 156.467 26.6012 157.73C17.6188 157.73 8.8094 157.73 0.0123557 157.73C2.83069e-07 122.668 0 87.6305 0 52.5928Z" fill="#FFFFFF"/>
            <path d="M273.845 65.0491C273.845 61.4312 273.845 57.1577 273.845 52.7385C282.728 52.7385 291.365 52.7385 300.199 52.7385C300.199 87.5698 300.199 122.462 300.199 157.524C291.575 157.524 282.889 157.524 273.981 157.524C273.981 153.141 273.981 148.758 273.981 144.23C273.536 144.375 273.252 144.375 273.141 144.521C266.11 153.869 256.139 158.167 244.871 159.49C227.599 161.53 212.562 156.467 200.454 144.023C191.731 135.064 187.308 124.113 186.047 111.851C184.701 98.7998 186.579 86.2829 193.584 75.0165C204.494 57.4734 220.828 49.6184 241.597 50.5775C251.197 51.0267 259.994 53.904 267.605 59.8529C269.817 61.589 271.93 63.4465 273.845 65.0491ZM242.413 74.7372C225.424 74.7494 212.55 87.6791 212.525 104.749C212.5 121.964 225.597 135.428 242.437 135.476C259.723 135.537 273.437 121.952 273.412 104.822C273.375 88.0919 259.599 74.7251 242.413 74.7372Z" fill="#FFFFFF"/>
            <path d="M501.258 65.1098C501.258 61.419 501.258 57.1334 501.258 52.7264C510.142 52.7264 518.778 52.7264 527.6 52.7264C527.6 87.5941 527.6 122.486 527.6 157.536C518.939 157.536 510.253 157.536 501.345 157.536C501.345 153.117 501.345 148.746 501.345 143.926C499.269 146.075 497.651 148.054 495.735 149.681C487.037 157.062 476.622 160.013 465.391 159.94C450.589 159.843 437.801 154.561 427.632 143.841C418.86 134.578 414.437 123.409 413.337 110.868C412.176 97.6222 414.326 85.0081 421.739 73.766C432.723 57.1213 448.711 49.667 468.751 50.5654C478.438 51.0024 487.321 53.8676 494.994 59.8772C497.206 61.6133 499.294 63.4708 501.258 65.1098ZM469.752 74.7372C452.776 74.7615 439.901 87.7034 439.889 104.773C439.877 121.976 452.998 135.44 469.826 135.476C487.124 135.513 500.826 121.928 500.776 104.797C500.739 88.0676 486.963 74.713 469.752 74.7372Z" fill="#FFFFFF"/>
            <path d="M399.276 83.0897C390.912 83.0897 382.609 83.0897 374.331 83.0897C371.637 72.2725 360.283 67.7562 350.856 73.6808C343.949 78.0271 344.11 86.7076 351.51 90.0463C356.119 92.1345 361.234 93.1543 366.164 94.5261C373.763 96.6386 381.534 98.1926 388.416 102.308C403.378 111.256 407.555 130.037 397.436 143.914C392.011 151.344 384.203 155.46 375.393 157.778C361.024 161.566 347.05 160.777 333.953 153.335C323.352 147.301 317.286 138.244 316.335 126.092C316.31 125.788 316.372 125.472 316.396 125.035C324.613 125.035 332.755 125.035 341.107 125.035C341.96 132.247 346.334 136.484 353.364 138.159C359.097 139.519 364.743 139.021 370.068 136.435C374.615 134.226 376.604 130.608 376.159 126.152C375.801 122.595 373.59 120.349 370.488 119.232C366.065 117.642 361.481 116.464 356.922 115.262C349.608 113.332 342.269 111.559 335.485 108.014C318.905 99.346 316.186 81.475 322.117 69.7837C326.305 61.516 333.311 56.1984 342.034 53.309C357.194 48.2949 372.02 49.2055 385.809 57.5824C394.89 63.1064 399.116 71.6291 399.462 82.0457C399.486 82.3613 399.375 82.6648 399.276 83.0897Z" fill="#FFFFFF"/>
            <path d="M577.427 52.8114C577.427 87.7398 577.427 122.571 577.427 157.548C568.643 157.548 559.957 157.548 551.11 157.548C551.11 122.656 551.11 87.8369 551.11 52.8114C559.771 52.8114 568.457 52.8114 577.427 52.8114Z" fill="#FFFFFF"/>
            <path d="M577.429 52.8114H551.125V123.494L577.429 91.649V52.8114Z" fill="#D71920"/>
            <path d="M564.161 29.1616C572.356 29.1616 579 22.6336 579 14.5808C579 6.52805 572.356 0 564.161 0C555.966 0 549.322 6.52805 549.322 14.5808C549.322 22.6336 555.966 29.1616 564.161 29.1616Z" fill="#FFFFFF"/>
          </svg>

            {/* <img className = {classes.img} src = "data:image/png;base64,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" /> */}
            <p className = {classes.p} >refresh</p>            
          </div>
          <div className = {classes.signout} >
            <p onClick = {logout} >Sign out</p>
          </div>
        </div>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </main>
    </div>
  );
}

export { Navbar };
