import React from 'react';
import classes from './styles.module.css';

const Card = (props) => {
	return (
		<div
			className={classes.card}
			style={{
				backgroundColor: props.background_color,
				color: props.color,
			}}
		>
			<div
				className={classes.heading}
				style={{
					color: props.title_color,
				}}
			>
				<div
					style={{ display: props.display }}
					className={classes.icon}
				>
					{props.icon}
				</div>
				<div>{props.title}</div>
			</div>

			<div className={classes.content}>
				{props.content}
			</div>
		</div>
	);
};

export default Card;
