import React from 'react';
import Assigned from '../UI/Iconsx/Assigned';
import Service from '../UI/Iconsx/Service';
import Specialty from '../UI/Iconsx/Specialty';
import Booking from '../UI/Iconsx/Booking';
import classes from './styles.module.css';

const BookingBar = (props) => {
	return (
		<>
			<div className={classes.container}>
				<div className={classes.assigned_icon}>
					<Assigned />
				</div>
				<div className={classes.service_icon}>
					<Service fill='#ffffff' />
				</div>
				<div className={classes.specialty_icon}>
					<Specialty />
				</div>
				<div className={classes.booking_icon}>
					<Booking fill='#ffffff' />
				</div>
				<div className={classes.specialty}>
					{props.specialty}Dentist
				</div>
				<div className={classes.assigned}>
					{props.assigned}Amanda Powell
				</div>
				<div className={classes.service}>
					{props.service}Filling
				</div>
				<div className={classes.booking}>
					{props.booking}25/02/2021 17:00
				</div>
			</div>
		</>
	);
};

export default BookingBar;
