import React from 'react';
import classes from './styles.module.css';
import Pencil from '../UI/Iconsx/Pencil';
import ButtonCustom from '../UI/ButtonCustom/ButtonCustom';
import ButtonDelete from '../UI/ButtonDelete/ButtonDelete';

const CardSlot = (props) => {
	function compareDate(a, b) {
		if (a.date < b.date) {
			return -1;
		}
		if (a.date > b.date) {
			return 1;
		}
		return 0;
	}
	function compareTime(a, b) {
		if (a.time < b.time) {
			return -1;
		}
		if (a.time > b.time) {
			return 1;
		}
		return 0;
	}
	const u = props.data.sort(compareTime);
	const s = u.sort(compareDate);
	const T = s.map((d, index) => (
		<div
			key={d._id + index}
			style={{
				backgroundColor:
					!d.isBooked && d.openView
						? '#ffffff'
						: null ||
						  (!d.isBooked && !d.openView)
						? '#504F4B'
						: null || d.isBooked
						? '#24CD98'
						: null,
				color:
					!d.isBooked && d.openView
						? '#504F4B'
						: null || d.isBooked
						? '#ffffff'
						: null ||
						  (!d.isBooked && !d.openView)
						? '#ffffff'
						: null,
			}}
			className={classes.container}
		>
			<div className={classes.box1}>
				<div className={classes.day}>
					{new Date(d.date).toLocaleDateString(
						'en-AU',
						{
							weekday: 'long',
						}
					)}
				</div>
				<div className={classes.date}>
					{new Date(d.date).toLocaleDateString(
						'en-GB',
						{
							year: 'numeric',
							month: 'numeric',
							day: 'numeric',
						}
					)}
				</div>
				<div className={classes.time}>{d.time}</div>
				<div className={classes.price}>
					{d.price ? '$' + d.price : null}
				</div>
				<div className={classes.status}>
					{!d.isBooked && d.openView
						? 'Available'
						: null}
					{!d.isBooked && !d.openView
						? 'Unavailable'
						: null}
					{d.isBooked
						? d.paymentMethod +
						  (d.isPaid ? '-Paid' : '')
						: null}
				</div>
			</div>
			<div className={classes.box2}>
				<div className={classes.service}>
					{d.service}
				</div>
				<div className={classes.name}>
					{d.bookedByName}
				</div>
				<div className={classes.phone}>
					{d.contactNumber
						? '0' + d.contactNumber
						: null}
				</div>
			</div>{' '}
			<div className={classes.box3}>
				<div
					onClick={() =>
						props.onClick_pencil(
							d._id,
							d.comments
						)
					}
					className={classes.icon}
				>
					<Pencil
						fill={
							!d.openView || d.isBooked
								? '#ffffff'
								: null
						}
					/>
				</div>
				<div className={classes.comments}>
					{d.comments}
				</div>

				{d.isBooked ? (
					<ButtonDelete
						text='CANCEL'
						onClick={() =>
							props.onClick_cancel(
								d._id,
								d.specialty,
								d.date,
								d.time,
								d.service,
								d.price,
								d.bookedByName
							)
						}
					/>
				) : (
					<ButtonCustom
						//	width={'60px'}
						text={'SWAP'}
						onClick={() =>
							props.onClick_swap(
								d._id,
								d.openView
							)
						}
						style={{
							backgroundColor:
								props.backgroundColor_button,
						}}
						className={classes.button}
					>
						SWAP
					</ButtonCustom>
				)}
			</div>
		</div>
	));

	return (
		<div>
			<div>{[T]}</div>
		</div>
	);
};

export default CardSlot;
