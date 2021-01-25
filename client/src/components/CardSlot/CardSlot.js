import React from 'react';
import classes from './styles.module.css';
import Pencil from '../UI/Iconsx/Pencil';
import Button_custom from '../UI/ButtonCustom/ButtonCustom';

const CardSlot = (props) => {
	return (
		<div
			style={{
				backgroundColor: props.backgroundColor,
				color: props.color,
			}}
			className={classes.container}
		>
			<div className={classes.box1}>
				<div className={classes.day}>
					{props.day}Tuesday
				</div>
				<div className={classes.date}>
					{props.date}25/02/2021
				</div>
				<div className={classes.time}>
					{props.time}17:00
				</div>
				<div className={classes.price}>
					{props.price}$299
				</div>
				<div className={classes.status}>
					{props.status}Booked
				</div>
			</div>
			<div className={classes.box2}>
				<div className={classes.service}>
					{props.service}Filling
				</div>
				<div className={classes.name}>
					{props.name}Amanda Powell
				</div>
				<div className={classes.phone}>
					{props.phone}0444 444 444
				</div>
			</div>{' '}
			<div className={classes.box3}>
				<div className={classes.icon}>
					<Pencil fill={props.fill} />
				</div>
				<div className={classes.comments}>
					{props.comments}max 50 caracteres.
					jdiasd aijsdsai jsaij asdijsa i.
				</div>

				<button
					style={{
						backgroundColor:
							props.backgroundColor_button,
					}}
					className={classes.button}
				>
					{props.button_text}SWAP
				</button>
			</div>
		</div>
	);
};

export default CardSlot;
