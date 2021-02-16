import React from 'react';
import classes from './styles.module.css';
import ButtonDelete from '../UI/ButtonDelete/ButtonDelete';

const CardSpecialty = (props) => {
	return (
		<div>
			<div className={classes.card}>
				<div className={classes.box}>
					<div className={classes.text}>
						{props.text}
					</div>
					<div className={classes.button}>
						<ButtonDelete
							onClick={props.onClick}
						/>
					</div>
					<div className={classes.button_large}>
						<ButtonDelete
							onClick={props.onClick}
						/>
					</div>
				</div>
				<div className={classes.description}>
					{props.description}
				</div>
			</div>
		</div>
	);
};

export default CardSpecialty;
