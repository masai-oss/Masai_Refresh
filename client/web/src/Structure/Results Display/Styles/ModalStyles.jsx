import { makeStyles } from "@material-ui/core/styles";

const modalStyles = makeStyles((theme) => ({
  flex: {
    display: "flex",
    justifyContent: "space-around",
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
    margin: "19px",
    marginTop: "14px",
    lineHeight: "150%",
    height: "24px",
    width: "381px",
    letterSpacing: "0.2px",
    marginLeft: "21px",
  },
  textAreaWidth: {
    width: "97%",
    marginLeft: 13,

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
    color: "white",
  },
  details: {
    height: "24px",
    lineHeight: "150%",
    letterSpacing: "0.2px",
    fontWeight: "bold",
    fontSize: "15px",
  },
  hr: {
    height: "1px",
    width: "100%",
    background: "D6D6D6",
  },
  report: {
    color: "#6C8D9E",
    fontFamily: "Open Sans",
    fontSize: "18px",
    margin: "5px 0px 15px 18px",
    lineHeight: "24px",
    textDecorationLine: "underline",
    paddingBottom: "20px",
    cursor: "pointer",
  },
}));

export { modalStyles };
