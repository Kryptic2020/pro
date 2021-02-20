import React from 'react';
import { Link } from 'react-router-dom';
import classes from './styles.module.css';
import ButtonDelete from '../UI/ButtonDelete/ButtonDelete';
import ButtonBook from '../UI/ButtonBook/ButtonBook';
import ButtonEdit from '../UI/ButtonEdit/ButtonEdit';

const CardWaitingListReport = (props) => {
	const T = props.waitingList.map((w) => (
		<div>
			<div className={classes.card}>
				<div className={classes.box}>
					<div className={classes.name}>
						{w.fullName}
					</div>
					<div className={classes.phone}>
						{'0' + w.phone}
					</div>
					<div className={classes.staff}>
						{w.staff}
					</div>
					<div className={classes.service}>
						{w.service}
					</div>
					<div className={classes.date}>
						{new Date(
							w.date
						).toLocaleDateString('es-ES', {
							year: 'numeric',
							month: 'numeric',
							day: 'numeric',
						})}
					</div>
					<div className={classes.time}>
						{w.time}
					</div>
					{/*<div className={classes.comments}>
						{props.comments} shda dhosa hsdh
						aodh aoidahd hafio hoad shf adshf
						dsafh adshfa dfhuh adsfdu
					</div>*/}
					<div className={classes.buttons}>
						<Link
							style={{ marginLeft: '15px' }}
							to={{
								pathname: '/profile',
								state: { _id: w.userID },
							}}
						>
							<ButtonEdit text={'PROFILE'} />
						</Link>
						<Link
							to={{
								pathname: '/booking-adm',
								_id: w.userID,
								fullName: w.fullName,
							}}
						>
							<ButtonBook />
						</Link>
						<ButtonDelete
							onClick={() =>
								props.onClick_delete(w._id)
							}
						/>
					</div>
				</div>
			</div>
		</div>
	));

	return (
		<div>
			<div>{T}</div>
		</div>
	);
};

export default CardWaitingListReport;
