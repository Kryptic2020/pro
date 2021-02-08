import React from 'react';
import classes from './styles.module.css';
import Spinner from 'react-bootstrap/Spinner';

const spinner = () => (
	<div className={classes.backdrop}>
		<div className={classes.spinnerPosition}>
			<Spinner animation='border' variant='success' />
		</div>
	</div>
);

export default spinner;
