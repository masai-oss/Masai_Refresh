import { makeStyles } from "@material-ui/core/styles";

const QuestionStyles = makeStyles((theme) => ({
  main: {
    display: "flex",
    justifyContent: "space-around",
    marginTop: "20px",
  },
  nextBtn: {
    margin: "15px",
    marginTop: "20px",
  },
  cardShadow: {
    boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
  },
}));

export { QuestionStyles };
