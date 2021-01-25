import React from 'react';
import ButtonSelect from '../UI/ButtonSelect/ButtonSelect';
import classes from './styles.module.css';

const SlideSpecialty = (props) => {
	return (
		<div className={classes.container}>
			<div className={classes.box}>
				<div className={classes.header}>
					{props.specialty}
				</div>
				<div className={classes.text}>
					{props.description}
				</div>
				<div className={classes.button}>
					<ButtonSelect
						onClick={props.onClick}
						display={props.display}
					/>
				</div>
			</div>
		</div>
	);
};

export default SlideSpecialty;
