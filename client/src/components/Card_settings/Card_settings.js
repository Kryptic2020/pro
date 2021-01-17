import React from 'react';
import classes from './styles.module.css';

const Card = (props) => {
	return (
		<div>
			<div
				className={classes.card}
				style={{
					backgroundColor: props.background_color,
					color: props.card_color,
				}}
			>
				<a
					className={classes.heading}
					style={{
						color: props.title_color,
					}}
					href={props.path}
				>
					<div className={classes.icon}>
						{props.icon}
					</div>
					<div>{props.title}</div>
				</a>

				<div className={classes.content}>
					{props.content}
				</div>
			</div>
		</div>
	);
};

export default Card;