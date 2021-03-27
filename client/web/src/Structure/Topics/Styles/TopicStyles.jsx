import { makeStyles } from "@material-ui/core/styles";

const TopicStyle = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  cardStyle: {
    boxShadow:
      "0 1px 2px 0 rgba(0, 0, 0, 0.2), 0 1.5px 5px 0 rgba(0, 0, 0, 0.19)",
    borderRadius: 3,
  },
  iconStyle: {
    transform: "translate(-50%, -50%)",
    width: 70,
    height: 70,
    marginTop: 20
  },
  topicButtonStyle: {
    border: "1px solid #1b5f96",
    borderRadius: 2,
    padding: "0 20px",
    minWidth: "160px",
    boxShadow:
      "0 4px 8px 0 rgba(96, 161, 199, 0.377), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
    backgroundColor: "#2196f3",
    "& h5": {
      fontSize: "1rem",
      letterSpacing: "1px",
    },
    "&:hover": {
      backgroundColor: "#1e89e0",
    },
  },
  
  gridCard: {
    position: "relative",
  },
  upperCard: {
    height: "100px",
    display: "flex",
    marginLeft: "-40%"
  },
  bottomCard: {
    display: "flex",
  },
  correct: {
    color: "#27b43c",
    margin: "0% 15%"
  },
  wrong: {
    color: "#db1113",
    margin: "0% 15%"
  },
  skipped: {
    color: "#efac00",
    margin: "0% 15%"
  }
}));

export { TopicStyle };
