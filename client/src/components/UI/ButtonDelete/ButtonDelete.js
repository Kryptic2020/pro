import React from 'react';
import classes from './styles.module.css';

const ButtonDelete = (props) => {
	return (
		<div>
			<button
				onClick={props.onClick}
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
				{props.text ? props.text : 'DELETE'}
			</button>
		</div>
	);
};

export default ButtonDelete;
