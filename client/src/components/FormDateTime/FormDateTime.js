import React from 'react';
import classes from './styles.module.css';
import SelectCustom from '../UI/SelectCustom/SelectCustom';
import SelectDate from '../UI/SelectDate/SelectDate';

const FormDateTime = (props) => {
	return (
		<div className={classes.container}>
			<div className={classes.date}>
				<SelectDate
					display_icon={'none'}
					label={'Select Date'}
				/>
			</div>

			<div className={classes.time}>
				<SelectCustom
					display_icon={'none'}
					label={'Select Time'}
				/>
			</div>
		</div>
	);
};

export default FormDateTime;
