import { makeStyles } from "@material-ui/core/styles";

const modalStyles = makeStyles((theme) => ({
  icon: {
    float: "right",
    marginTop: "-25px",
    color: "#607D8B",
  },
  flex: {
    display: "flex",
    justifyContent: "space-around",
    marginTop: -15,
    width: "788px",
    padding: "12px 12px 12px 16px",
    "& div": {
      height: "40px",
      background: "rgba(108, 141, 158, 0.1)",
      borderRadius: "4px",
      alignItems: "center",
      padding: "9px",
      cursor: "pointer",
      fontFamily: "DM Sans",
      fontSize: "16px",
      letterSpacing: "0.4px",
      color: "#4E565A",
    },
  },
  title: {
    fontFamily: "Open Sans",
    fontStyle: "normal",
    fontSize: "18px",
    fontWeight: "bold",
    color: "#000000",
    margin: "10px",
    marginTop: "14px",
    lineHeight: "150%",
    height: "24px",
    width: "381px",
    letterSpacing: "0.2px",
  },
  textAreaWidth: {
    width: "97%",
    marginLeft: 10,

    height: "133px",
    background: "rgba(108, 141, 158, 0.1)",
    borderRadius: "4px",
  },
  buttonFlex: {
    display: "flex",
    marginLeft: "600px",
    "& button": {
      width: "115px",
      height: "48px",
      boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.16)",
      borderRadius: "8px",
      border: 0,
      fontSize: "18px",
      textAlign: "center",
      margin: "25px 10px",
      fontStyle: "DM Sans",
    },
  },
  submit: {
    background: "#2D799F",
    color: "white",
  },
  details: {
    height: "24px",
    lineHeight: "150%",
    letterSpacing: "0.2px",
    fontWeight: "bold",
    margin: "10px",
    fontSize: "16px",
  },
  hr: {
    height: "1px",
    width: "100%",
    background: "D6D6D6",
  },
}));

export { modalStyles };
