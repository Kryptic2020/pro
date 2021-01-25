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
					Sales Income - {props.state}
				</div>
				<div className={classes.specialty_icon}>
					<Specialty />
				</div>
				<div className={classes.specialty}>
					{props.specialty}Dentist
				</div>
				<div className={classes.assigned_icon}>
					<Assigned />
				</div>
				<div className={classes.assigned}>
					{props.staff}Amanda Powell
				</div>
				<div className={classes.service_icon}>
					<Service fill='#ffffff' />
				</div>
				<div className={classes.service}>
					{props.service}Fillings
				</div>
				<div className={classes.calendar_icon}>
					<Calendar fill='#ffffff' />
				</div>
				<div className={classes.calendar}>
					{props.startDate} {props.endDate}
					20/12/2021 - 19/01/2022
				</div>
			</div>
			<div className={classes.box2}>
				<div className={classes.register_icon}>
					<Register />
				</div>
				<div className={classes.register}>
					{props.registers} X 23
				</div>
				<div className={classes.price_icon}>
					<Price />
				</div>
				<div className={classes.price}>
					{props.price}1.000.00
				</div>
			</div>
		</div>
	);
};

export default CardSales;
