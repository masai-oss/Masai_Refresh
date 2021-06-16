import React from 'react';
import { render } from 'react-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Root from './Root';
import { OptionRadio } from './OptionRadio';

// use default theme
// const theme = createMuiTheme();

// Or Create your Own theme:
const theme = createMuiTheme({
	palette: {
		secondary: {
			main: '#1E90FF'
		}
	}
});

function App () {
	return (
		<MuiThemeProvider theme={theme}>
			<OptionRadio />
		</MuiThemeProvider>
	);
}

render(<App />, document.querySelector('#app'));
