import { makeStyles } from "@material-ui/core/styles";

const drawerWidth = 240;

const NavbarStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },

  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },

    marginTop: 15,
  },

  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - $ {drawerWidth}px)`,
      marginLeft: drawerWidth,
    },

    backgroundColor: "#2196f3",
  },

  navbarName: {
    [theme.breakpoints.up("sm")]: {
      marginLeft: drawerWidth,
    },
  },

  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },

  toolbar: {
    ...theme.mixins.toolbar,
    padding: theme.spacing(2),
    fontSize: 25,
  },

  drawerPaper: {
    width: drawerWidth,
  },

  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  iconColor: {
    color: "dodgerblue",
  },
  exitColor: {
    color:"red"
  }
}));

export { NavbarStyles };
