import React from 'react';
import classes from './styles.module.css';

const Heading = (props) => {
	return (
		<div>
			<div
				className={[
					classes.heading,
					props.white
						? classes.headingWhite
						: null,
				].join(' ')}
			>
				{props.text}
			</div>
		</div>
	);
};

export default Heading;
