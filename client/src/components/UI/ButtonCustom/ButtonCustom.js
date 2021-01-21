import React from 'react';
import classes from './styles.module.css';

const Button_custom = (props) => {
	return (
		<div>
			<button
				style={{
					backgroundColor: props.backgroundColor,
					color: props.color,
					width: props.width,
					height: props.height,
				}}
				className={classes.button}
				onClick={props.onClick}
			>
				{props.text}
			</button>
		</div>
	);
};

export default Button_custom;