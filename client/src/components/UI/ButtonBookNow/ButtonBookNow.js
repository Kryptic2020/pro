import React from 'react';
import classes from './styles.module.css';

const ButtonBookNow = (props) => {
	return (
		<div>
			<button
				style={{
					width: props.width,
					height: props.height,
					fontSize: props.fontSize,
				}}
				className={classes.button}
				onClick={props.onClick}
			>
				{props.text}
			</button>
		</div>
	);
};

export default ButtonBookNow;
