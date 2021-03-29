import React from "react";
import { Grid, Box, Radio, FormControlLabel } from "@material-ui/core";
import { OptionStyles } from '../Styles/OptionStyles'

const OptionRadio = ({ id, value }) => {
  const classes = OptionStyles();
  return (
    <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
      <Box
        // boxShadow={2}
        // bgcolor="red"
        m={1}
        p={1}
        borderRadius={2}
        className={classes.main}
      >
        <FormControlLabel className={classes.label} value={id} control={<Radio className={classes.radio} />} label={value} />
      </Box>
    </Grid>
  );
};

export { OptionRadio };
