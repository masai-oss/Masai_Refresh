import { makeStyles } from "@material-ui/core/styles";

const TopicStyle = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    boxShadow:
      "0 0.1px 3.2px -4px rgba(0, 0, 0, 0.031), 0 0.3px 6px -4px rgba(0, 0, 0, 0.044), 0 0.6px 8.4px -4px rgba(0, 0, 0, 0.055), 0 1.1px 10.6px -4px rgba(0, 0, 0, 0.066), 0 2.1px 13.3px -4px rgba(0, 0, 0, 0.079), 0 5px 25px -4px rgba(0, 0, 0, 0.11)",
    "&:hover": {
      boxShadow:
        "0 0.2px 10.6px -4px rgba(0, 0, 0, 0.038), 0 0.6px 19.2px -4px rgba(0, 0, 0, 0.055), 0 1.5px 26.7px -4px rgba(0, 0, 0, 0.072), 0 5px 57px -4px rgba(0, 0, 0, 0.11)",
    },
  },
  cardStyle: {
    // borderBottom: "3px groove #FFFAF0",
    minHeight: 180,
  },
  iconStyle: {
    width: 60,
    height: 60,
    margin: 10,
  },
  lasStyle: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: 35,
  },
  gridCard: {
    position: "relative",
  },
  upperCard: {
    height: "100px",
    display: "flex",
    marginLeft: "-40%",
  },
  cardActions: {
    display: "flex",
    justifyContent: "space-between",
  },
  bottomCard: {
    display: "flex",
  },
  correct: {
    color: "#27b43c",
    fontWeight: "bold",
  },
  wrong: {
    color: "#db1113",
    fontWeight: "bold",
  },
  skipped: {
    color: "#efac00",
    fontWeight: "bold",
  },
  lastAttempt: {
    color: "#6C8D9E",
    fontWeight: "bold",
  },
}));

export { TopicStyle };
