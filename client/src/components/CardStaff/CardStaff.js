import React from 'react';

import { Link } from 'react-router-dom';
import classes from './styles.module.css';
import ButtonDelete from '../UI/ButtonDelete/ButtonDelete';
import ButtonCustom from '../UI/ButtonCustom/ButtonCustom';

const CardStaff = (props) => {
	return (
		<div>
			<div className={classes.card}>
				<div
					id={props.id}
					className={classes.staff}
				>
					{props.staff}
				</div>
				<div className={classes.specialty}>
					{props.specialty}
				</div>

				<div
					id={props.id_service}
					className={classes.services_menu}
				>
					<Link
						to={{
							pathname: '/service-settings',
							_id: props._id,
							staff: props.staff,
							specialty: props.specialty,
						}}
					>
						<ButtonCustom
							text={'Service Settings'}
							onClick={
								props.onClick_service_settings
							}
						/>
					</Link>
				</div>

				<div className={classes.button}>
					<ButtonDelete
						onClick={props.onClick_delete}
					/>
				</div>
			</div>
		</div>
	);
};

export default CardStaff;
