import React from 'react';
import { Grid, Box, Radio, FormControlLabel, StylesProvider } from '@material-ui/core';
import { OptionStyles } from '../Styles/OptionStyles';

const OptionRadio = ({ id, value, handleColor }) => {
	const classes = OptionStyles();

	return (
		<div style={{ marginRight: '10px' }}>
			<Box m={1} p={1} borderRadius={2} className={classes.main} onClick={handleColor}>
				<FormControlLabel
					className={classes.label}
					value={id}
					control={<Radio color="primary" className={classes.radio} />}
					label={value}
				/>
			</Box>
		</div>
	);
};

export { OptionRadio };
