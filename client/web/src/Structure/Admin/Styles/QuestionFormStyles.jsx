import { makeStyles, createStyles } from '@material-ui/core/styles';

const QuestionFormStyles = makeStyles((theme) =>
	createStyles({
		root: {
			width: '100%',
			height: '100%',
			display: 'flex',
			justifyContent: 'center',
			paddingTop: '100px',
			position: 'absolute',
			top: '50%',
			left: '50%',
			transform: 'translate(-50%, -50%)'
		},

		formControl: {
			margin: theme.spacing(2),
			minWidth: 180
		},
		textAreaWidth: {
			minWidth: '90%',
			maxWidth: '90%',
			borderRadius: '8px'
		},
		horizontalStyle: {
			display: 'flex',
			flexDirection: 'row'
		},
		verticalStyle: {
			display: 'flex',
			flexDirection: 'column'
		},
		buttons: {
			border: 'none',
			borderRadius: '2px',
			padding: '10px 14px',
			color: 'white',
			marginTop: '8px',
			fontSize: '16px',
			cursor: 'pointer'
		},
		save: {
			background: '#2196f3'
		},
		cancel: {
			background: '#ff6b81'
		},
		optionsAlign: {
			display: 'flex',
			flexDirection: 'column'
		}
	})
);

export { QuestionFormStyles };
