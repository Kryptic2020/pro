import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
	container: {
		width: '310px',
		margin: '0px auto',
	},

	continueButton: {
		position: 'relative',
		bottom: '0px',
		border: '1px solid grey',
		width: '100%',
	},
	forgotLink: {
		marginTop: '28px',
		marginBottom: '24px',
		textDecoration: 'underline',
		/*'&:hover': {
			textDecoration: 'none',
			
		},*/
	},
	or: {
		fontSize: '16px',
		color: '#000000',
		fontFamily: 'Playfair Display, serif',
		marginBottom: '40px',
		textAlign: 'center',
	},
});

export default useStyles;
