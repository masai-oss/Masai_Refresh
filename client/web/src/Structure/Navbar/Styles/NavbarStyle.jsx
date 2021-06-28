import { makeStyles } from "@material-ui/core/styles";


const NavbarStyles = makeStyles((theme) => ({

  appBar: {
    backgroundColor: "#0E0C28",
  },

  navbarName: {
    cursor: "pointer"
  },

  navbarGrow: {
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
    marginTop: -7,
    marginBottom: 4
  },

  signout: {
    color: "white",
    marginLeft: "90%",
    cursor: "pointer",
  },
}));

export { NavbarStyles };
