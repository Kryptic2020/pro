import React from 'react';
import classes from './styles.module.css';
import DeleteButton from '../ContinueButton/ContinueButton';

const CardSlotHistory = (props) => {
	return (
		<div className={classes.container}>
			<div className={classes.subcontainer}>
				<div className={classes.a}>
					Processed By:
				</div>
				<div className={classes.aa}>
					{props.processedBy}
				</div>
				<div className={classes.b}>
					Processed Date:
				</div>
				<div className={classes.bb}>
					{props.processedDate}
				</div>
				<div className={classes.c}>Specialty:</div>
				<div className={classes.cc}>
					{props.specialty}
				</div>
				<div className={classes.d}>Staff:</div>
				<div className={classes.dd}>
					{props.staff}
				</div>
				<div className={classes.e}>Start Date:</div>
				<div className={classes.ee}>
					{props.startDate}
				</div>
				<div className={classes.f}>End Date:</div>
				<div className={classes.ff}>
					{props.endDate}
				</div>
				<div className={classes.g}>
					Excluded Days:
				</div>
				<div className={classes.gg}>
					{props.excludedDays}
				</div>
				<div className={classes.h}>Visible:</div>
				<div className={classes.hh}>
					{props.isVisible}
				</div>
				<div className={classes.i}>Table Name:</div>
				<div className={classes.ii}>
					{props.tableName}
				</div>
				<div className={classes.j}>Type:</div>
				<div className={classes.jj}>
					{props.type}
				</div>
				<div className={classes.l}>Slots:</div>
				<div className={classes.ll}>
					{props.slots.join(', ')}
				</div>

				<div className={classes.delete}>
					<DeleteButton
						onClick={props.onClick}
						text={'Delete'}
						backgroundColor={'red'}
					/>
				</div>
			</div>
		</div>
	);
};

export default CardSlotHistory;
