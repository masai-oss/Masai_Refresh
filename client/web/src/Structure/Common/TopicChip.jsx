import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Badge from '@material-ui/core/Badge';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(3),
    },
  },
}));

const TopicChip=({topicDisplay})=> {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Badge badgeContent={topicDisplay} color="primary">
      </Badge>
      
    </div>
  );
}

export {TopicChip}