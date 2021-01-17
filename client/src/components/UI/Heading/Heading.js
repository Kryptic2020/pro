import React from 'react';
import classes from './styles.module.css';

const Heading = (props) => {
	return (
		<div>
			<div
				className={classes.heading}
				style={{ color: props.color }}
			>
				{props.text}
			</div>
		</div>
	);
};

export default Heading;
