import React from 'react';
import classes from './styles.module.css';
import ButtonDelete from '../UI/ButtonDelete/ButtonDelete';
import ButtonCustom from '../UI/ButtonCustom/ButtonCustom';

const CardStaff = (props) => {
	return (
		<div>
			<div className={classes.card}>
				<div className={classes.staff}>
					{props.staff}
				</div>
				<div className={classes.specialty}>
					{props.specialty}
				</div>

				<div className={classes.services_menu}>
					<a href='service-settings'>
						<ButtonCustom
							text={'Service Settings'}
							onClick={
								props.onClick_service_settings
							}
						/>{' '}
					</a>
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
