import React from 'react';
import classes from './styles.module.css';
import SelectCustom from '../UI/SelectCustom/SelectCustom';
import SelectDate from '../UI/SelectDate/SelectDate';

const FormDateTime = (props) => {
	return (
		<div className={classes.container}>
			<div className={classes.date}>
				<SelectDate
					selected={props.selected_date}
					onChange={(date) =>
						props.onChange_date(date, props)
					}
					minDate={props.minDate}
					includeDates={props.includeDates}
					highlightDates={props.highlightDates}
					display_icon={'none'}
					label={'Select Date'}
				/>
			</div>

			<div className={classes.time}>
				<SelectCustom
					open={props.open}
					onClose={props.onClose}
					onOpen={props.onOpen}
					value={props.value_time}
					onChange={props.onChange_time}
					display_icon={'none'}
					label={'Select Time'}
					options={
						props.selection
							? props.selection
									.sort()
									.map((name) => (
										<option
											key={name}
											value={name}
											//style={getStyles(name, personName, theme)}
										>
											{name}
										</option>
									))
							: null
					}
				/>
			</div>
		</div>
	);
};

export default FormDateTime;
