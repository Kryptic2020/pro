import React from 'react';
import classes from './styles.module.css';

const PersonalInfo = (props) => {
	return (
		<div className={classes.container}>
			<div className={classes.subcontainer}>
				<div className={classes.header}>
					Personal Information
				</div>
				<label
					style={{ color: 'yellow' }}
					className='left'
				>
					{props.label}
				</label>
				<div className={classes.input}>
					<input placeholder='First Name' />
				</div>
				<label
					style={{ color: 'yellow' }}
					className='left'
				>
					{props.label}
				</label>
				<div className={classes.input}>
					<input placeholder='Last Name' />
				</div>
				<label
					style={{ color: 'yellow' }}
					className='left'
				>
					{props.label}
				</label>
				<div className={classes.input}>
					<input placeholder='Phone Number' />
				</div>
			</div>
		</div>
	);
};

export default PersonalInfo;
