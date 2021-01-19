import React from 'react';
import classes from './styles.module.css';

const Button_select = (props) => {
	return (
		<div>
			<button
				style={{ width: props.width }}
				className={classes.button}
			>
				DELETE
			</button>
		</div>
	);
};

export default Button_select;
