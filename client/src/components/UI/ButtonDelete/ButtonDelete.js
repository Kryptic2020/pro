import React from 'react';
import classes from './styles.module.css';

const ButtonDelete = (props) => {
	return (
		<div>
			<button
				onClick={props.onClick}
				style={{ width: props.width }}
				className={classes.button}
			>
				DELETE
			</button>
		</div>
	);
};

export default ButtonDelete;
