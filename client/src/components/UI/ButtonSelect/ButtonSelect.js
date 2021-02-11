import React from 'react';
import classes from './styles.module.css';

const Button_select = (props) => {
	return (
		<div>
			<button
				style={{ display: props.display }}
				className={classes.button}
				onClick={props.onClick}
			>
				{props.buttonName}
			</button>
		</div>
	);
};

export default Button_select;
