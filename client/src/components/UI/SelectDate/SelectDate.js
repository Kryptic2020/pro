import React from 'react';
import classes from './styles.module.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-dates/lib/css/_datepicker.css';
import 'react-dates/initialize';

import { enGB } from 'date-fns/esm/locale';

const SelectDate = (props) => {
	/*
	const CustomInput = ({ value, onClick }) => (
		<button className={classes.box} onClick={onClick}>
			<span className={classes.inbox}>{value}</span>
		</button>
	);*/
	return (
		<div>
			<label className={classes.label}>
				{props.label}
			</label>
			<div>
				<DatePicker
					className={classes.inbox}
					selected={props.selected}
					onChange={props.onChange}
					withPortal
					dateFormat='dd/MM/yyyy'
					//customInput={<CustomInput {...props} />}
					//placeholderText="Select Start Date"
					//openToDate={new Date()}
					//locale={fi}
					locale={enGB}
					minDate={props.minDate}
					//maxDate={addDays(new Date(), this.props.auth.daysCalendarView)}
					includeDates={props.includeDates}
					highlightDates={props.highlightDates}
					//excludeDates={[new Date(), subDays(new Date(), 1)]}
				/>
			</div>
		</div>
	);
};

export default SelectDate;
