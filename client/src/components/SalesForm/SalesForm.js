import React from 'react';
import classes from './styles.module.css';

import SelectCustom from '../UI/SelectCustom/SelectCustom';
import SelectDate from '../UI/SelectDate/SelectDate';
import Switch from '../Selector/Selector';

const SalesForm = (props) => {
	const optionsSpecialty = props.specialties.map(
		(a, index) => (
			<option key={(a._id, index)} value={a.name}>
				{a.name}
			</option>
		)
	);
	const unique = [
		...new Map(
			props.staffAssignments.map((item) => [
				item.staffID,
				item,
			])
		).values(),
	];
	const optionsStaff = unique.map((b, index) => (
		<option
			key={(b._id, index)}
			value={[b.staffID, b.staff]}
		>
			{b.staff}
		</option>
	));
	const optionsService = props.servicesPrices.map(
		(c, index) => (
			<option key={(c._id, index)} value={c.name}>
				{c.name}
			</option>
		)
	);
	return (
		<div className={classes.container}>
			<div className={classes.box}>
				<div className={classes.specialty}>
					<SelectCustom
						onChange={props.onChange_specialty}
						options={optionsSpecialty}
						display_icon={'none'}
						label={'Select Specialty'}
					/>
				</div>
				<div className={classes.staff}>
					<SelectCustom
						onChange={props.onChange_staff}
						options={optionsStaff}
						display_icon={'none'}
						label={'Select Staff'}
					/>
				</div>
				<div className={classes.service}>
					<SelectCustom
						onChange={props.onChange_service}
						options={optionsService}
						display_icon={'none'}
						label={'Select Service'}
					/>
				</div>
				<div className={classes.start}>
					<SelectDate
						label={'Select Start Date'}
						selected={props.selected_start}
						onChange={props.onChange_startDate}
						display_icon={'none'}
					/>
				</div>
				<div className={classes.end}>
					<SelectDate
						label={'Select End Date'}
						minDate={props.minDate_end}
						selected={props.selected_end}
						onChange={props.onChange_endDate}
						display_icon={'none'}
					/>
				</div>
				<div className={classes.switch}>
					<Switch
						borderRadius={'10px'}
						checked={props.checked}
						onClick={props.onClick_switch}
						on={props.on}
						off='Actual'
						text='Sales Income'
					/>
				</div>
			</div>
		</div>
	);
};

export default SalesForm;
