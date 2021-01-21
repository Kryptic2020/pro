import React from 'react';
import classes from './styles.module.css';
import ArrowRight from './../UI/Iconsx/ArrowRight';

const ContinueButton = (props) => {
	return (
		<button
			style={{
				backgroundColor: props.backgroundColor,
			}}
			className={classes.button}
			onClick={props.onClick}
			disabled={props.disabled}
		>
			<div className={classes.text}>{props.text}</div>
			<div className={classes.arrow_small}>
				<ArrowRight width='18px' />
			</div>
			<div className={classes.arrow_large}>
				<ArrowRight width='20px' />
			</div>
		</button>
	);
};

export default ContinueButton;
