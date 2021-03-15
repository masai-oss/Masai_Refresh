import React from "react";
import { Grid, Box, Radio, FormControlLabel } from "@material-ui/core";

const OptionRadio = ({ id, value }) => {
  return (
    <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
      <Box
        boxShadow={2}
        bgcolor="background.paper"
        m={1}
        p={1}
        borderRadius={12}
      >
        <FormControlLabel value={id} control={<Radio />} label={value} />
      </Box>
    </Grid>
  );
};

export { OptionRadio };
