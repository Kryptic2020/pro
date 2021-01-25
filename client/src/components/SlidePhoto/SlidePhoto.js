import React from 'react';
import ButtonSelect from '../UI/ButtonSelect/ButtonSelect';
import classes from './styles.module.css';

const SlideSpecialty = (props) => {
	return (
		<div className={classes.container}>
			<div className={classes.photo}>
				{props.photo}
			</div>
			<div className={classes.text}>
				{props.fullName}
			</div>
			<div className={classes.button}>
				<ButtonSelect
					onClick={props.onClick}
					display={props.display}
				/>
			</div>
		</div>
	);
};

export default SlideSpecialty;
