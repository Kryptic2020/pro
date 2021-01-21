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
					Specialty
					{props.processedBy}
				</div>
				<div className={classes.b}>
					Processed Date:
				</div>
				<div className={classes.bb}>
					Specialty
					{props.processedDate}
				</div>
				<div className={classes.c}>Specialty:</div>
				<div className={classes.cc}>
					Specialty
					{props.specialty}
				</div>
				<div className={classes.d}>Staff:</div>
				<div className={classes.dd}>
					Specialty
					{props.staff}
				</div>
				<div className={classes.e}>Start Date:</div>
				<div className={classes.ee}>
					Specialty
					{props.startDate}
				</div>
				<div className={classes.f}>End Date:</div>
				<div className={classes.ff}>
					Specialty
					{props.endDate}
				</div>
				<div className={classes.g}>
					Excluded Days:
				</div>
				<div className={classes.gg}>
					Specialty
					{props.excludedDays}
				</div>
				<div className={classes.h}>Visible:</div>
				<div className={classes.hh}>
					Specialty
					{props.visible}
				</div>
				<div className={classes.i}>Table Name:</div>
				<div className={classes.ii}>
					Specialty
					{props.tableName}
				</div>
				<div className={classes.j}>
					Table Slots:
				</div>
				<div className={classes.jj}>
					Specialty
					{props.slots}
				</div>
				<div className={classes.delete}>
					<DeleteButton
						text={'Delete'}
						backgroundColor={'red'}
					/>
				</div>
			</div>
		</div>
	);
};

export default CardSlotHistory;
