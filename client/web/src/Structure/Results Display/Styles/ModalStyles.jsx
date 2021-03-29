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
    "& div": {},
  },
  title: {
    fontStyle: "Open Sans",
    fontWeight: "700px",
    fontSize: "16px",
    fontWeight: "bold",
    color: "#000000",
    margin: "10px",
    lineHeight: "150%",
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
