import { makeStyles } from "@material-ui/core/styles";

const TopicStyle = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  cardStyle: {
    boxShadow:
      "0 1px 2px 0 rgba(0, 0, 0, 0.2), 0 1.5px 5px 0 rgba(0, 0, 0, 0.19)",
    borderRadius: 8,
  },
  iconStyle: {
    position: "relative",
    bottom: 145,
    left: 5,
    zIndex: 3,
    width: 100,
    height: 100,
  },
  topicButtonStyle: {
    border: "1px solid black",
    borderRadius: 8,
    boxShadow:
      "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
    backgroundColor: "#2196f3",
  },
  topicNameStyle: {
    padding: 8,
    color: "white",
  },
}));

export { TopicStyle };
