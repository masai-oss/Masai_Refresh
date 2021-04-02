import { makeStyles } from "@material-ui/core/styles";

const TopicStyle = makeStyles((theme) => ({
  root: {
    width: "370px",
    flexGrow: 1,
    background: "#FFFFFF",
    boxShadow: "0px 2px 2px 2px rgba(0, 0, 0, 0.1)",
    borderRadius: "2px",
    margin: "auto",
    "&:hover > button:first-child": {
      background: "#E8EBED",
    },
  },
  cardStyle: {
    // borderBottom: "3px groove #FFFAF0",
    minHeight: 180,
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
  cardBottom: {
    boxShadow: "0px 0px 1px 1px rgba(0, 0, 0, 0.25)",
  },
  dots: {
    display: "flex",
    alignItems: "flex-end",
    flex: 1,
    flexDirection: "column",
    marginRight: "3%",
  },
}));

export { TopicStyle };
