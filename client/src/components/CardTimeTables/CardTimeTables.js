import React from 'react';
import classes from './styles.module.css';
import ButtonDelete from '../UI/ButtonDelete/ButtonDelete';
import ButtonSelect from '../UI/ButtonSelect/ButtonSelect';
import Clock from '../UI/Iconsx/Clock';

const CardTimeTables = (props) => {
	return (
		<div>
			<div
				className={classes.card}
				style={{
					backgroundColor: props.backgroundColor,
				}}
			>
				<div className={classes.box}>
					<div className={classes.table_name}>
						{props.table_name}
					</div>
					<div className={classes.icon}>
						<Clock className={classes.icon} />
					</div>
					<div className={classes.button}>
						{props.button_select ? (
							<ButtonSelect
								buttonName={
									props.buttonName
								}
								onClick={props.onClick.bind(
									this,
									props
								)}
							/>
						) : (
							<ButtonDelete
								onClick={props.onClick}
							/>
						)}
					</div>
				</div>

				<div className={classes.time_slots}>
					{props.times.join(', ')}
				</div>
			</div>
		</div>
	);
};

export default CardTimeTables;
