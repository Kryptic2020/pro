import React from 'react';
import classes from './styles.module.css';

const Button_select = (props) => {
	return (
		<div>
			<button className={classes.button}>
				{props.text}
			</button>
		</div>
	);
};

export default Button_select;
