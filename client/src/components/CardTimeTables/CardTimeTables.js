import React from 'react';
import classes from './styles.module.css';
import ButtonDelete from '../UI/ButtonDelete/ButtonDelete';
import Clock from '../UI/Iconsx/Clock';

const CardTimeTables = (props) => {
	return (
		<div>
			<div className={classes.card}>
				<div className={classes.box}>
					<div className={classes.table_name}>
						{props.table_name}
					</div>
					<div className={classes.icon}>
						<Clock className={classes.icon} />
					</div>
					<div className={classes.button}>
						<ButtonDelete />
					</div>
				</div>

				<div className={classes.time_slots}>
					{props.time_slots}
				</div>
			</div>
		</div>
	);
};

export default CardTimeTables;
