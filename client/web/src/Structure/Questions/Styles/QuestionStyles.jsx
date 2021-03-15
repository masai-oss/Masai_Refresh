import { makeStyles } from "@material-ui/core/styles";

const QuestionStyles = makeStyles((theme) => ({
  main: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "20px",
    padding: '0 2rem',
    flexDirection: 'row-reverse',
    '& > div' : {
      padding: '5px 20px',
      fontWeight: 'bolder'
    }
  },
  nextBtn: {
    margin: "15px",
    marginTop: "20px",
  },
  cardShadow: {
    boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
  }
}));

export { QuestionStyles };
