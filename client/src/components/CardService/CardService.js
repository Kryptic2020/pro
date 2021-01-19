import React from 'react';
import classes from './styles.module.css';
import ButtonDelete from '../UI/ButtonDelete/ButtonDelete';

const CardService = (props) => {
	return (
		<div>
			<div className={classes.card}>
				<div className={classes.box}>
					<div className={classes.service}>
						{props.service}
					</div>
					<div className={classes.price}>
						{props.price}
					</div>
					<div className={classes.button}>
						<ButtonDelete />
					</div>
				</div>

				<div className={classes.description}>
					{props.service_description}
				</div>
			</div>
		</div>
	);
};

export default CardService;
