import React from 'react';
import classes from './styles.module.css';

const Button_select = (props) => {
	return (
		<div>
			<button
				style={{
					backgroundColor: props.backgroundColor,
					color: props.color,
					width: props.width,
					height: props.height,
					maxHeight: props.maxHeight,
					maxWidth: props.maxWidth,
					minWidth: props.minWidth,
					visibility: props.visibility,
					display: props.display,
				}}
				className={classes.button}
			>
				{props.text}
			</button>
		</div>
	);
};

export default Button_select;
