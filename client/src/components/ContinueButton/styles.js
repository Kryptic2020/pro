import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
	button: {
		display: 'flex',
		justifyContent: 'center',
		textAlign: 'center',
		padding: 'auto',
		witdth: '310px',
		height: '56px',
		backgroundColor: '#29A07B',
	},
	text: {
		textAlign: 'center',
		padding: 'auto',
		fontSize: '16px',
		margin: 'auto 0px',
		color: '#FFFFFF',
	},
	arrow: {
		textAlign: 'center',
		margin: 'auto 0px',
		paddingLeft: '10px',
	},
});

export default useStyles;
