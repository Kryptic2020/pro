import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
	appHeader: {
		height: '50px',
		width: '100%',
		backgroundImage:
			'linear-gradient(to right,#38F495, #15BFE7, #11B9F0)',

		marginTop: '0px',
		position: 'relative',
	},
	span: {
		fontSize: '24px',
		color: '#FFFFFF',
		paddingLeft: '27px',
		textShadow: '0px 1px 1px #0000002F',
		fontFamily: 'Playfair Display, serif',
		/*fontFamily: 'Roboto, sans-serif',*/
	},
	container: {
		display: 'flex',
		alignItems: 'center',
		height: '100%',

		width: '310px',
		margin: '0px auto',
	},
	companyIcon: {
		paddingLeft: '37px',
	},
});

export default useStyles;
