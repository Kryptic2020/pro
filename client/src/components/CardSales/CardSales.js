import React from 'react';
import classes from './styles.module.css';
import Specialty from '../UI/Iconsx/Specialty';
import Assigned from '../UI/Iconsx/Assigned';
import Service from '../UI/Iconsx/Service';
import Calendar from '../UI/Iconsx/Calendar';
import Price from '../UI/Iconsx/Price';
import Register from '../UI/Iconsx/Register';

const CardSales = (props) => {
	return (
		<div className={classes.container}>
			<div className={classes.box1}>
				<div className={classes.headers}>
					Sales Income
				</div>
				<div className={classes.specialty_icon}>
					<Specialty />
				</div>
				<div className={classes.specialty}>
					{props.specialty}
				</div>
				<div className={classes.assigned_icon}>
					<Assigned />
				</div>
				<div className={classes.assigned}>
					{props.staff}
				</div>
				<div className={classes.service_icon}>
					<Service fill='#ffffff' />
				</div>
				<div className={classes.service}>
					{props.service}
				</div>
				<div className={classes.calendar_icon}>
					<Calendar fill='#ffffff' />
				</div>
				<div className={classes.calendar}>
					{props.startDate}
					{' - '}
					{props.endDate}
				</div>
			</div>
			<div className={classes.box2}>
				<div className={classes.register_icon}>
					<Register />
				</div>
				<div className={classes.register}>
					{props.registers}
				</div>
				<div className={classes.price_icon}>
					<Price />
				</div>
				<div className={classes.price}>
					{props.total}
				</div>
			</div>
		</div>
	);
};

export default CardSales;
