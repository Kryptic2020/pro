import React from 'react';
import { Link } from 'react-router-dom';
import classes from './styles.module.css';
import ButtonDelete from '../UI/ButtonDelete/ButtonDelete';
import ButtonBook from '../UI/ButtonBook/ButtonBook';
import ButtonEdit from '../UI/ButtonEdit/ButtonEdit';
//import User from '../UI/Iconsx/User';

const CardMyBookings = (props) => {
	return (
		<div>
			<div className={classes.card}>
				<div className={classes.box}>
					<div className={classes.icon_box}>
						<img
							className={classes.icon}
							src={props.photo}
							alt='User'
						/>

						<div className={classes.active}>
							{props.active}
						</div>
					</div>
					<div className={classes.user}>
						<div className={classes.name}>
							{props.name}
						</div>
						<div className={classes.email}>
							{props.email}
						</div>
						<div className={classes.phone}>
							{props.phone}
						</div>
					</div>

					<div className={classes.info}>
						<div className={classes.provider}>
							{props.provider}
						</div>
						<div className={classes.verified}>
							{props.verified}
						</div>
						<div className={classes.admin}>
							{props.admin}
						</div>
					</div>

					<div className={classes.buttons}>
						<Link
							to={{
								pathname: '/profile',
								state: { _id: props._id },
							}}
						>
							<ButtonEdit
								text={'EDIT'}
								minWidth={'70px'}
							/>
						</Link>
						<Link
							to={{
								pathname: '/booking-adm',
								_id: props._id,
								fullName: props.fullName,
							}}
						>
							<ButtonBook minWidth={'70px'} />
						</Link>
						<ButtonDelete
							minWidth={'70px'}
							onClick={props.onClick}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CardMyBookings;
