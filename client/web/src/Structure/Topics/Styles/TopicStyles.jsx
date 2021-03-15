import { makeStyles } from "@material-ui/core/styles";

const TopicStyle = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  cardStyle: {
    boxShadow:
      "0 1px 2px 0 rgba(0, 0, 0, 0.2), 0 1.5px 5px 0 rgba(0, 0, 0, 0.19)",
    borderRadius: 8
  },
  iconStyle: {
    position: "absolute",
    top: "41%",
    left: '52%',
    transform: "translate(-50%, -50%)",
    zIndex: 3,
    width: 80,
    height: 80,
  },
  topicButtonStyle: {
    border: "1px solid #1b5f96",
    borderRadius: 2,
    padding: '0 20px',
    minWidth: '170px',
    boxShadow:
      "0 4px 8px 0 rgba(96, 161, 199, 0.377), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
    backgroundColor: "#2196f3",
    '& h5': {
      fontSize: '1rem',
      letterSpacing: '1px',
    },
    '&:hover': {
      backgroundColor: '#1e89e0'
    }
  },
  topicNameStyle: {
    padding: 8,
    color: "white",
  },
  gridCard:{
    position: "relative"
  }
}));

export { TopicStyle };
