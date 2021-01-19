import React from 'react';
import classes from './styles.module.css';

const Input_custom = (props) => {
	return (
		<div>
			<label
				style={{ display: props.display_icon }}
				className={classes.icon}
			>
				{props.icon}
			</label>
			<label className={classes.label}>
				{props.label}
			</label>
			<div
				style={{ width: props.width }}
				className={classes.input}
			>
				<input
					disableUnderline={true}
					type={props.type}
					onClick={props.onClick}
					onChange={props.onChange}
				/>
			</div>
		</div>
	);
};

export default Input_custom;
