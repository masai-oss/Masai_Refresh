import { makeStyles } from "@material-ui/core/styles";

const QuestionStyles = makeStyles((theme) => ({
  main: {
    boxSizing:'border-box',
    height:'100%',
    width:'100%',
    backgroundColor:'white',
    padding: '31px',
    
    '& button':{
      cursor: 'pointer',    
      border: 'none',
      padding: '16px',
    }
    
  },
  nextBtn: {
    height: '48px',
    width: '73px',
    background: '#E8EBED',
    boxShadow: '0px 6px 12px 0px rgb(0,0,0,0.16)',
    borderRadius: '2px',
    padding: '16px',
    fontWeight: 'bold'
  },
  btns: {
    display: 'flex',
    justifyContent:'space-between',
    padding: '0 24px',
    alignItems:'center'
  },
  prevBtn: {
    display: 'flex',
    justifyContent:'space-between',
    alignItems:'center',
    cursor: 'pointer',    
    
    '& p':{
      padding: '16px',
      fontFamily: 'Open Sans',
      fontStyle: 'normal',
      fontWeight: '400',
      fontSize: '16px',
      lineHeight: '150%',
      color: '#333434',
      
    }
  },
  skipBtn: {
    backgroundColor:'inherit',
  }

}));

export { QuestionStyles };
