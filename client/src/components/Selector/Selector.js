import React from 'react';
//import 'materialize-css/dist/css/materialize.min.css';
import classes from './styles.module.css';
//import Form from 'react-bootstrap/Form';

import { withStyles } from '@material-ui/core/styles';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

const IOSSwitch = withStyles((theme) => ({
	root: {
		width: 62,
		height: 26,
		padding: 0,
		margin: theme.spacing(1),
	},
	switchBase: {
		padding: 1,
		'&$checked': {
			transform: 'translateX(36px)',
			color: theme.palette.common.white,
			'& + $track': {
				backgroundColor: '#38F495',
				opacity: 1,
				border: 'none',
			},
		},
		'&$focusVisible $thumb': {
			color: '#38F495',
			border: '6px solid #fff',
		},
	},
	thumb: {
		width: 24,
		height: 24,
		backgroundColor: '#EAE8E8',
	},
	track: {
		borderRadius: 26 / 2,
		border: `1px solid ${theme.palette.grey[400]}`,
		backgroundColor: theme.palette.grey[50],
		opacity: 0.7,
		transition: theme.transitions.create([
			'background-color',
			'border',
		]),
	},
	checked: {},
	focusVisible: {},
}))(({ classes, ...props }) => {
	return (
		<Switch
			focusVisibleClassName={classes.focusVisible}
			disableRipple
			classes={{
				root: classes.root,
				switchBase: classes.switchBase,
				thumb: classes.thumb,
				track: classes.track,
				checked: classes.checked,
			}}
			{...props}
		/>
	);
});

const Selector = (props) => {
	const [state, setState] = React.useState({
		checkedA: true,
		checkedB: true,
		checkedC: true,
	});

	const handleChange = (event) => {
		setState({
			...state,
			[event.target.name]: event.target.checked,
		});
	};

	return (
		<div
			style={{
				backgroundColor: props.backgroundColor,
			}}
			className={classes.container}
		>
			{' '}
			<div className={classes.headings}>
				{props.text}
			</div>
			<div className={classes.switch}>
				<FormControlLabel
					value='bottom'
					control={
						<IOSSwitch
							checked={props.checked}
							onClick={props.onClick}
							onChange={props.onChange}
						/>
					}
					label={props.on}
					labelPlacement='bottom'
				/>
			</div>
		</div>
	);
};

export default Selector;
