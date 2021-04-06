import { makeStyles } from "@material-ui/core/styles";

const TopicStyle = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    background: "#FFFFFF",
    boxShadow: "0px 2px 2px 2px rgba(0, 0, 0, 0.25)",
    borderRadius: "2px",
    margin: "auto",
    "&:hover > button:first-child": {
      background: "#E8EBED",
    },
  },
  cardStyle: {
    minHeight: 180,
  },
  lasStyle: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: 35,
  },
  firstQuiz: {
    fontSize: "20px",
    marginTop: "15%",
    display: "grid",
    placeItems: "center",
    fontFamily: "Open Sans",
    color: "#333434",
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
  cardBottom: {
    boxShadow: "0px 0px 1px 1px rgba(0, 0, 0, 0.25)",
  }
}));

export { TopicStyle };
