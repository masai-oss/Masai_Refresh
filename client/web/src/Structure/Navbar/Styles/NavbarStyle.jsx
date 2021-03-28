import { makeStyles } from "@material-ui/core/styles";


const NavbarStyles = makeStyles((theme) => ({

  appBar: {
    backgroundColor: "#6C8D9E",
  },

  navbarName: {
    flexGrow: 1,
  },

  content: {
    padding: theme.spacing(1),
  },

  iconColor: {
    color: "dodgerblue",
  },

  exitColor: {
    color: "red",
  },

  refresh: {
    fontSize: "18px",
    color: "white",
    fontFamily: "Bokor",
    margin: 0,
  },

  signout: {
    color: "white",
    marginLeft: "90%",
    cursor: "pointer",
  },
}));

export { NavbarStyles };
