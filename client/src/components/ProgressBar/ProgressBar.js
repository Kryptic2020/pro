import React from 'react';
import TimeLine from '../UI/Iconsx/TimeLineSmall';
import TimeLine1 from '../UI/Iconsx/TimeLineSmall1';
import TimeLine2 from '../UI/Iconsx/TimeLineSmall2';
import TimeLine3 from '../UI/Iconsx/TimeLineSmall3';
import TimeLine4 from '../UI/Iconsx/TimeLineSmall4';
import TimeLine5 from '../UI/Iconsx/TimeLineSmall5';
import classes from './styles.module.css';

const ProgressBar = (props) => {
	return (
		<div className={classes.container}>
			<div className={classes.box}>
				{props.stage == 0 ? <TimeLine /> : null}
				{props.stage == 1 ? <TimeLine1 /> : null}
				{props.stage == 2 ? <TimeLine2 /> : null}
				{props.stage == 3 ? <TimeLine3 /> : null}
				{props.stage == 4 ? <TimeLine4 /> : null}
				{props.stage == 5 ? <TimeLine5 /> : null}
			</div>
		</div>
	);
};

export default ProgressBar;
