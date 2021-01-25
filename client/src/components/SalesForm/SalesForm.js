import React from 'react';
import classes from './styles.module.css';

import SelectCustom from '../UI/SelectCustom/SelectCustom';
import SelectDate from '../UI/SelectDate/SelectDate';
import Switch from '../Selector/Selector';

const SalesForm = (props) => {
	return (
		<div className={classes.container}>
			<div className={classes.box}>
				<div className={classes.specialty}>
					<SelectCustom
						display_icon={'none'}
						label={'Select Specialty'}
					/>
				</div>
				<div className={classes.staff}>
					<SelectCustom
						display_icon={'none'}
						label={'Select Staff'}
					/>
				</div>
				<div className={classes.service}>
					<SelectCustom
						display_icon={'none'}
						label={'Select Service'}
					/>
				</div>
				<div className={classes.start}>
					<SelectDate
						label={'Select Start Date'}
						selected={props.selected_start_date}
						onChange={props.onChange_start}
						display_icon={'none'}
					/>
				</div>
				<div className={classes.end}>
					<SelectDate
						label={'Select End Date'}
						minDate={props.minDate_end}
						selected={props.selected_end_date}
						onChange={props.onChange_end}
						display_icon={'none'}
					/>
				</div>
				<div className={classes.switch}>
					<Switch
						onChange={props.onChange}
						on='Forecast'
						off='Actual'
						text='Sales Income'
					/>
				</div>
			</div>
		</div>
	);
};

export default SalesForm;
