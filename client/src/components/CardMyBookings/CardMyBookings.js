import React from 'react';
import classes from './styles.module.css';
import ButtonCustom from '../UI/ButtonCustom/ButtonCustom';

const CardMyBookings = (props) => {
	return (
		<div>
			<div className={classes.card}>
				<div className={classes.box}>
					<div className={classes.date}>
						{props.date}
					</div>
					<div className={classes.day}>
						{props.day}
					</div>
					<div className={classes.time}>
						{props.time}
					</div>
					<div className={classes.price}>
						{props.price
							? '$' + props.price
							: null}
					</div>
					<div className={classes.staff}>
						{props.staff}
					</div>
					<div className={classes.service}>
						{props.service}
					</div>
					<div className={classes.button}>
						<ButtonCustom
							disabled={props.disabled}
							visibility={props.visibility}
							display={props.display}
							text={props.text}
							onClick={props.onClick}
							backgroundColor={
								props.backgroundColor
							}
							color={props.color}
							height={'100%'}
							width={props.width}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CardMyBookings;
