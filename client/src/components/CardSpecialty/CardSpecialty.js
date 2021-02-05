import React from 'react';
import classes from './styles.module.css';
import ButtonDelete from '../UI/ButtonDelete/ButtonDelete';

const CardSpecialty = (props) => {
	return (
		<div>
			<div className={classes.card}>
				<div className={classes.text}>
					{props.text}
				</div>
				<div className={classes.button}>
					<ButtonDelete onClick={props.onClick} />
				</div>
				<div className={classes.button_large}>
					<ButtonDelete
						onClick={props.onClick}
						width={'200px'}
					/>
				</div>
			</div>
		</div>
	);
};

export default CardSpecialty;
