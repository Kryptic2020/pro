import React from 'react';
import classes from './styles.module.css';

import SelectCustom from '../UI/SelectCustom/SelectCustom';
import SelectDate from '../UI/SelectDate/SelectDate';

const SlotForm = (props) => {
	return (
		<div className={classes.container}>
			<div className={classes.box}>
				<div className={classes.specialty}>
					<SelectCustom
						id='specialty'
						onChange={props.onChange_specialty}
						options={props.optionsSpecialty}
						display_icon={'none'}
						label={'Select Specialty'}
					/>
				</div>
				<div className={classes.staff}>
					<SelectCustom
						id='staff'
						onChange={props.onChange_staff}
						options={props.optionsStaff}
						display_icon={'none'}
						label={'Select Staff'}
					/>
				</div>
				<div className={classes.start}>
					<SelectDate
						minDate={props.minDate_start}
						label={'Select Start Date'}
						selected={props.selected_start}
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
			</div>
		</div>
	);
};

export default SlotForm;
