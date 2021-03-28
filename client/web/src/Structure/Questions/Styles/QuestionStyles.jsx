import { makeStyles } from "@material-ui/core/styles";

const QuestionStyles = makeStyles((theme) => ({
  main: {
    boxSizing:'border-box',
    height:'100%',
    width:'100%',
    backgroundColor:'white',
    padding: '31px'
    
  },
  nextBtn: {
    margin: "15px",
    marginTop: "20px",
  },
  cardShadow: {
    boxShadow: '0px 0px 1px 1px rgb(0,0,0,0.25)',
    // border:'1px solid black'
  }
}));

export { QuestionStyles };
