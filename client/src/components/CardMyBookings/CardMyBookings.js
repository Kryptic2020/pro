import React from 'react';
import classes from './styles.module.css';
import ButtonCustom from '../UI/ButtonCustom/ButtonCustom';

const CardMyBookings = (props) => {
	return (
		<div>
			<div className={classes.card}>
				<div className={classes.box}>
					<div className={classes.date}>
						{props.date}25/02/2021
					</div>
					<div className={classes.day}>
						{props.day}Friday
					</div>
					<div className={classes.time}>
						{props.time}17:00
					</div>
					<div className={classes.price}>
						{props.price}$ 299
					</div>
					<div className={classes.staff}>
						{props.staff}Robert Herber
					</div>
					<div className={classes.service}>
						{props.service}Filling
					</div>
					<div className={classes.button}>
						<ButtonCustom
							text={props.text}
							onClick={props.onClick}
							backgroundColor={
								props.backgroundColor
							}
							color={props.color}
							height={'100%'}
							width={'100%'}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CardMyBookings;
