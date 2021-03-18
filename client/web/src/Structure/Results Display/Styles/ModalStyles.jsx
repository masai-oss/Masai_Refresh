import { makeStyles } from "@material-ui/core/styles";

const modalStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "1px solid white",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    width: "1200px",
    height: "500px",
  },
  icon: {
    float: "right",
    marginTop: "-25px",
    color: "#607D8B",
  },
  modalClose: {
    float: "right",
  },
  flex: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: -15,
    "& div": {
      border: "1px solid grey",
      borderRadius: "10px",
      padding: "5px 20px",
      cursor: "pointer",
      fontFamily: "sans-serif",
      margin: "4px",
      fontSize: 10,
      textAlign: "center",
      color: "black",
      fontWeight: "bold",
    },
  },
  title: {
    marginBottom: "0px",
    fontWeight: "bold",
  },
  textAreaWidth: {
    width: "90%",
    minWidth: "100%",
    maxWidth: "100%",
    borderRadius: "8px",
  },
  margin: {
    marginTop: "30px",
    fontSize: "18px",
  },
  buttonFlex: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "20px",
  },
  reason: {
    marginTop: 10,
    marginLeft: 5,
  },
}));

export { modalStyles };
