import { makeStyles } from "@material-ui/core/styles";

export const OptionStyles = makeStyles((theme) => ({
  main: {
    width: "100%",
    height: "100%",
    maxHeight: "50px",
    maxWidth: "580px",
    borderRadius: "2px",
    border: "1px solid rgb(159,159,159,1)",
    boxShadow: "0px 0px 1px 1px rgb(0,0,0,0.25)",
    display: "flex",
    alignItems: "center",
    margin: 0,
  },
  label: {},
  radio: {
    color: "rgb(159,159,159,1)",
  },
  dots: {
    float: "right",
    bottom: 0,
    marginTop: "8%",
    marginRight: 6,
  },
}));
