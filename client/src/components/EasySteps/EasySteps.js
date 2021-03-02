import React from 'react';
import classes from './styles.module.css';
import TimeLine from '../UI/Iconsx/TimeLineSmall';
import Heading from '../UI/Heading/Heading';

const EasySteps = (props) => {
	return (
		<div className={classes.container}>
			<div className={classes.subcontainer}>
				<Heading
					white={true}
					text='Quick & Easy Appointment Steps'
				/>

				<div className={classes.text1}>
					1 • Select a Specialty
				</div>
				<div className={classes.text2}>
					2 • Select a Professional
				</div>
				<div className={classes.text3}>
					3 • Select a Service
				</div>
				<div className={classes.text4}>
					4 • Select a Date & Time
				</div>
				<div className={classes.text5}>
					5 • Accept & Book
				</div>

				<div className={classes.timeLine}>
					<TimeLine />
				</div>
			</div>
		</div>
	);
};

export default EasySteps;
