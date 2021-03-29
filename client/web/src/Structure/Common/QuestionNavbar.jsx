import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    main: {
        display: "flex",
        height:'55.87px',
        justifyContent: "space-between",
        borderRadius:'2px',
        alignItems:'center',
        // padding: '0 2rem',
        background: 'rgb(108,141,158,0.2)',
        flexDirection: 'row',
        '& > div' : {
            padding: '5px 20px',
            fontWeight: 'bolder'
        }
    },
    subNav: {
        fontFamily: 'Open Sans',
        fontSize: '16px',
        fontStyle: 'normal',
        fontWeight: 700,
        lineHeight: '24px',
        letterSpacing: '0px',
        textAlign: 'left',
    },
}));

export const QuestionNavbar = ({ topicDisplay, type, q_num, len }) => {
  const classes = useStyles();

  return (
    <div className={classes.main}>
        <div className={classes.topicChip}>{type}</div>
        <div className={classes.topicChip}>{topicDisplay}</div>
        <div className={classes.topicChip}>{`${q_num} / ${len}`}</div>
    </div>
  )
};
