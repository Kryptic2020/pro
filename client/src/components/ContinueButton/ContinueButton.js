import React from 'react';
import useStyles from './styles';
import ArrowRight from './../UI/Iconsx/ArrowRight';

const ContinueButton = (props) => {
	const classes = useStyles();
	return (
		<div
			onClick={props.onClick}
			className={classes.button}
		>
			<div className={classes.text}>{props.text}</div>
			<div className={classes.arrow}>
				<ArrowRight width='15px' />
			</div>
		</div>
	);
};

export default ContinueButton;
