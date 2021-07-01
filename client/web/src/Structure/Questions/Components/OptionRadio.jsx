import React from 'react';
import { Grid, Box, Radio, FormControlLabel, StylesProvider } from '@material-ui/core';
import { OptionStyles } from '../Styles/OptionStyles';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import ReactMarkdown from 'react-markdown';
const theme = createMuiTheme({
	palette: {
		secondary: {
			main: '#1E90FF'
		}
	}
});

const OptionRadio = ({ id, value, handleColor, active, optionMaxLength }) => {
	const classes = OptionStyles();

	return (
		<MuiThemeProvider theme={theme}>
			<div style={{ marginRight: '10px' }}>
				<Box
					m={1}
					p={1}
					borderRadius={2}
					className={active === id ? classes.active : classes.main}
					style={optionMaxLength >= +35 ? { width: '730px' } : { width: '350px' }}
					onClick={() => handleColor(id)}
				>
					<FormControlLabel
						className={classes.label}
						value={id}
						control={<Radio color="secondary" className={classes.radio} />}
						label={value}
					/>
				</Box>
			</div>
		</MuiThemeProvider>
	);
};

export { OptionRadio };
