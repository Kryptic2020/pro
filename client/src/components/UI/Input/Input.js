import React from 'react';
import classes from './styles.module.css';

const input = (props) => {
	return (
		<div className={classes.container}>
			<div className={classes.box}>
				<label className={classes.label}>
					{props.label}
				</label>
				<label className={classes.msn}>
					{props.msg}
				</label>{' '}
			</div>
			<div className={classes.input}>
				<input
					autocomplete='on'
					type={props.type}
					onClick={props.onClick}
					onChange={props.onChange}
				/>
			</div>
		</div>
	);
};

export default input;
