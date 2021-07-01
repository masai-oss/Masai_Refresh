import { makeStyles } from '@material-ui/core/styles';

export const OptionStyles = makeStyles((theme) => ({
	main: {
		// width: '350px',
		minHeight: '56px',
		paddingLeft: '25px',
		paddingTop: 0,
		paddingBottom: 0,

		background: '#FFFFFF',
		border: '2px solid #E5E5E5',
		boxSizing: 'border-box',
		boxShadow: '0px 16px 23px -15px rgba(0, 0, 0, 0.1)',
		borderRadius: '8px',

		display: 'flex',
		alignItem: 'center',
		cursor: 'pointer',
		'@media (max-width: 400px)': {
			maxWidth: '250px'
		}
	},
	active: {
		// width: '350px',
		minHeight: '56px',
		paddingLeft: '25px',
		paddingTop: 0,
		paddingBottom: 0,

		background: '#e6f1ff',
		border: '2px solid #1e90ff',
		boxSizing: 'border-box',
		boxShadow: '0px 12px 12px -10px rgba(30, 144, 255, 0.24)',
		borderRadius: '8px',

		display: 'flex',
		alignItem: 'center',
		'@media (max-width: 400px)': {
			maxWidth: '250px'
		}
	},
	label: {
		fontFamily: 'Open Sans',
		fontStyle: 'normal',
		fontWeight: '600',
		fontSize: '14px',
		lineHeight: '100%'

		/* identical to box height, or 24px */
		// textAlign: 'center'
	},
	radio: {
		width: '24px',
		height: '24px',
		paddingRight: '20px',

		// border: '1px solid #9F9F9F',
		boxSizing: 'border-box'
	}
}));
