import React from 'react';
import classes from './styles.module.css';
import ButtonDelete from '../UI/ButtonDelete/ButtonDelete';
import ButtonBook from '../UI/ButtonBook/ButtonBook';
import ButtonEdit from '../UI/ButtonEdit/ButtonEdit';

const CardWaitingListReport = (props) => {
	return (
		<div>
			<div className={classes.card}>
				<div className={classes.box}>
					<div className={classes.name}>
						{props.name}Amanda Powell
					</div>
					<div className={classes.phone}>
						{props.phone}0444 333 222
					</div>
					<div className={classes.staff}>
						{props.staff}Robert Half
					</div>
					<div className={classes.service}>
						{props.service}Filling
					</div>
					<div className={classes.date}>
						{props.date}25/12/2021
					</div>
					<div className={classes.time}>
						{props.time}Morning
					</div>
					<div className={classes.comments}>
						{props.comments} shda dhosa hsdh
						aodh aoidahd hafio hoad shf adshf
						dsafh adshfa dfhuh adsfdu
					</div>
					<div className={classes.buttons}>
						<ButtonEdit
							text={'PROFILE'}
							onClick={props.onClick_profile}
						/>

						<ButtonBook
							onClick={props.onClick_book}
						/>
						<ButtonDelete
							onClick={props.onClick_delete}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CardWaitingListReport;
