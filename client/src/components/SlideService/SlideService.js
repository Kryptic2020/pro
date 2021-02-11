import React from 'react';
import ButtonSelect from '../UI/ButtonSelect/ButtonSelect';
import classes from './styles.module.css';

const SlideSpecialty = (props) => {
	return (
		<div className={classes.container}>
			<div className={classes.service}>
				{props.service}
			</div>
			<div className={classes.price}>
				${props.price}
			</div>
			<div className={classes.description}>
				{props.description}
			</div>
			<div className={classes.button}>
				<ButtonSelect
					buttonName={'SELECT'}
					onClick={() => props.onClick(props)}
					display={props.display}
				/>
			</div>
		</div>
	);
};

export default SlideSpecialty;
