import React from 'react';
import ButtonSelect from '../UI/ButtonSelect/ButtonSelect';
import classes from './styles.module.css';

const SlideSpecialty = (props) => {
	return (
		<div className={classes.container}>
			<div className={classes.box}>
				<div
					id='specialty'
					className={classes.header}
				>
					{props.specialty}
				</div>
				<div className={classes.text}>
					{props.description}
				</div>
				<div className={classes.button}>
					<ButtonSelect
						buttonName={props.buttonName}
						onClick={() => props.onClick(props)}
						display={props.display}
					/>
				</div>
			</div>
		</div>
	);
};

export default SlideSpecialty;
