import React from 'react';
import classes from './styles.module.css';
import CardSettings from '../../../components/CardSettings/CardSettings';
import CardCustom from '../../../components/CardCustom/CardCustom';
import Heading from '../../../components/UI/Heading/Heading';
import Calendar from '../../../components/UI/Iconsx/Calendar';

const CalendarManager = (props) => {
	return (
		<>
			<div className={classes.container}>
				<div className={classes.heading}>
					<Heading text={'Settings >'} />
				</div>

				<div className={classes.subcontainer}>
					<div className={classes.box}>
						<div className={classes.box_icon}>
							<Calendar fill={'#38F495'} />
						</div>
						<div className={classes.box_text}>
							Calendar Manager Options
						</div>
					</div>

					<div className={classes.card}>
						<CardCustom
							background_color={'#11B9F0'}
							path={'/slots-create'}
							display={'none'}
							title={'Create Slots'}
							content={[
								'Add new or delete existing Specialties.',
								<div>
									**Existing Specialty
									already assigned to a
									staff cannot be deleted,
									you need to first remove
									it from the assigned
									staff before deleting
									the Specialty.
								</div>,
								'',
							]}
						/>
					</div>
					<div className={classes.card}>
						<CardCustom
							background_color={'#504F4B'}
							path={'/assign-staff'}
							display={'none'}
							title={'Override Slots'}
							content={[
								'Add new or delete existing assignments.',
								<div>
									<div>
										Add new or delete
										services to the
										existing
										assignments.
									</div>
									<div>
										Add new or delete
										service description
										and price to the
										existing services.
									</div>
								</div>,
							]}
						/>
					</div>
					<div className={classes.card}>
						<CardCustom
							background_color={'#FC0000'}
							path={'/time-tables'}
							display={'none'}
							title={'Delete slots'}
							content={[
								'Add new or Delete existing TimeTables.',
								<div>
									<div>
										** Each staff can
										have more than one
										time table.{' '}
									</div>
									<div>
										** Each staff has
										their own time
										tables with means
										you won’t be able to
										see time tables from
										other staffs.{' '}
									</div>
								</div>,
							]}
						/>
					</div>
					<div className={classes.card}>
						<CardCustom
							background_color={'#EAE8E8'}
							color={'#504F4B'}
							title_color={'#504F4B'}
							path={'/loginx'}
							display={'none'}
							title={'Calendar History'}
							content={[
								'Add new, update or delete existing spots on your Calendar.',
								<div>
									<div>
										** You can override
										unbooked spots by
										making them visible
										or invisible.
									</div>
									<div>
										** You won’t be able
										to override or
										delete spots that
										has been already
										booked.
									</div>
								</div>,
							]}
						/>
					</div>
				</div>
			</div>
		</>
	);
};

export default CalendarManager;
