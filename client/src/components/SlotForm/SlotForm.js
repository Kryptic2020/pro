import React from 'react';
import classes from './styles.module.css';
import SelectCustom from '../UI/SelectCustom/SelectCustom';
import SelectDate from '../UI/SelectDate/SelectDate';
//import { parseWithOptions } from 'date-fns/fp';

const SlotForm = (props) => {
	let specialties = [];
	if (props.staffAssignments) {
		props.staffAssignments.forEach((x) => {
			if (
				!specialties.includes(x.assignedSpecialty)
			) {
				specialties.push(x.assignedSpecialty);
			}
		});
	}
	const optionsSpecialty = specialties.map((s, index) => (
		<option value={s} key={s + index}>
			{s}
		</option>
	));
	let optionsStaff = [];
	if (props.staffAssignments) {
		optionsStaff = props.staffAssignments.map(
			(r, index) =>
				r.assignedSpecialty === props.specialty ? (
					<option
						value={r.staffID}
						key={r.staffID + index}
					>
						{r.staff}
					</option>
				) : null
		);
	}

	return (
		<div className={classes.container}>
			<div className={classes.box}>
				<div className={classes.specialty}>
					<SelectCustom
						id='specialty'
						onChange={props.onChange_specialty}
						options={optionsSpecialty}
						display_icon={'none'}
						label={'Select Specialty'}
					/>
				</div>
				<div className={classes.staff}>
					<SelectCustom
						id='staff'
						onChange={props.onChange_staff}
						options={optionsStaff}
						display_icon={'none'}
						label={'Select Staff'}
					/>
				</div>
				<div className={classes.start}>
					<SelectDate
						minDate={new Date()}
						label={'Select Start Date'}
						selected={props.selected_start}
						onChange={props.onChange_start}
						display_icon={'none'}
						highlightDates={
							props.highlightDates_start
						}
					/>
				</div>
				<div className={classes.end}>
					<SelectDate
						label={'Select End Date'}
						minDate={props.minDate_end}
						selected={props.selected_end}
						onChange={props.onChange_end}
						display_icon={'none'}
						highlightDates={
							props.highlightDates_end
						}
					/>
				</div>
			</div>
		</div>
	);
};

export default SlotForm;
