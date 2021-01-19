import React from 'react';
import classes from './styles.module.css';
import InputCustom from '../UI/InputCustom/InputCustom';
import SelectCustom from '../UI/SelectCustom/SelectCustom';
import Clock from '../UI/Iconsx/Clock';

const NewTimeTable = (props) => {
	return (
		<div className={classes.container}>
			<div className={classes.box}>
				<div className={classes.action}>
					<div className={classes.action_icon}>
						<Clock />
					</div>
					<div className={classes.action_text}>
						Add New Time Table
					</div>
				</div>

				<div className={classes.table_name}>
					<InputCustom
						label={'Service Name'}
						display_icon={'none'}
						//icon={<Specialty_icon />}
					/>
				</div>
				<div className={classes.period}>
					<SelectCustom
						display_icon={'none'}
						label={'Select Period'}
					/>
				</div>
				<div className={classes.time_slots}>
					<SelectCustom
						height={'100px'}
						display_icon={'none'}
						label={'Select Time Slot'}
					/>
				</div>
			</div>
		</div>
	);
};

export default NewTimeTable;
