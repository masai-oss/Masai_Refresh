import { makeStyles } from '@material-ui/core/styles';

export const OptionStyles = makeStyles((theme) => ({
	main: {
		width: '350px',
		height: '56px',
		padding: '25px',

		background: '#FFFFFF',
		border: '2px solid #E5E5E5',
		boxSizing: 'border-box',
		boxShadow: '0px 16px 23px -15px rgba(0, 0, 0, 0.1)',
		borderRadius: '8px',

		display: 'flex',
		alignItem: 'center'
	},
	label: {
		fontFamily: ' Open Sans',
		fontStyle: 'normal',
		fontWeight: '600',
		fontSize: '14px',
		lineHeight: '170%'

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
